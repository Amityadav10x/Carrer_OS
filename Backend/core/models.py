import uuid
from django.db import models
from django.utils import timezone
from django.conf import settings

class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted_at__isnull=True)

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, db_index=True)

    objects = SoftDeleteManager()
    all_objects = models.Manager()

    class Meta:
        abstract = True

    def delete(self, hard=False, **kwargs):
        if hard:
            super().delete(**kwargs)
        else:
            self.deleted_at = timezone.now()
            self.save()

    def restore(self):
        self.deleted_at = None
        self.save()

class AsyncJob(BaseModel):
    JOB_TYPES = (
        ('resume', 'Resume Analysis'),
        ('roadmap', 'Roadmap Generation'),
        ('interview', 'Interview Evaluation'),
    )
    STATUS_CHOICES = (
        ('queued', 'Queued'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='async_jobs', db_index=True)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='queued', db_index=True)
    progress_percentage = models.IntegerField(default=0)
    result_reference = models.UUIDField(null=True, blank=True, db_index=True)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.job_type} - {self.status} ({self.user.email})"
