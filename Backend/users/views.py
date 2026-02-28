from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer
from core.utils import api_response

User = get_user_model()

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.exceptions import ValidationError

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            
            user_data = UserSerializer(user).data
            
            return api_response(
                data={
                    "user": user_data
                },
                status_code=status.HTTP_201_CREATED,
                message="User registered successfully. Please proceed to login."
            )
        except ValidationError as e:
            # Extract the first error message
            error_msg = "Validation failed"
            if isinstance(e.detail, dict):
                first_field = next(iter(e.detail))
                error_msg = f"{first_field}: {e.detail[first_field][0]}"
            elif isinstance(e.detail, list):
                error_msg = e.detail[0]
                
            return api_response(
                status_code=status.HTTP_400_BAD_REQUEST,
                error_code="VALIDATION_ERROR",
                message=error_msg,
                data=e.detail
            )

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = User.objects.get(email=request.data.get('email'))
            return api_response(
                data={
                    "user": UserSerializer(user).data,
                    "tokens": response.data
                },
                message="Login successful"
            )
        return response

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        user_data = self.get_serializer(user).data
        # Mocking usage data for now but including real credits
        usage = {
            "total_tokens_allocated": 10000,
            "tokens_used": 1550,
            "tokens_remaining": 8450,
            "tier": "Pro"
        }
        return api_response(data=user_data, usage=usage)
