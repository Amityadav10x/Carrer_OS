from django.db import models
from django.conf import settings
from core.models import BaseModel

class RoleSkillMatrix(BaseModel):
    role_name = models.CharField(max_length=255, db_index=True)
    skill_name = models.CharField(max_length=255, db_index=True)
    priority_score = models.IntegerField(default=50) # 0-100
    market_demand = models.IntegerField(default=50)  # 0-100

    class Meta:
        indexes = [
            models.Index(fields=['role_name', 'skill_name']),
        ]
        unique_together = ('role_name', 'skill_name')

    def __str__(self):
        return f"{self.role_name} - {self.skill_name}"

class SkillAnalysis(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skill_analyses', db_index=True)
    role = models.CharField(max_length=255, db_index=True)
    overall_gap_score = models.IntegerField(default=0)
    normalized = models.BooleanField(default=True)
    confirmed_skills = models.JSONField(default=list) # List of dicts {name, confidence}
    missing_skills = models.JSONField(default=list)   # List of dicts {name, priority, demand, importance}

    def __str__(self):
        return f"{self.user.email} - {self.role} ({self.overall_gap_score})"
