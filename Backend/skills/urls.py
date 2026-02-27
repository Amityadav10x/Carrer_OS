from django.urls import path
from .views import SkillAnalyzeView

urlpatterns = [
    path('analyze/', SkillAnalyzeView.as_view(), name='skill-analyze'),
]
