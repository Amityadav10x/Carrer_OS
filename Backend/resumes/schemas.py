from pydantic import BaseModel, Field, field_validator
from typing import List, Annotated

class SuggestionSchema(BaseModel):
    original: str = Field(..., description="The original text from the resume")
    improved: str = Field(..., description="The AI-suggested improvement")

class ResumeAnalysisSchema(BaseModel):
    overall_score: int = Field(..., ge=0, le=100, description="Overall resume score 0-100")
    strengths: List[str] = Field(..., min_length=3, description="At least 3 strengths")
    weaknesses: List[str] = Field(..., min_length=3, description="At least 3 weaknesses")
    extracted_skills: List[str] = Field(..., min_length=5, description="At least 5 extracted skills")
    suggestions: List[SuggestionSchema] = Field(..., min_length=3, description="At least 3 improvement suggestions")

    @field_validator('overall_score', mode='before')
    @classmethod
    def normalize_score(cls, v):
        if isinstance(v, str):
            # Handle "85%", "8.5/10", etc.
            v = v.replace('%', '').split('/')[0]
            try:
                v = float(v)
            except ValueError:
                v = 0
        
        # Clamp and convert to int
        if isinstance(v, (int, float)):
            # If it looks like a 0-10 scale, normalize to 100
            if v <= 10 and v > 0:
                v = v * 10
            return int(max(0, min(100, v)))
        return 0
