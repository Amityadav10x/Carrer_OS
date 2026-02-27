
import os
import sys
from google import genai
from google.genai import types
import environ

# Mock Django settings or load .env
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
api_key = env('GEMINI_API_KEY', default=None)

if not api_key:
    print("Error: GEMINI_API_KEY not found in .env")
    sys.exit(1)

def test_gemini_connection(api_version='v1'):
    print(f"\n--- Testing Gemini API (Version: {api_version}) ---")
    try:
        client = genai.Client(
            api_key=api_key,
            http_options=types.HttpOptions(api_version=api_version)
        )
        
        print("Listing models...")
        models = list(client.models.list())
        for m in models:
            print(f" - {m.name} (Methods: {m.supported_methods})")
            
        # Try a simple generation
        test_model = "gemini-1.5-flash" # Use a known safe one first
        print(f"\nTesting generation with {test_model}...")
        response = client.models.generate_content(
            model=test_model,
            contents="Say hello"
        )
        print(f"Response: {response.text}")
        
        # Try JSON generation
        print(f"\nTesting JSON generation with {test_model}...")
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1,
        )
        response = client.models.generate_content(
            model=test_model,
            contents="Return {'message': 'hello'} as JSON",
            config=config
        )
        print(f"JSON Response: {response.text}")

    except Exception as e:
        print(f"Error with {api_version}: {str(e)}")

if __name__ == "__main__":
    test_gemini_connection(api_version='v1')
    test_gemini_connection(api_version='v1beta')
