import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User
from resumes.models import Resume
from roadmaps.services import RoadmapGenerationService

user = User.objects.last()
resume = Resume.objects.filter(user=user).last()

if not user or not resume:
    print("No user or resume found.")
else:
    print(f"Testing for user {user.email} and resume {resume.id} with role {resume.target_role}")
    try:
        roadmap = RoadmapGenerationService.generate(user, resume.id)
        print("Success! Created Roadmap:", roadmap.id)
    except Exception as e:
        print("Exception:", str(e))
