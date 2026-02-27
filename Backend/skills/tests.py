from django.test import TestCase
from django.contrib.auth import get_user_model
from resumes.models import Resume
from .models import RoleSkillMatrix, SkillAnalysis
from .services import SkillGapService, normalize_skill

User = get_user_model()

class SkillNormalizationTest(TestCase):
    def test_normalize_skill(self):
        self.assertEqual(normalize_skill("Node.js"), "nodejs")
        self.assertEqual(normalize_skill("React JS"), "react")
        self.assertEqual(normalize_skill("Power BI"), "powerbi")
        self.assertEqual(normalize_skill("  python  "), "python")
        self.assertEqual(normalize_skill("Postgres-SQL"), "postgresql")
        self.assertEqual(normalize_skill(" TypeScript "), "typescript")
        self.assertEqual(normalize_skill("PBI"), "powerbi") # Alias test

class SkillGapEngineTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test@example.com", password="password", credits=1000)
        
        # Seed Role Data
        RoleSkillMatrix.objects.create(role_name="Backend Engineer", skill_name="Python", priority_score=100, market_demand=100)
        RoleSkillMatrix.objects.create(role_name="Backend Engineer", skill_name="Django", priority_score=80, market_demand=80)
        RoleSkillMatrix.objects.create(role_name="Backend Engineer", skill_name="PostgreSQL", priority_score=60, market_demand=90)

    def test_perfect_match(self):
        # User has all skills
        resume = Resume.objects.create(
            user=self.user,
            extracted_skills=["Python", "Django", "Postgres-SQL"]
        )
        
        result = SkillGapService.generate_gap_analysis(self.user, "Backend Engineer")
        
        self.assertEqual(result['overall_gap_score'], 0)
        self.assertEqual(len(result['confirmed_skills']), 3)
        self.assertEqual(len(result['missing_skills']), 0)

    def test_no_overlap(self):
        # User has zero matching skills
        resume = Resume.objects.create(
            user=self.user,
            extracted_skills=["Art", "Cooking"]
        )
        
        result = SkillGapService.generate_gap_analysis(self.user, "Backend Engineer")
        
        # All skills missing. 
        # weighted_average = sum(p*d) / sum(d)
        # sum(p*d) = (100*100) + (80*80) + (60*90) = 10000 + 6400 + 5400 = 21800
        # sum(d) = 100 + 80 + 90 = 270
        # 21800 / 270 = 80.74 -> 81
        self.assertEqual(result['overall_gap_score'], 81)
        self.assertEqual(len(result['confirmed_skills']), 0)
        self.assertEqual(len(result['missing_skills']), 3)
        
        # Check sorting (Python has highest weight)
        self.assertEqual(result['missing_skills'][0]['name'], "Python")

    def test_partial_match_case_insensitive(self):
        # User has some skills with different casing
        resume = Resume.objects.create(
            user=self.user,
            extracted_skills=["python"] # Matches Python
        )
        
        result = SkillGapService.generate_gap_analysis(self.user, "Backend Engineer")
        
        self.assertEqual(len(result['confirmed_skills']), 1)
        self.assertEqual(result['confirmed_skills'][0]['name'], "Python")
        self.assertEqual(len(result['missing_skills']), 2)

    def test_resume_fallback(self):
        # Multiple resumes, should use latest
        Resume.objects.create(user=self.user, extracted_skills=["Python"], created_at="2020-01-01")
        latest = Resume.objects.create(user=self.user, extracted_skills=["Django"]) 
        
        result = SkillGapService.generate_gap_analysis(self.user, "Backend Engineer")
        
        # Should confirmed Django (from latest)
        self.assertTrue(any(s['name'] == 'Django' for s in result['confirmed_skills']))

    def test_role_not_found(self):
        Resume.objects.create(user=self.user, extracted_skills=["Python"])
        with self.assertRaises(ValueError) as cm:
            SkillGapService.generate_gap_analysis(self.user, "Astronaut")
        self.assertIn("not found", str(cm.exception))
