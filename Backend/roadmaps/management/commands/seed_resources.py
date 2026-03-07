import json
from django.core.management.base import BaseCommand
from roadmaps.models import SkillResourceLibrary

SEED_DATA = [
    # Node.js
    {
        "skill_name": "Node.js",
        "title": "Node.js Ultimate Crash Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=f2EqECiTBL8",
        "provider": "Traversy Media",
        "difficulty": "beginner",
        "estimated_hours": 1.5,
        "tags": ["backend", "javascript", "crash-course"]
    },
    {
        "skill_name": "Node.js",
        "title": "Node.js Official Documentation",
        "resource_type": "documentation",
        "url": "https://nodejs.org/en/docs/",
        "provider": "Node.js Foundation",
        "difficulty": "intermediate",
        "estimated_hours": 3.0,
        "tags": ["backend", "reference"]
    },
    {
        "skill_name": "Node.js",
        "title": "Build a REST API with Node.js and Express",
        "resource_type": "project",
        "url": "https://www.codecademy.com/learn/build-choose-your-own-adventure-learning-api",
        "provider": "Codecademy",
        "difficulty": "intermediate",
        "estimated_hours": 5.0,
        "tags": ["backend", "api", "project"]
    },
    # React
    {
        "skill_name": "React",
        "title": "React.js Tutorial for Beginners",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=SqcY0GlETPk",
        "provider": "Programming with Mosh",
        "difficulty": "beginner",
        "estimated_hours": 2.5,
        "tags": ["frontend", "javascript", "react"]
    },
    {
        "skill_name": "React",
        "title": "React Official Documentation (Beta)",
        "resource_type": "documentation",
        "url": "https://react.dev/learn",
        "provider": "Meta",
        "difficulty": "intermediate",
        "estimated_hours": 4.0,
        "tags": ["frontend", "react", "reference"]
    },
    {
        "skill_name": "React",
        "title": "Build a Tic-Tac-Toe Game in React",
        "resource_type": "project",
        "url": "https://react.dev/learn/tutorial-tic-tac-toe",
        "provider": "Meta",
        "difficulty": "beginner",
        "estimated_hours": 2.0,
        "tags": ["frontend", "react", "project"]
    },
    # Docker
    {
        "skill_name": "Docker",
        "title": "Docker Tutorial for Beginners",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
        "provider": "TechWorld with Nana",
        "difficulty": "beginner",
        "estimated_hours": 3.0,
        "tags": ["devops", "docker", "containers"]
    },
    {
        "skill_name": "Docker",
        "title": "Dockerizing a Node.js web app",
        "resource_type": "tutorial",
        "url": "https://nodejs.org/en/docs/guides/nodejs-docker-webapp/",
        "provider": "Node.js",
        "difficulty": "intermediate",
        "estimated_hours": 1.5,
        "tags": ["devops", "docker", "nodejs"]
    },
    {
        "skill_name": "Docker",
        "title": "Docker Best Practices",
        "resource_type": "documentation",
        "url": "https://docs.docker.com/develop/dev-best-practices/",
        "provider": "Docker Inc",
        "difficulty": "advanced",
        "estimated_hours": 2.0,
        "tags": ["devops", "docker", "best-practices"]
    },
    # Python
    {
        "skill_name": "Python",
        "title": "Python for Beginners - Full Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        "provider": "Programming with Mosh",
        "difficulty": "beginner",
        "estimated_hours": 6.0,
        "tags": ["backend", "python", "programming"]
    },
    {
        "skill_name": "Python",
        "title": "Python PEP 8 Style Guide",
        "resource_type": "documentation",
        "url": "https://peps.python.org/pep-0008/",
        "provider": "Python Software Foundation",
        "difficulty": "intermediate",
        "estimated_hours": 1.0,
        "tags": ["python", "best-practices"]
    },
    # System Design
    {
        "skill_name": "System Design",
        "title": "System Design Interview Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=bUHFg8Cj5sn3",
        "provider": "Gaurav Sen",
        "difficulty": "advanced",
        "estimated_hours": 10.0,
        "tags": ["architecture", "scaling", "interview"]
    },
    {
        "skill_name": "System Design",
        "title": "AWS Architecture Center",
        "resource_type": "documentation",
        "url": "https://aws.amazon.com/architecture/",
        "provider": "Amazon Web Services",
        "difficulty": "intermediate",
        "estimated_hours": 5.0,
        "tags": ["cloud", "architecture", "aws"]
    },
    # SQL
    {
        "skill_name": "SQL",
        "title": "SQL Tutorial - Full Database Course for Beginners",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        "provider": "freeCodeCamp",
        "difficulty": "beginner",
        "estimated_hours": 4.0,
        "tags": ["database", "sql"]
    },
    {
        "skill_name": "SQL",
        "title": "PostgreSQL Tutorial",
        "resource_type": "tutorial",
        "url": "https://www.postgresqltutorial.com/",
        "provider": "PostgreSQL Tutorial",
        "difficulty": "intermediate",
        "estimated_hours": 8.0,
        "tags": ["database", "sql", "postgresql"]
    },
    # FastAPI
    {
        "skill_name": "FastAPI",
        "title": "FastAPI Tutorial - Build a REST API",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "provider": "Tech With Tim",
        "difficulty": "intermediate",
        "estimated_hours": 2.0,
        "tags": ["backend", "python", "fastapi"]
    },
    # Django
    {
        "skill_name": "Django",
        "title": "Django for Everybody",
        "resource_type": "course",
        "url": "https://www.dj4e.com/",
        "provider": "Dr. Chuck",
        "difficulty": "beginner",
        "estimated_hours": 15.0,
        "tags": ["backend", "python", "django"]
    },
    {
        "skill_name": "Django",
        "title": "Django Official Docs",
        "resource_type": "documentation",
        "url": "https://docs.djangoproject.com/en/5.0/",
        "provider": "Django Software Foundation",
        "difficulty": "intermediate",
        "estimated_hours": 5.0,
        "tags": ["backend", "python", "django"]
    },
    # Next.js
    {
        "skill_name": "Next.js",
        "title": "Next.js App Router Crash Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=Y6KDk5iyrYE",
        "provider": "Traversy Media",
        "difficulty": "intermediate",
        "estimated_hours": 2.0,
        "tags": ["frontend", "react", "nextjs"]
    },
    {
        "skill_name": "Next.js",
        "title": "Next.js Docs",
        "resource_type": "documentation",
        "url": "https://nextjs.org/docs",
        "provider": "Vercel",
        "difficulty": "intermediate",
        "estimated_hours": 4.0,
        "tags": ["frontend", "react", "nextjs"]
    },
    # Tailwind CSS
    {
        "skill_name": "Tailwind CSS",
        "title": "Tailwind CSS Tutorial",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=UBOj6rqRUME",
        "provider": "Traversy Media",
        "difficulty": "beginner",
        "estimated_hours": 1.5,
        "tags": ["frontend", "css", "tailwind"]
    },
    # Git
    {
        "skill_name": "Git",
        "title": "Git and GitHub for Beginners",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=RGOj5yH7evk",
        "provider": "freeCodeCamp",
        "difficulty": "beginner",
        "estimated_hours": 1.0,
        "tags": ["devops", "version-control", "git"]
    },
    # Kubernetes
    {
        "skill_name": "Kubernetes",
        "title": "Kubernetes Crash Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=s_o8dwzRlu4",
        "provider": "TechWorld with Nana",
        "difficulty": "advanced",
        "estimated_hours": 3.5,
        "tags": ["devops", "kubernetes", "containers"]
    },
    # Redis
    {
        "skill_name": "Redis",
        "title": "Redis Crash Course",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
        "provider": "Traversy Media",
        "difficulty": "intermediate",
        "estimated_hours": 1.0,
        "tags": ["database", "redis", "caching"]
    },
    # CI/CD
    {
        "skill_name": "CI/CD",
        "title": "GitHub Actions Tutorial",
        "resource_type": "course",
        "url": "https://www.youtube.com/watch?v=R8_veQiYBjI",
        "provider": "TechWorld with Nana",
        "difficulty": "intermediate",
        "estimated_hours": 2.0,
        "tags": ["devops", "ci-cd", "github"]
    }
]

class Command(BaseCommand):
    help = 'Seeds the SkillResourceLibrary with a curated list of learning resources'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding SkillResourceLibrary...")
        
        created_count = 0
        updated_count = 0
        
        for item_data in SEED_DATA:
            obj, created = SkillResourceLibrary.objects.update_or_create(
                skill_name=item_data['skill_name'],
                title=item_data['title'],
                defaults=item_data
            )
            if created:
                created_count += 1
            else:
                updated_count += 1
                
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded database! ({created_count} created, {updated_count} updated)'))
