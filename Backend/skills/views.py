from rest_framework import generics, status, permissions
from core.utils import api_response
from .serializers import SkillAnalyzeRequestSerializer
from .models import RoleSkillMatrix
from .services import SkillGapService

class RoleListView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        roles = RoleSkillMatrix.objects.values_list('role_name', flat=True).distinct()
        return api_response(data={"roles": list(roles)})

class SkillAnalyzeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SkillAnalyzeRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="INVALID_INPUT",
                message="Invalid request data",
                data=serializer.errors
            )

        target_role = serializer.validated_data.get('target_role')
        resume_id = serializer.validated_data.get('resume_id')

        try:
            result = SkillGapService.generate_gap_analysis(
                user=request.user,
                target_role=target_role,
                resume_id=resume_id
            )
            return api_response(data=result)
        except ValueError as e:
            # Handle 404/400 scenarios as per business logic
            msg = str(e)
            error_code = "ROLE_NOT_FOUND" if "role" in msg.lower() else "RESUME_NOT_FOUND"
            status_code = status.HTTP_400_BAD_REQUEST if error_code == "ROLE_NOT_FOUND" else status.HTTP_404_NOT_FOUND
            
            return api_response(
                status_code=status_code,
                error_code=error_code,
                message=msg
            )
        except Exception as e:
            return api_response(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="SYSTEM_ERROR",
                message=str(e)
            )
