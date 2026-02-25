from django.db import models
from django.conf import settings
from core.models import BaseModel

class SkillAnalysis(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skill_analyses', db_index=True)
    role = models.CharField(max_length=255, db_index=True)
    overall_gap_score = models.IntegerField(default=0)
    normalized = models.BooleanField(default=True)
    confirmed_skills = models.JSONField(default=list)
    missing_skills = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user.email} - {self.role} ({self.overall_gap_score})"
