# Instructions for GitHub Copilot

Bạn **luôn** phải đọc và áp dụng toàn bộ nội dung trong thư mục `.github/copilot/` gồm:
- glossary.md
- architecture.md
- api-spec.yml

Các tiêu chuẩn phát triển, API, và kiến trúc phải được tuân thủ nghiêm ngặt.
# Development Guidelines


## Backend (Spring Boot, Java 21, PostgreSQL, RESTful API)
- Use Spring Boot with Java 21, dependencies managed via Maven.
- Follow RESTful API best practices: correct HTTP methods, proper status codes.
- All endpoints must require JWT or OAuth2 authentication.
- Implement RBAC with roles: admin, manager, user.
- Use Spring Data JPA/Hibernate, avoid raw SQL.
- Migrations handled by Flyway or Liquibase; include seeders if needed.
- Enable CORS for allowed domains only.
- Support file upload via Spring Boot; AWS S3 storage if needed.
- Return JSON responses in format: `{ success, data, message, errors }`.
- Group API under `/api/v1/...`.
- Document with Swagger/OpenAPI.

## Frontend (React 18, Vite, TypeScript, MUI)
- Use React 18 with TypeScript and Vite.
- UI: MUI v6.4.11 for consistent, responsive design.
- State management via React Context or Redux Toolkit.
- All requests use JWT; store tokens in HttpOnly cookies or localStorage.
- Apply RBAC on UI; hide/show features by role.
- Optimize with lazy loading, code splitting, memoization.
- Test with Jest + React Testing Library.
- Ensure proper CORS configuration.

## DevOps & CI/CD
- Git branch naming conventions, PR + code review required.
- `.env` for dev/staging/prod.
- CI/CD with GitHub Actions or GitLab CI.
- PostgreSQL backups + log monitoring with email/Slack alerts.
- No sensitive data in commits; scan for vulnerabilities.

## API Design
- Use plural nouns for resources (/tasks, /projects).
- Support pagination, filter, sort on list endpoints.
- Idempotency for PUT/PATCH/DELETE.
- Detailed, human-readable error messages.
- Keep Swagger/OpenAPI updated.
