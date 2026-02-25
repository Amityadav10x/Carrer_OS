from rest_framework.views import APIView
from rest_framework import permissions
from core.utils import api_response

class HealthCheckView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # In a real scenario, we would check DB/AI service connectivity here
        status_data = {
            "status": "healthy",
            "database": "connected",
            "ai_service": "operational"
        }
        return api_response(data=status_data)
