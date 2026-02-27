from django.db import models
from django.conf import settings
from core.models import BaseModel

class Resume(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resumes', db_index=True)
    version = models.IntegerField(default=1)
    previous_version = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='next_versions')
    overall_score = models.IntegerField(default=0)
    normalized = models.BooleanField(default=True)
    extracted_skills = models.JSONField(default=list)
    strengths = models.JSONField(default=list)
    weaknesses = models.JSONField(default=list)
    raw_content = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - v{self.version} ({self.overall_score})"

class ResumeSuggestion(BaseModel):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='suggestions', db_index=True)
    original = models.TextField()
    improved = models.TextField()
    applied = models.BooleanField(default=False, db_index=True)

    def __str__(self):
        return f"Suggestion for {self.resume.id}"
