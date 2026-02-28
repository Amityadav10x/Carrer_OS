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
        target_role = request.data.get('target_role')

        if not file_obj:
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="MISSING_FILE",
                message="No file provided"
            )

        if not target_role:
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="MISSING_ROLE",
                message="Target role is required"
            )

        # Validate Role
        from skills.models import RoleSkillMatrix
        if not RoleSkillMatrix.objects.filter(role_name=target_role).exists():
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="INVALID_ROLE",
                message=f"Role '{target_role}' is not supported yet"
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
            ResumeAnalysisService.process_resume(str(job.id), file_path, target_role=target_role)
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
        except PermissionError as e:
            return api_response(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                error_code="INSUFFICIENT_CREDITS",
                message=str(e)
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

from django.http import HttpResponse
from .services import ResumeExportService

class ResumeExportView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        try:
            resume = Resume.objects.get(id=id, user=request.user)
            pdf_data = ResumeExportService.generate_pdf(resume)
            
            response = HttpResponse(pdf_data, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="Resume_Report_{resume.id}.pdf"'
            return response
        except Resume.DoesNotExist:
            return api_response(
                status_code=status.HTTP_404_NOT_FOUND,
                error_code="RESUME_NOT_FOUND",
                message="Resume not found"
            )
        except Exception as e:
            return api_response(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="EXPORT_FAILED",
                message=str(e)
            )

from .services import ResumeUpdateService

class SuggestionApplyView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id, *args, **kwargs):
        try:
            new_resume = ResumeUpdateService.apply_suggestion(request.user, str(id))
            return api_response(
                data={
                    "resume_id": str(new_resume.id),
                    "new_version": new_resume.version,
                    "overall_score": new_resume.overall_score,
                    "normalized": new_resume.normalized
                },
                message="Suggestion applied successfully"
            )
        except ValueError as e:
            return api_response(
                status_code=status.HTTP_409_CONFLICT,
                error_code="SUGGESTION_APPLY_FAILED",
                message=str(e)
            )
        except Exception as e:
            return api_response(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="SYSTEM_ERROR",
                message=str(e)
            )

class SuggestionDiscardView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id, *args, **kwargs):
        try:
            ResumeUpdateService.discard_suggestion(request.user, str(id))
            return api_response(
                data={"suggestion_id": str(id), "discarded": True},
                message="Suggestion discarded successfully"
            )
        except ValueError as e:
            return api_response(
                status_code=status.HTTP_409_CONFLICT,
                error_code="SUGGESTION_DISCARD_FAILED",
                message=str(e)
            )
        except Exception as e:
            return api_response(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="SYSTEM_ERROR",
                message=str(e)
            )
