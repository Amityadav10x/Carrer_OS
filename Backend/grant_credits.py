import os
import sys
import django
from django.db.models import F

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User

def grant_credits(amount=1000, email=None):
    """
    Grants credits to users. 
    If email is provided, only that user gets credits.
    Otherwise, all users get credits.
    """
    try:
        if email:
            users = User.objects.filter(email=email)
            if not users.exists():
                print(f"Error: User with email {email} not found.")
                return
        else:
            users = User.objects.all()

        count = users.update(credits=F('credits') + amount)
        print(f"Successfully granted {amount} credits to {count} user(s).")
        
        # Display current balances for confirmation
        for user in users:
            print(f"User: {user.email} | New Balance: {user.credits}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # You can pass an email as an argument to only grant credits to that user
    target_email = sys.argv[1] if len(sys.argv) > 1 else None
    grant_credits(amount=1000, email=target_email)
