import os
import json
import logging
import google.generativeai as genai
from django.conf import settings
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

class GeminiAIClient:
    def __init__(self, model_name: str = "gemini-1.5-flash"):
        api_key = getattr(settings, "GEMINI_API_KEY", None)
        if not api_key:
            raise ValueError("GEMINI_API_KEY not configured in settings")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def _clean_json_response(self, text: str) -> str:
        """Strips markdown code fences and extracts the first JSON block."""
        # Remove markdown code fences if present
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        
        # Find first '{' and last '}'
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            return text[start:end+1]
        
        return text.strip()

    def generate_json(self, prompt: str, retry_count: int = 1) -> Optional[Dict[str, Any]]:
        """Generates JSON content from Gemini with retry logic."""
        for attempt in range(retry_count + 1):
            try:
                response = self.model.generate_content(prompt)
                raw_text = response.text
                clean_json = self._clean_json_response(raw_text)
                return json.loads(clean_json)
            except Exception as e:
                logger.error(f"Gemini API Error (Attempt {attempt + 1}): {str(e)}")
                if attempt == retry_count:
                    raise e
        return None

# Singleton instance
gemini_client = None
try:
    if getattr(settings, "GEMINI_API_KEY", None):
        gemini_client = GeminiAIClient()
except Exception as e:
    logger.warning(f"Could not initialize GeminiAIClient: {str(e)}")
