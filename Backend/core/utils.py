import uuid
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status

def api_response(data=None, status_code=status.HTTP_200_OK, usage=None, ai_metadata=None, message=None, error_code=None):
    """
    Standardized API response wrapper for CareerOS AI.
    """
    response_data = {
        "status": "success" if status_code < 400 else "error",
        "request_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }

    if status_code < 400:
        response_data["data"] = data
        if usage:
            response_data["usage"] = usage
        if ai_metadata:
            response_data["ai_metadata"] = ai_metadata
    else:
        response_data["error"] = {
            "code": error_code or "UNKNOWN_ERROR",
            "message": message or "An unexpected error occurred",
            "details": data
        }

    return Response(response_data, status=status_code)
