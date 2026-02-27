from rest_framework import serializers
from .models import Resume, ResumeSuggestion

class ResumeSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeSuggestion
        fields = ['id', 'original', 'improved', 'applied']

class ResumeSerializer(serializers.ModelSerializer):
    suggestions = ResumeSuggestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Resume
        fields = [
            'id', 'version', 'overall_score', 'normalized', 
            'extracted_skills', 'strengths', 'weaknesses', 'suggestions',
            'raw_content', 'created_at'
        ]
