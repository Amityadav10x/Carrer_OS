from rest_framework import views, status, permissions
from core.utils import api_response
from .services import RoadmapGenerationService
from .models import LearningRoadmap, RoadmapModule, LearningResource
from .serializers import LearningRoadmapSerializer
import logging

logger = logging.getLogger(__name__)

class GenerateRoadmapView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get('resume_id')
        if not resume_id:
            from resumes.models import Resume
            latest_resume = Resume.objects.filter(user=request.user).order_by('-created_at').first()
            if not latest_resume:
                return api_response(status_code=400, error_code="MISSING_RESUME_ID", message="Please upload a resume first.")
            resume_id = str(latest_resume.id)

        try:
            roadmap = RoadmapGenerationService.generate(request.user, resume_id)
            serializer = LearningRoadmapSerializer(roadmap)
            return api_response(data=serializer.data, message="Roadmap generated successfully")
        except ValueError as e:
            return api_response(status_code=400, error_code="GENERATION_FAILED", message=str(e))
        except Exception as e:
            logger.exception("Roadmap Generation failed")
            return api_response(status_code=500, error_code="INTERNAL_ERROR", message="An unexpected error occurred during generation.")

class ActiveRoadmapView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        roadmap = LearningRoadmap.objects.filter(user=request.user, status='active').prefetch_related('modules__resources').first()
        if not roadmap:
            return api_response(status_code=404, error_code="NOT_FOUND", message="No active roadmap found")
        
        serializer = LearningRoadmapSerializer(roadmap)
        return api_response(data=serializer.data)

class HistoryRoadmapView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        roadmaps = LearningRoadmap.objects.filter(user=request.user, status='archived').order_by('-created_at')
        serializer = LearningRoadmapSerializer(roadmaps, many=True)
        return api_response(data=serializer.data)

class ToggleResourceView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, resource_id):
        try:
            roadmap, module, resource = RoadmapGenerationService.toggle_resource(request.user, resource_id)
            
            # Since the frontend will likely want the updated module/roadmap data to refresh UI state:
            return api_response(data={
                "resource_id": str(resource.id),
                "completed": resource.completed,
                "module_progress": module.module_progress,
                "roadmap_progress": roadmap.overall_progress
            }, message="Resource toggled successfully")
        except LearningResource.DoesNotExist:
            return api_response(status_code=404, error_code="NOT_FOUND", message="Resource not found or unauthorized")
        except Exception as e:
            logger.exception("Toggle resource failed")
            return api_response(status_code=500, error_code="INTERNAL_ERROR", message="An execution error occurred")
