from django.urls import path
from .views import SkillAnalyzeView, RoleListView

urlpatterns = [
    path('analyze/', SkillAnalyzeView.as_view(), name='skill-analyze'),
    path('roles/', RoleListView.as_view(), name='role-list'),
]
