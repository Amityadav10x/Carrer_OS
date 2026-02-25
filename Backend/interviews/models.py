from django.db import models
from django.conf import settings
from core.models import BaseModel

class InterviewSession(BaseModel):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('abandoned', 'Abandoned'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='interview_sessions', db_index=True)
    role = models.CharField(max_length=255, db_index=True)
    difficulty = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', db_index=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.role} ({self.status})"

class InterviewResponse(BaseModel):
    session = models.ForeignKey(InterviewSession, on_delete=models.CASCADE, related_name='responses', db_index=True)
    question = models.TextField()
    answer = models.TextField()
    evaluation_json = models.JSONField(null=True, blank=True)
    token_cost = models.IntegerField(default=0)

    def __str__(self):
        return f"Response for {self.session.id}"
