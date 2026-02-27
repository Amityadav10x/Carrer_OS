from rest_framework import serializers

class SkillAnalyzeRequestSerializer(serializers.Serializer):
    resume_id = serializers.UUIDField(required=False)
    target_role = serializers.CharField(max_length=255)
