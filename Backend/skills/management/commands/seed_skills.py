from django.core.management.base import BaseCommand
from skills.models import RoleSkillMatrix

class Command(BaseCommand):
    help = 'Seeds initial RoleSkillMatrix data'

    def handle(self, *args, **kwargs):
        data = [
            # Frontend Engineer
            {"role": "Frontend Engineer", "skill": "React", "priority": 95, "demand": 98},
            {"role": "Frontend Engineer", "skill": "TypeScript", "priority": 90, "demand": 95},
            {"role": "Frontend Engineer", "skill": "CSS/Tailwind", "priority": 85, "demand": 90},
            {"role": "Frontend Engineer", "skill": "Next.js", "priority": 80, "demand": 85},
            {"role": "Frontend Engineer", "skill": "Redux/Zustand", "priority": 75, "demand": 70},
            
            # Backend Engineer
            {"role": "Backend Engineer", "skill": "Python", "priority": 95, "demand": 95},
            {"role": "Backend Engineer", "skill": "Django", "priority": 90, "demand": 80},
            {"role": "Backend Engineer", "skill": "PostgreSQL", "priority": 85, "demand": 90},
            {"role": "Backend Engineer", "skill": "Docker", "priority": 80, "demand": 85},
            {"role": "Backend Engineer", "skill": "Redis", "priority": 70, "demand": 75},

            # Full Stack Engineer
            {"role": "Full Stack Engineer", "skill": "React", "priority": 95, "demand": 98},
            {"role": "Full Stack Engineer", "skill": "Node.js", "priority": 90, "demand": 90},
            {"role": "Full Stack Engineer", "skill": "PostgreSQL", "priority": 85, "demand": 90},
            {"role": "Full Stack Engineer", "skill": "Docker", "priority": 80, "demand": 85},
            {"role": "Full Stack Engineer", "skill": "AWS", "priority": 75, "demand": 80},

            # Data Analyst
            {"role": "Data Analyst", "skill": "Python", "priority": 95, "demand": 95},
            {"role": "Data Analyst", "skill": "SQL", "priority": 95, "demand": 98},
            {"role": "Data Analyst", "skill": "Power BI", "priority": 85, "demand": 90},
            {"role": "Data Analyst", "skill": "Excel", "priority": 80, "demand": 95},
            {"role": "Data Analyst", "skill": "Statistics", "priority": 90, "demand": 85},
        ]

        count = 0
        for item in data:
            _, created = RoleSkillMatrix.objects.get_or_create(
                role_name=item["role"],
                skill_name=item["skill"],
                defaults={
                    "priority_score": item["priority"],
                    "market_demand": item["demand"]
                }
            )
            if created:
                count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} new skill mapping entries.'))
