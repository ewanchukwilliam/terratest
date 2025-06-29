# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a dual-stack web application with:
- **Frontend**: React + Vite application in `terratest/` directory using Tailwind CSS for styling
- **Backend**: Django REST API in `terratester/` directory with SQLite database
- **Containerization**: Docker setup with separate frontend and backend containers

The frontend and backend are designed to work together but are developed and deployed separately.

## Development Commands

### Frontend (React + Vite)
```bash
cd terratest
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend (Django)
```bash
cd terratester
pip install -r ../requirements.txt  # Install Python dependencies
python manage.py runserver          # Start development server (port 8000)
python manage.py migrate            # Run database migrations
python manage.py createsuperuser    # Create admin user
```

### Docker Development
```bash
docker-compose up --build    # Build and start both services
docker-compose up            # Start existing containers
docker-compose down          # Stop all services
```

## Key Files and Structure

- `terratest/` - React frontend application with Vite build tooling
- `terratester/` - Django backend API with standard Django project structure
- `docker-compose.yml` - Orchestrates frontend and backend containers
- `requirements.txt` - Python dependencies for Django backend
- `Dockerfile.frontend` - Frontend container configuration (Node.js)
- `Dockerfile.backend` - Backend container configuration (Python)

## Development Notes

- Frontend runs on default Vite port (typically 5173)
- Backend Django server runs on port 8000
- SQLite database is used by default for development
- ESLint is configured for the React frontend
- The project uses modern React (v19) with hooks and functional components