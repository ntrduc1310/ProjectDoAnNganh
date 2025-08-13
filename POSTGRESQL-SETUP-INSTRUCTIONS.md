# PostgreSQL Installation and Setup Guide for Capstone Project

## Prerequisites
This capstone project requires PostgreSQL for full production features including:
- Advanced load balancing algorithms
- Complex analytics and reporting
- Professional-grade database features
- Full-text search capabilities

## Option 1: Install PostgreSQL Locally (Recommended for Development)

### Step 1: Download PostgreSQL
1. Visit: https://www.postgresql.org/download/windows/
2. Download PostgreSQL 15 or 16 (latest stable version)
3. Run the installer with these settings:
   - **Username**: postgres
   - **Password**: password (for development)
   - **Port**: 5432
   - **Locale**: Default

### Step 2: Add PostgreSQL to PATH
1. Find PostgreSQL installation directory (usually `C:\Program Files\PostgreSQL\15\bin`)
2. Add to Windows PATH environment variable
3. Restart Command Prompt/VS Code

### Step 3: Verify Installation
```cmd
psql --version
```

### Step 4: Create Database
```cmd
cd d:\ProjectDoAnNganh2\database-scripts
setup-postgresql.bat
```

## Option 2: Use H2 Database for Quick Testing

### Temporary H2 Profile
If you want to test quickly without PostgreSQL:

1. Update `application.yml` to use H2 profile:
```yaml
spring:
  profiles:
    active: h2  # Temporary for testing
```

2. Run the backend:
```cmd
cd d:\ProjectDoAnNganh2\backend\backend
mvn spring-boot:run
```

## Option 3: Docker PostgreSQL (Alternative)

### Using Docker Compose
```cmd
cd d:\ProjectDoAnNganh2
docker-compose up -d postgres
```

This will start PostgreSQL in a Docker container.

## Database Features Comparison

### H2 Database (Development Only)
✅ Quick setup and testing
✅ In-memory database
❌ Limited production features
❌ No advanced analytics
❌ Basic load balancing only

### PostgreSQL (Production Ready)
✅ Full production features
✅ Advanced analytics and reporting
✅ Complex load balancing algorithms
✅ Professional-grade performance
✅ Full-text search capabilities
✅ JSONB support for flexible data
✅ Advanced indexing strategies

## Next Steps

1. **For Quick Testing**: Use H2 profile temporarily
2. **For Full Features**: Install PostgreSQL locally
3. **For Production**: Use PostgreSQL with proper configuration

## Database Migration

The project includes Flyway migrations that will automatically:
- Create all required tables
- Set up indexes for performance
- Insert sample data for testing
- Configure advanced PostgreSQL features

## Configuration Files

- **Development**: `application.yml` with multiple profiles
- **Database Schema**: `src/main/resources/db/migration/`
- **Sample Data**: Included in migration files
- **Setup Scripts**: `database-scripts/` directory

## Support

If you encounter issues:
1. Check PostgreSQL service is running
2. Verify database credentials
3. Ensure PORT 5432 is available
4. Check Windows firewall settings

For immediate testing, you can use H2 profile while setting up PostgreSQL.
