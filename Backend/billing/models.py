from django.db import models
from core.models import BaseModel
from django.conf import settings

class CreditTransaction(BaseModel):
    TYPE_CHOICES = (
        ('debit', 'Debit'),
        ('credit', 'Credit'),
        ('refund', 'Refund'),
    )
    SOURCE_CHOICES = (
        ('resume', 'Resume Analysis'),
        ('interview', 'Interview Simulation'),
        ('roadmap', 'Roadmap Generation'),
        ('manual', 'Manual Adjustment'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='credit_transactions', db_index=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, db_index=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, db_index=True)
    amount = models.IntegerField()
    reference_id = models.UUIDField(null=True, blank=True, db_index=True)

    def __str__(self):
        return f"{self.user.email} - {self.type} - {self.amount}"
