import requests
from django.conf import settings
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User
from resumes.models import Resume
from rest_framework_simplejwt.tokens import RefreshToken

user = User.objects.last()
resume = Resume.objects.filter(user=user).last()

if user and resume:
    token = str(RefreshToken.for_user(user).access_token)
    headers = {'Authorization': f'Bearer {token}'}
    
    # 1. Test Active Roadmap
    print("Fetching active roadmap...")
    r = requests.get('http://localhost:8000/v1/roadmaps/active/', headers=headers)
    print("Active Roadmap Status:", r.status_code)
    print("Active Roadmap Response:", r.text)
    
    # 2. Test Generate
    print("\nGenerating roadmap...")
    r2 = requests.post('http://localhost:8000/v1/roadmaps/generate/', json={"resume_id": str(resume.id)}, headers=headers)
    print("Generate Status:", r2.status_code)
    print("Generate Response:", r2.text)
