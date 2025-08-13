# System Architecture

## Overview
The system is a Decision Support System (DSS) for intelligent task assignment and workload balancing.

## Components
1. **Backend**
   - Spring Boot (Java 21)
   - RESTful API
   - PostgreSQL for main database
   - Redis for caching/session (optional)
   - JWT/OAuth2 authentication
2. **Frontend**
   - React 18 + TypeScript + Vite
   - MUI for UI components
3. **DevOps**
   - GitHub Actions for CI/CD
   - Environment separation: dev, staging, prod

## Data Flow
1. User sends request from frontend → backend API.
2. Backend authenticates request via JWT/OAuth2.
3. Backend queries PostgreSQL / Redis.
4. Response returned as JSON to frontend.
5. Frontend updates UI based on user role and data.

## Module Structure
- **User Management**
- **Task Assignment**
- **Load Balancing Algorithm**
- **Analytics Dashboard**
- **Project Management**
