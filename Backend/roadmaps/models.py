from django.db import models
from django.db.models import UniqueConstraint, Q
from django.conf import settings
from resumes.models import Resume
from core.models import BaseModel

class LearningRoadmap(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='roadmaps')
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='roadmaps')
    target_role = models.CharField(max_length=255)
    gap_snapshot = models.JSONField(help_text="Snapshot of missing skills used to generate this roadmap")
    overall_progress = models.IntegerField(default=0, help_text="Progress 0-100")
    estimated_total_hours = models.IntegerField(default=0)
    estimated_completion_days = models.IntegerField(default=0)
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('archived', 'Archived'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    version = models.IntegerField(default=1)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['user', 'resume'],
                condition=Q(status='active'),
                name='unique_active_roadmap_per_resume'
            )
        ]

    def __str__(self):
        return f"Roadmap v{self.version} for {self.user.email} ({self.target_role})"

class RoadmapModule(BaseModel):
    roadmap = models.ForeignKey(LearningRoadmap, on_delete=models.CASCADE, related_name='modules')
    skill_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    phase = models.IntegerField(help_text="1, 2, or 3")
    order = models.IntegerField()
    estimated_hours = models.IntegerField(default=0)
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    module_progress = models.IntegerField(default=0, help_text="Progress 0-100")
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['phase', 'order']

    def __str__(self):
        return f"{self.title} ({self.skill_name})"

class LearningResource(BaseModel):
    module = models.ForeignKey(RoadmapModule, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=512)
    
    TYPE_CHOICES = [
        ('course', 'Course'),
        ('tutorial', 'Tutorial'),
        ('documentation', 'Documentation'),
        ('project', 'Project'),
    ]
    resource_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    url = models.URLField(max_length=1024)
    provider = models.CharField(max_length=255, blank=True, null=True)
    estimated_minutes = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=20, choices=RoadmapModule.DIFFICULTY_CHOICES, default='beginner')
    priority = models.IntegerField(default=2, help_text="1=Primary, 2=Secondary, 3=Optional")
    completed = models.BooleanField(default=False)
    order = models.IntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} [{self.resource_type}]"

class SkillResourceLibrary(BaseModel):
    skill_name = models.CharField(max_length=255, db_index=True)
    title = models.CharField(max_length=512)
    resource_type = models.CharField(max_length=20, choices=LearningResource.TYPE_CHOICES)
    url = models.URLField(max_length=1024)
    provider = models.CharField(max_length=255, blank=True, null=True)
    difficulty = models.CharField(max_length=20, choices=RoadmapModule.DIFFICULTY_CHOICES, default='beginner')
    estimated_hours = models.FloatField(default=0.0)
    tags = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.skill_name} - {self.title}"
