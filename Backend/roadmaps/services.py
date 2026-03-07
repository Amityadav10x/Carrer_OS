from typing import List, Dict
import urllib.parse
from django.db import transaction
from django.db.models import Q
from skills.models import SkillAnalysis
from resumes.models import Resume
from roadmaps.models import LearningRoadmap, RoadmapModule, LearningResource, SkillResourceLibrary
from core.ai_client import gemini_client

class RoadmapGenerationService:
    @staticmethod
    def _generate_description(skill_name: str, target_role: str) -> str:
        prompt = f"Write a single, concise 1-sentence learning objective (max 15 words) for mastering '{skill_name}' in a '{target_role}' role."
        try:
            return gemini_client.generate_text(prompt).strip()
        except Exception:
            return f"Master the fundamentals of {skill_name}."

    @staticmethod
    def _create_fallback_resources(module: RoadmapModule, skill_name: str):
        encoded_skill = urllib.parse.quote_plus(f"learn {skill_name}")
        fallbacks = [
            {
                "title": f"Complete {skill_name} Course",
                "type": "course",
                "url": f"https://www.youtube.com/results?search_query={encoded_skill}+course",
                "priority": 1,
                "hours": 3
            },
            {
                "title": f"Official {skill_name} Documentation",
                "type": "documentation",
                "url": f"https://www.google.com/search?q={encoded_skill}+documentation",
                "priority": 2,
                "hours": 2
            },
            {
                "title": f"{skill_name} Crash Course",
                "type": "tutorial",
                "url": f"https://www.youtube.com/results?search_query={encoded_skill}+tutorial",
                "priority": 3,
                "hours": 1
            }
        ]
        
        resources = []
        for i, fb in enumerate(fallbacks):
            resources.append(LearningResource(
                module=module,
                title=fb["title"],
                resource_type=fb["type"],
                url=fb["url"],
                provider="Web Search",
                estimated_minutes=fb["hours"] * 60,
                difficulty="beginner",
                priority=fb["priority"],
                order=i+1
            ))
        LearningResource.objects.bulk_create(resources)

    @staticmethod
    def generate(user, resume_id: str) -> LearningRoadmap:
        resume = Resume.objects.get(id=resume_id, user=user)

        # 1. Active Check: if active roadmap exists for this exact resume, return it
        existing_roadmap = LearningRoadmap.objects.filter(user=user, resume=resume, status='active').first()
        if existing_roadmap:
            return existing_roadmap

        # 2. Fetch latest SkillAnalysis for this user (targeting this role)
        skill_analysis = SkillAnalysis.objects.filter(
            user=user, 
            role__iexact=resume.target_role
        ).order_by('-created_at').first()

        if not skill_analysis:
            raise ValueError("No skill gap analysis found for this role. Run skill analysis first.")

        # 3. Extract and sort top missing skills
        missing = sorted(skill_analysis.missing_skills, key=lambda x: x.get('importance', 0), reverse=True)
        top_missing = missing[:6]  # Limit to top 6
        
        if not top_missing:
            raise ValueError("No missing skills identified. You are fully qualified!")

        with transaction.atomic():
            # Archive older roadmaps for this user
            LearningRoadmap.objects.filter(user=user, status='active').update(status='archived')

            # Create Roadmap
            roadmap = LearningRoadmap.objects.create(
                user=user,
                resume=resume,
                target_role=resume.target_role,
                gap_snapshot=top_missing,
                version=resume.version
            )

            total_hours = 0

            # 4. Phase Splitting & Module Creation
            for idx, skill_data in enumerate(top_missing):
                skill_name = skill_data['name']
                
                # Phase logic: 2 skills per phase. idx 0,1 -> phase 1 | idx 2,3 -> phase 2 | idx 4,5 -> phase 3
                phase = (idx // 2) + 1
                
                description = RoadmapGenerationService._generate_description(skill_name, resume.target_role)

                module = RoadmapModule.objects.create(
                    roadmap=roadmap,
                    skill_name=skill_name,
                    title=f"Master {skill_name}",
                    description=description,
                    phase=phase,
                    order=idx + 1,
                    difficulty="beginner",
                )

                # 5. Attach Resources
                # Try exact match or partial match in Master Library
                library_resources = list(SkillResourceLibrary.objects.filter(
                    skill_name__icontains=skill_name
                ).order_by('difficulty')[:3])

                module_hours = 0

                if not library_resources:
                    # Fallback mechanism
                    RoadmapGenerationService._create_fallback_resources(module, skill_name)
                    module_hours = 6 # (3+2+1)
                else:
                    new_resources = []
                    for r_idx, lib_res in enumerate(library_resources):
                        new_resources.append(LearningResource(
                            module=module,
                            title=lib_res.title,
                            resource_type=lib_res.resource_type,
                            url=lib_res.url,
                            provider=lib_res.provider,
                            estimated_minutes=int(lib_res.estimated_hours * 60),
                            difficulty=lib_res.difficulty,
                            priority=r_idx + 1,
                            order=r_idx + 1
                        ))
                        module_hours += lib_res.estimated_hours
                    LearningResource.objects.bulk_create(new_resources)

                module.estimated_hours = int(module_hours)
                module.save()
                total_hours += module_hours

            # 6. Compute Durations
            roadmap.estimated_total_hours = int(total_hours)
            roadmap.estimated_completion_days = int(total_hours / 2) # Assume 2 hours of study per day
            roadmap.save()

            return roadmap

    @staticmethod
    def toggle_resource(user, resource_id: str):
        with transaction.atomic():
            resource = LearningResource.objects.select_related('module__roadmap').get(
                id=resource_id, module__roadmap__user=user
            )
            
            # Toggle
            resource.completed = not resource.completed
            resource.save()

            # Recalculate Module Progress
            module = resource.module
            total_mod_res = module.resources.count()
            comp_mod_res = module.resources.filter(completed=True).count()
            module.module_progress = int((comp_mod_res / total_mod_res) * 100) if total_mod_res > 0 else 0
            
            # Module completion logic
            module.completed = (comp_mod_res == total_mod_res) and total_mod_res > 0
            module.save()

            # Recalculate Global Roadmap Progress
            roadmap = module.roadmap
            total_rm_res = LearningResource.objects.filter(module__roadmap=roadmap).count()
            comp_rm_res = LearningResource.objects.filter(module__roadmap=roadmap, completed=True).count()
            roadmap.overall_progress = int((comp_rm_res / total_rm_res) * 100) if total_rm_res > 0 else 0
            roadmap.save()

            return roadmap, module, resource
