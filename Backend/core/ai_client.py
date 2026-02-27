import json
import logging
from typing import Optional, Dict, Any

import google.generativeai as genai
from django.conf import settings
logger = logging.getLogger(__name__)

class GeminiAIClient:
    """
    Client for interacting with Google Gemini API.
    Updated for Feb 2026: Uses Gemini 1.5 Flash as standard stable model.
    """
    def __init__(self, model_name: str = "gemini-2.5-flash"):
        api_key = getattr(settings, "GEMINI_API_KEY", None)
        if not api_key:
            raise ValueError("GEMINI_API_KEY not configured in settings")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)
        self.model_name = model_name

    def generate_json(self, prompt: str, retry_count: int = 1) -> Optional[Dict[str, Any]]:
        """
        Generates structured JSON using Gemini's native 'response_mime_type'.
        """
        # Configure the model to respond ONLY in valid JSON
        generation_config = {
            "response_mime_type": "application/json",
            "temperature": 0.1,
        }

        for attempt in range(retry_count + 1):
            try:
                response = self.model.generate_content(
                    prompt,
                    generation_config=generation_config
                )

                if not response.text:
                    raise ValueError("Empty response from Gemini")

                return json.loads(response.text)

            except Exception as e:
                logger.error(f"Gemini Error (Attempt {attempt + 1}): {str(e)}")
                
                # Handle common errors or model variations if necessary
                if attempt == retry_count:
                    raise

        return None

# Singleton instance for use across your Django app
gemini_client = None
try:
    if getattr(settings, "GEMINI_API_KEY", None):
        gemini_client = GeminiAIClient()
except Exception as e:
    logger.warning(f"Could not initialize GeminiAIClient: {str(e)}")