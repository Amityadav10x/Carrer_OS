import uuid
from django.test import TestCase
from django.contrib.auth import get_user_model
from resumes.models import Resume
from roadmaps.models import LearningRoadmap, RoadmapModule, LearningResource, SkillResourceLibrary
from roadmaps.services import RoadmapGenerationService

User = get_user_model()

class RoadmapGenerationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password123')
        
        # Create a resume
        self.resume = Resume.objects.create(
            user=self.user,
            target_role='Python Developer'
        )
        
        # Create a skill analysis with missing skills
        from skills.models import SkillAnalysis
        self.skill_analysis = SkillAnalysis.objects.create(
            user=self.user,
            role='Python Developer',
            missing_skills=[
                {
                    "name": "Django",
                    "priority_score": 90,
                    "market_demand": 85,
                    "importance": 7650
                },
                {
                    "name": "Docker",
                    "priority_score": 80,
                    "market_demand": 75,
                    "importance": 6000
                }
            ]
        )

        # Seed the library for testing
        SkillResourceLibrary.objects.create(
            skill_name='django',
            title='Django Official Tutorial',
            resource_type='documentation',
            url='https://docs.djangoproject.com/en/5.0/intro/',
            provider='Django Project',
            estimated_hours=2.0,
            difficulty='beginner'
        )
        SkillResourceLibrary.objects.create(
            skill_name='docker',
            title='Docker for Beginners',
            resource_type='course',
            url='https://www.youtube.com/watch?v=docker',
            provider='YouTube',
            estimated_hours=1.0,
            difficulty='beginner'
        )

    def test_roadmap_generation_creates_valid_structure(self):
        roadmap = RoadmapGenerationService.generate(self.user, str(self.resume.id))
        
        self.assertIsNotNone(roadmap)
        self.assertEqual(roadmap.user, self.user)
        self.assertEqual(roadmap.resume, self.resume)
        self.assertEqual(roadmap.target_role, 'Python Developer')
        self.assertEqual(roadmap.version, 1)
        self.assertEqual(roadmap.status, 'active')
        self.assertEqual(roadmap.overall_progress, 0)
        
        # Should have 2 modules based on the gap snapshot
        modules = roadmap.modules.all()
        self.assertEqual(modules.count(), 2)
        
        # Verify first module (Django)
        django_module = modules.get(skill_name='Django')
        self.assertEqual(django_module.phase, 1) # Priority 1 should be Phase 1
        self.assertEqual(django_module.module_progress, 0)
        self.assertFalse(django_module.completed)
        self.assertEqual(django_module.estimated_hours, 2) # Total resources time
        
        # Verify its resources
        resources = django_module.resources.all()
        self.assertEqual(resources.count(), 1)
        self.assertEqual(resources.first().title, 'Django Official Tutorial')

    def test_duplicate_prevention_archives_old_roadmap(self):
        # Generate an initial roadmap
        roadmap1 = RoadmapGenerationService.generate(self.user, str(self.resume.id))
        self.assertEqual(roadmap1.version, 1)
        self.assertEqual(roadmap1.status, 'active')
        
        # Create a new resume version to simulate a new iteration
        resume2 = Resume.objects.create(
            user=self.user,
            target_role='Python Developer',
            version=2,
            previous_version=self.resume
        )
        
        # Generate a second roadmap using the new resume
        roadmap2 = RoadmapGenerationService.generate(self.user, str(resume2.id))
        self.assertEqual(roadmap2.version, 2)
        self.assertEqual(roadmap2.status, 'active')
        
        # The first roadmap should now be archived
        roadmap1.refresh_from_db()
        self.assertEqual(roadmap1.status, 'archived')
        
        active_roadmaps = LearningRoadmap.objects.filter(user=self.user, status='active')
        self.assertEqual(active_roadmaps.count(), 1)

    def test_progress_tracking_accuracy(self):
        roadmap = RoadmapGenerationService.generate(self.user, str(self.resume.id))
        
        # Get the Django module and its resource
        django_module = roadmap.modules.get(skill_name='Django')
        django_resource = django_module.resources.first()
        
        # Get the Docker module and its resource
        docker_module = roadmap.modules.get(skill_name='Docker')
        docker_resource = docker_module.resources.first()
        
        # Initially, progress is 0
        self.assertEqual(django_module.module_progress, 0)
        self.assertEqual(roadmap.overall_progress, 0)
        
        # Mark Django as complete
        updated_roadmap, updated_module, updated_resource = RoadmapGenerationService.toggle_resource(self.user, str(django_resource.id))
        
        # Django has 1 resource, so module progress should be 100%
        self.assertTrue(updated_resource.completed)
        self.assertEqual(updated_module.module_progress, 100)
        self.assertTrue(updated_module.completed)
        
        # Roadmap has 2 resources total (1 Django, 1 Docker). 
        # Django completed -> 1/2 = 50%
        self.assertEqual(updated_roadmap.overall_progress, 50)
        
        # Now un-toggle Django
        updated_roadmap, updated_module, updated_resource = RoadmapGenerationService.toggle_resource(self.user, str(django_resource.id))
        
        self.assertFalse(updated_resource.completed)
        self.assertEqual(updated_module.module_progress, 0)
        self.assertFalse(updated_module.completed)
        self.assertEqual(updated_roadmap.overall_progress, 0)

    def test_fallback_search_links_when_no_library_match(self):
        # Add a skill with no matching library resource
        skills = self.skill_analysis.missing_skills
        skills.append({
            "name": "Kubernetes",
            "priority_score": 70,
            "market_demand": 80,
            "importance": 5600
        })
        self.skill_analysis.missing_skills = skills
        self.skill_analysis.save()
        
        roadmap = RoadmapGenerationService.generate(self.user, str(self.resume.id))
        
        k8s_module = roadmap.modules.get(skill_name='Kubernetes')
        resources = k8s_module.resources.all()
        
        # Should generate 3 fallback search types (course, documentation, tutorial)
        self.assertEqual(resources.count(), 3)
        self.assertTrue(all(r.provider == 'Web Search' for r in resources))
        self.assertIn('search_query=learn+Kubernetes+course', resources.get(resource_type='course').url)
