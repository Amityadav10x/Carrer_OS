from django.db import models
from django.conf import settings
from core.models import BaseModel

class Roadmap(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='roadmaps', db_index=True)
    version = models.IntegerField(default=1)
    overall_completion = models.IntegerField(default=0)
    normalized = models.BooleanField(default=True)
    previous_version = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - Roadmap v{self.version}"

class RoadmapPhase(BaseModel):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name='phases', db_index=True)
    phase_name = models.CharField(max_length=255)
    duration_days = models.IntegerField()

    def __str__(self):
        return f"{self.phase_name} ({self.roadmap.id})"

class RoadmapTask(BaseModel):
    phase = models.ForeignKey(RoadmapPhase, on_delete=models.CASCADE, related_name='tasks', db_index=True)
    skill = models.CharField(max_length=255)
    resource = models.URLField(max_length=512)
    project_task = models.TextField()
    progress = models.IntegerField(default=0)
    completed = models.BooleanField(default=False, db_index=True)

    def __str__(self):
        return f"{self.skill} - {self.phase.phase_name}"
