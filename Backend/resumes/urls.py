from django.urls import path
from .views import (
    ResumeUploadView, 
    ResumeDetailView, 
    ResumeExportView,
    SuggestionApplyView,
    SuggestionDiscardView
)

urlpatterns = [
    path('upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('<uuid:id>/', ResumeDetailView.as_view(), name='resume-detail'),
    path('<uuid:id>/export/pdf/', ResumeExportView.as_view(), name='resume-export-pdf'),
    path('suggestions/<uuid:id>/apply/', SuggestionApplyView.as_view(), name='suggestion-apply'),
    path('suggestions/<uuid:id>/discard/', SuggestionDiscardView.as_view(), name='suggestion-discard'),
]
