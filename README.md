# Terraform AWS Elastic Beanstalk Project

This project demonstrates Infrastructure as Code (IaC) using Terraform to deploy a containerized application to AWS Elastic Beanstalk, with automated deployment through GitHub Actions.

## Project Architecture

### Frontend & Backend Applications
- **Frontend**: React + Vite application (`terratest/` directory) using Tailwind CSS
- **Backend**: Django REST API (`terratester/` directory) with SQLite database
- **Containerization**: Docker setup with nginx reverse proxy

### Application Stack
- **Nginx**: Reverse proxy routing frontend/backend requests
- **React**: Modern frontend with Vite build tooling
- **Django**: REST API backend with Django REST Framework
- **Docker**: Multi-container development environment

### Infrastructure as Code (Terraform)
- **Elastic Beanstalk**: AWS service for deploying and managing web applications
- **Application Versions**: Automated deployment of Docker containers
- **Environment Configuration**: Development, staging, and production environments
- **State Management**: Remote state storage using S3 and DynamoDB

### CI/CD Pipeline (GitHub Actions)
- **Automated Deployment**: Triggered on code changes
- **Terraform Plan**: Preview infrastructure changes
- **Terraform Apply**: Deploy approved changes
- **Environment Promotion**: Deploy through dev → staging → production

## Terraform Methodology

### 1. Infrastructure as Code Benefits
- **Version Control**: All infrastructure changes are tracked in Git
- **Reproducibility**: Identical environments can be created consistently
- **Collaboration**: Team members can review infrastructure changes
- **Automation**: Reduces manual deployment errors

### 2. Terraform Workflow
```
Write → Plan → Apply → Manage
```

### 3. State Management
- **Remote State**: Stored in AWS S3 for team collaboration
- **State Locking**: DynamoDB prevents concurrent modifications
- **State Versioning**: Track infrastructure changes over time

### 4. Environment Strategy
- **Multi-Environment**: Separate dev, staging, production
- **Variable Management**: Environment-specific configurations
- **Promotion Pipeline**: Controlled deployment flow

## AWS Services Used

### Elastic Beanstalk
- **Application Platform**: Manages EC2 instances, load balancers, auto-scaling
- **Docker Support**: Deploys containerized applications
- **Environment Management**: Blue/green deployments, configuration management
- **Monitoring**: Built-in application and infrastructure monitoring

### Supporting Services
- **S3**: Terraform state storage and application artifacts
- **DynamoDB**: Terraform state locking
- **IAM**: Service roles and permissions
- **CloudWatch**: Logging and monitoring
- **Route 53**: DNS management (optional)

## Deployment Process Overview

### Manual Terraform Commands
1. `terraform init` - Initialize backend and download providers
2. `terraform plan` - Preview infrastructure changes
3. `terraform apply` - Apply changes to AWS
4. `terraform destroy` - Remove all infrastructure (cleanup)

### GitHub Actions Automation
1. **Trigger**: Push to main branch or pull request
2. **Plan**: Generate and review infrastructure changes
3. **Apply**: Deploy approved changes automatically
4. **Notify**: Send deployment status to team

## Local Development

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd terraform

# Start all services with Docker
docker-compose up --build

# Access the application
# Frontend + Backend: http://localhost (nginx proxy)
# Direct frontend: http://localhost:5173 (if ports exposed)
# Backend API: http://localhost/api/
# Django Admin: http://localhost/admin/
```

### Development Commands

#### Frontend (React + Vite)
```bash
cd terratest
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

#### Backend (Django)
```bash
cd terratester
pip install -r ../requirements.txt  # Install Python dependencies
python manage.py runserver          # Start development server (port 8000)
python manage.py migrate            # Run database migrations
python manage.py createsuperuser    # Create admin user
```

#### Docker Development
```bash
docker-compose up --build    # Build and start all services
docker-compose up            # Start existing containers
docker-compose down          # Stop all services
docker-compose logs          # View logs
docker-compose logs nginx    # View specific service logs
```

### Project Structure
```
terraform/
├── terratest/              # React frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── terratester/            # Django backend application
│   ├── api/               # API app
│   ├── terratester/       # Django project settings
│   ├── manage.py
│   └── db.sqlite3
├── docker-compose.yml      # Multi-container configuration
├── Dockerfile.frontend     # React container
├── Dockerfile.backend      # Django container  
├── Dockerfile.nginx        # Nginx proxy container
├── nginx.conf             # Nginx routing configuration
├── requirements.txt       # Python dependencies
└── CLAUDE.md             # Development guidance
```

### API Endpoints
- `GET /api/hello/` - Test endpoint returning JSON response
- `GET /admin/` - Django admin interface
- `GET /` - React frontend application

### Container Architecture
- **nginx** (port 80): Main entry point, routes requests
  - `/` → React frontend
  - `/api/*` → Django backend
  - `/admin/*` → Django admin
- **frontend** (port 5173): React development server
- **backend** (port 8000): Django development server

## Security Considerations
- **AWS Credentials**: Stored as GitHub Secrets
- **Least Privilege**: IAM roles with minimal required permissions  
- **Environment Variables**: Sensitive data managed through AWS Parameter Store
- **State File Security**: S3 bucket encryption and access controls
- **CORS Configuration**: Properly configured for frontend/backend communication
