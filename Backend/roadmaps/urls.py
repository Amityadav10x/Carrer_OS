from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.GenerateRoadmapView.as_view(), name='generate-roadmap'),
    path('active/', views.ActiveRoadmapView.as_view(), name='active-roadmap'),
    path('history/', views.HistoryRoadmapView.as_view(), name='history-roadmap'),
    path('resources/<uuid:resource_id>/toggle/', views.ToggleResourceView.as_view(), name='toggle-resource'),
]
