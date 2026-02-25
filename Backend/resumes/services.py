import os
import time
import logging
from typing import Dict, Any, Optional
import PyPDF2
import docx
from django.db import transaction
from django.utils import timezone
from django.contrib.auth import get_user_model

from resumes.models import Resume, ResumeSuggestion
from resumes.schemas import ResumeAnalysisSchema
from core.ai_client import gemini_client
from core.models import AsyncJob
from analytics.models import AIUsage
from billing.models import CreditTransaction

User = get_user_model()
logger = logging.getLogger(__name__)

class ResumeAnalysisService:
    @staticmethod
    def extract_text(file_path: str) -> str:
        """Extracts text from PDF or DOCX file, truncated to 10,000 characters."""
        text = ""
        _, ext = os.path.splitext(file_path)
        ext = ext.lower()

        try:
            if ext == '.pdf':
                with open(file_path, 'rb') as f:
                    reader = PyPDF2.PdfReader(f)
                    for page in reader.pages:
                        text += page.extract_text() or ""
            elif ext == '.docx':
                doc = docx.Document(file_path)
                text = "\n".join([para.text for para in doc.paragraphs])
            else:
                raise ValueError(f"Unsupported file type: {ext}")
        except Exception as e:
            logger.error(f"Text extraction failed: {str(e)}")
            raise e

        return text[:10000] # Safeguard: Truncate to 10k chars

    @staticmethod
    def process_resume(job_id: str, file_path: str):
        """Orchestrates the resume analysis pipeline."""
        start_time = time.time()
        job = AsyncJob.objects.get(id=job_id)
        user = job.user

        try:
            # 1. Update status
            job.status = 'processing'
            job.save()

            # 2. Extract text
            raw_text = ResumeAnalysisService.extract_text(file_path)

            # 3. Call Gemini
            prompt = f"""
            Identify the core strengths, weaknesses, and key professional skills from the following resume text.
            Also provide specific improvement suggestions.
            
            RESUME TEXT:
            {raw_text}
            
            Return ONLY a valid JSON object with this structure:
            {{
              "overall_score": 0-100,
              "strengths": ["at least 3 strings"],
              "weaknesses": ["at least 3 strings"],
              "extracted_skills": ["at least 5 strings"],
              "suggestions": [
                {{
                  "original": "original text segment",
                  "improved": "better alternative"
                }}
              ]
            }}
            """
            
            ai_response = gemini_client.generate_json(prompt)
            if not ai_response:
                raise ValueError("Failed to get response from Gemini")

            # 4. Validate with Pydantic
            analysis_data = ResumeAnalysisSchema(**ai_response)

            # 5. Atomic Credit Deduction & Persistence
            with transaction.atomic():
                # Lock user for credit safety
                user_locked = User.objects.select_for_update().get(id=user.id)
                if user_locked.credits < 50:
                    raise ValueError("Insufficient credits for analysis")

                # Deduct credits
                user_locked.credits -= 50
                user_locked.save()

                # Create Credit Transaction
                CreditTransaction.objects.create(
                    user=user_locked,
                    type='debit',
                    source='resume',
                    amount=50,
                    reference_id=job.id
                )

                # Save Resume
                current_version = Resume.objects.filter(user=user_locked).count() + 1
                resume = Resume.objects.create(
                    user=user_locked,
                    version=current_version,
                    overall_score=analysis_data.overall_score,
                    normalized=True,
                    extracted_skills=analysis_data.extracted_skills,
                    strengths=analysis_data.strengths,
                    weaknesses=analysis_data.weaknesses
                )

                # Save Suggestions
                suggestions = [
                    ResumeSuggestion(
                        resume=resume,
                        original=s.original,
                        improved=s.improved
                    ) for s in analysis_data.suggestions
                ]
                ResumeSuggestion.objects.bulk_create(suggestions)

                # Log AI Usage
                processing_time = int((time.time() - start_time) * 1000)
                AIUsage.objects.create(
                    user=user_locked,
                    endpoint="resume_upload",
                    model_used="gemini-1.5-flash",
                    processing_time_ms=processing_time
                )

                # Finalize Job
                job.status = 'completed'
                job.result_reference = resume.id
                job.save()

        except Exception as e:
            logger.error(f"Analysis pipeline failed: {str(e)}")
            job.status = 'failed'
            job.error_message = str(e)
            job.save()
            raise e
