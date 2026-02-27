
import os
import sys
import json
import logging
import google.generativeai as genai
import environ

# Mock Django settings or load .env
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
api_key = env('GEMINI_API_KEY', default=None)

if not api_key:
    print("Error: GEMINI_API_KEY not found in .env")
    sys.exit(1)

def test_fix():
    print("\n--- Testing Gemini API Fix ---")
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        print("Testing basic generation...")
        response = model.generate_content("Say hello")
        print(f"Response: {response.text}")
        
        print("\nTesting JSON generation...")
        generation_config = {
            "response_mime_type": "application/json",
            "temperature": 0.1,
        }
        prompt = "Return a JSON object with a 'status' field set to 'success' and a 'message' field set to 'hello world'."
        response = model.generate_content(prompt, generation_config=generation_config)
        
        print(f"JSON Response: {response.text}")
        parsed_json = json.loads(response.text)
        print(f"Parsed JSON: {parsed_json}")
        
        if parsed_json.get('status') == 'success':
            print("\n✅ SUCCESS: Gemini API is working correctly with JSON output.")
        else:
            print("\n❌ FAILED: Unexpected JSON response structure.")

    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")

if __name__ == "__main__":
    test_fix()
