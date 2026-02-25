from django.db import models
from django.conf import settings
from core.models import BaseModel

class AIUsage(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ai_usages', db_index=True)
    endpoint = models.CharField(max_length=255, db_index=True)
    model_used = models.CharField(max_length=100)
    model_version = models.CharField(max_length=50)
    prompt_tokens = models.IntegerField(default=0)
    completion_tokens = models.IntegerField(default=0)
    total_tokens = models.IntegerField(default=0)
    processing_time_ms = models.IntegerField(default=0)
    cost_estimate = models.DecimalField(max_digits=10, decimal_places=6, default=0)

    def __str__(self):
        return f"{self.user.email} - {self.endpoint} - {self.total_tokens} tokens"
