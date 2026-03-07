from rest_framework import serializers
from .models import LearningRoadmap, RoadmapModule, LearningResource

class LearningResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = ['id', 'title', 'resource_type', 'url', 'provider', 'estimated_minutes', 'difficulty', 'priority', 'completed', 'order']

class RoadmapModuleSerializer(serializers.ModelSerializer):
    resources = LearningResourceSerializer(many=True, read_only=True)

    class Meta:
        model = RoadmapModule
        fields = ['id', 'skill_name', 'title', 'description', 'phase', 'order', 'estimated_hours', 'difficulty', 'module_progress', 'completed', 'resources']

class LearningRoadmapSerializer(serializers.ModelSerializer):
    modules = RoadmapModuleSerializer(many=True, read_only=True)

    class Meta:
        model = LearningRoadmap
        fields = ['id', 'resume', 'target_role', 'gap_snapshot', 'overall_progress', 'estimated_total_hours', 'estimated_completion_days', 'status', 'version', 'modules', 'created_at']
