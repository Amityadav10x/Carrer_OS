import re
from typing import List, Dict, Any, Optional
from django.db import transaction
from django.shortcuts import get_object_or_404
from resumes.models import Resume
from .models import RoleSkillMatrix, SkillAnalysis

def normalize_skill(skill_name: str) -> str:
    """
    Robust skill normalization:
    - lowercase
    - strip leading/trailing spaces
    - remove special characters (. - _)
    - remove internal spaces
    - handle basic aliases
    """
    if not skill_name:
        return ""
    
    # Lowercase and strip
    s = skill_name.lower().strip()
    
    # Remove special characters . - _
    s = re.sub(r'[\.\-_]', '', s)
    
    # Remove all spaces
    s = "".join(s.split())
    
    # Basic alias handling
    aliases = {
        "pbi": "powerbi",
        "js": "javascript",
        "ts": "typescript",
        "py": "python",
        "reactjs": "react",
        "nextjs": "next",
        "postgressql": "postgresql",
        "postgres": "postgresql",
    }
    
    return aliases.get(s, s)

class SkillGapService:
    @staticmethod
    def generate_gap_analysis(user, target_role: str, resume_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Orchestrates the skill gap analysis pipeline.
        Deterministic and Gemini-free.
        """
        # 1. Fetch Resume with Fallback
        if resume_id:
            resume = get_object_or_404(Resume, id=resume_id, user=user)
        else:
            resume = Resume.objects.filter(user=user).order_by('-created_at').first()
            if not resume:
                raise ValueError("No resume found for user. Please upload a resume first.")

        # 2. Fetch Role Skill Matrix
        role_skills = RoleSkillMatrix.objects.filter(role_name__iexact=target_role)
        if not role_skills.exists():
            raise ValueError(f"Target role '{target_role}' not found in skill matrix.")

        # 3. Normalize Resume Skills
        resume_skills_raw = resume.extracted_skills or []
        normalized_resume_skills = {normalize_skill(s): s for s in resume_skills_raw}

        # 4. Compare and Compute Gaps
        confirmed_skills = []
        missing_skills = []
        
        total_missing_weight = 0
        total_market_demand = 0

        for r_skill in role_skills:
            norm_role_skill = normalize_skill(r_skill.skill_name)
            
            if norm_role_skill in normalized_resume_skills:
                # Match found
                confirmed_skills.append({
                    "name": r_skill.skill_name,
                    "confidence": 95 # Placeholder confidence for deterministic engine
                })
            else:
                # Missing skill
                importance = r_skill.priority_score * r_skill.market_demand
                missing_skills.append({
                    "name": r_skill.skill_name,
                    "priority_score": r_skill.priority_score,
                    "market_demand": r_skill.market_demand,
                    "weighted_importance": importance
                })
                total_missing_weight += importance
                total_market_demand += r_skill.market_demand

        # 5. Calculate Overall Gap Score
        # overall_gap_score = sum(priority * demand) / sum(demand) if missing
        if not missing_skills:
            overall_gap_score = 0
        else:
            # weighted_average = sum(p*d) / sum(d)
            # This gives a value between 0 and 100 because p is 0-100
            overall_gap_score = round(total_missing_weight / total_market_demand)
            overall_gap_score = max(0, min(100, overall_gap_score))

        # 6. Sorting Rule: weighted_importance DESC
        missing_skills.sort(key=lambda x: x['weighted_importance'], reverse=True)

        # 7. Persist Analysis (Optional for history, but good for dashboard)
        analysis = SkillAnalysis.objects.create(
            user=user,
            role=target_role,
            overall_gap_score=overall_gap_score,
            normalized=True,
            confirmed_skills=confirmed_skills,
            missing_skills=missing_skills
        )

        return {
            "role": target_role,
            "overall_gap_score": overall_gap_score,
            "normalized": True,
            "confirmed_skills": confirmed_skills,
            "missing_skills": missing_skills,
            "analysis_id": analysis.id
        }
