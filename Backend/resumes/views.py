import os
from rest_framework import generics, status, permissions, parsers
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from core.utils import api_response
from core.models import AsyncJob
from .models import Resume
from .serializers import ResumeSerializer
from .services import ResumeAnalysisService

class ResumeUploadView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="MISSING_FILE",
                message="No file provided"
            )

        # 1. Validate File Size (Max 5MB)
        if file_obj.size > 5 * 1024 * 1024:
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="FILE_TOO_LARGE",
                message="File size exceeds 5MB limit"
            )

        # 2. Validate File Type
        ext = os.path.splitext(file_obj.name)[1].lower()
        if ext not in ['.pdf', '.docx']:
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="INVALID_FILE_TYPE",
                message="Only PDF and DOCX files are supported"
            )

        # 3. Create AsyncJob
        job = AsyncJob.objects.create(
            user=request.user,
            job_type='resume',
            status='queued'
        )

        # 4. Save file locally for processing
        fs = FileSystemStorage(location=os.path.join(settings.BASE_DIR, 'tmp', 'resumes'))
        filename = fs.save(f"{job.id}{ext}", file_obj)
        file_path = fs.path(filename)

        # 5. Trigger synchronous processing (as requested for now)
        try:
            ResumeAnalysisService.process_resume(str(job.id), file_path)
            # Re-fetch job to get result reference
            job.refresh_from_db()
            
            if job.status == 'completed':
                return api_response(
                    data={
                        "job_id": job.id,
                        "status": job.status,
                        "resume_id": job.result_reference
                    },
                    message="Resume processed successfully"
                )
            else:
                return api_response(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    error_code="PROCESSING_FAILED",
                    message=job.error_message or "Resume analysis failed"
                )
        except Exception as e:
            return api_response(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="SYSTEM_ERROR",
                message=str(e)
            )
        finally:
            # Clean up temp file
            if os.path.exists(file_path):
                os.remove(file_path)

class ResumeDetailView(generics.RetrieveAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return api_response(data=serializer.data)
