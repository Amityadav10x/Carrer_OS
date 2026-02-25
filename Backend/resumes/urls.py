from django.urls import path
from .views import ResumeUploadView, ResumeDetailView

urlpatterns = [
    path('upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('<uuid:id>/', ResumeDetailView.as_view(), name='resume-detail'),
]
