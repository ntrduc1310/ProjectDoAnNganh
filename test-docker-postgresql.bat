@echo off
echo ========================================
echo 🐳 DOCKER + POSTGRESQL TESTING SCRIPT
echo ========================================

echo.
echo 📋 This script will:
echo 1. Start PostgreSQL with Docker
echo 2. Configure backend for PostgreSQL
echo 3. Test full stack with database
echo.

echo ⚠️  Make sure Docker Desktop is running!
echo.
pause

echo.
echo 🔨 Step 1: Starting PostgreSQL container...
docker run --name postgres-taskdb -e POSTGRES_DB=taskdb -e POSTGRES_USER=taskuser -e POSTGRES_PASSWORD=taskpass -p 5432:5432 -d postgres:15

echo.
echo ⏳ Waiting for PostgreSQL to start...
timeout /t 10 /nobreak > nul

echo.
echo 🔍 Step 2: Checking PostgreSQL connection...
docker exec postgres-taskdb psql -U taskuser -d taskdb -c "SELECT version();"

echo.
echo 📝 Step 3: Creating application-docker.properties for PostgreSQL...
echo # PostgreSQL Configuration for Docker > d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo server.port=8082 >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo server.servlet.context-path=/api >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.application.name=task-management-backend >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo. >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo # PostgreSQL Database >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.datasource.url=jdbc:postgresql://localhost:5432/taskdb >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.datasource.username=taskuser >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.datasource.password=taskpass >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.datasource.driver-class-name=org.postgresql.Driver >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo. >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo # JPA Configuration >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.jpa.hibernate.ddl-auto=create-drop >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties
echo spring.jpa.show-sql=true >> d:\ProjectDoAnNganh2\backend\backend\src\main\resources\application-docker.properties

echo.
echo 🚀 Step 4: Starting backend with PostgreSQL profile...
echo Opening new window for backend...
start "Backend with PostgreSQL" cmd /c "cd /d d:\ProjectDoAnNganh2\backend\backend && mvn spring-boot:run -Dspring-boot.run.profiles=docker"

echo.
echo ⏳ Waiting 40 seconds for backend to connect to PostgreSQL...
timeout /t 40 /nobreak > nul

echo.
echo 🧪 Step 5: Testing with PostgreSQL...

echo.
echo Testing Dashboard Stats:
curl -X GET http://localhost:8082/api/dashboard/stats -H "Content-Type: application/json"

echo.
echo.
echo Testing Create Task with PostgreSQL:
curl -X POST http://localhost:8082/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"PostgreSQL Test Task\",\"description\":\"Testing task creation with PostgreSQL database\",\"priority\":\"CRITICAL\",\"projectId\":1,\"assigneeEmail\":\"postgres@example.com\"}"

echo.
echo.
echo Testing Get All Tasks from PostgreSQL:
curl -X GET http://localhost:8082/api/tasks -H "Content-Type: application/json"

echo.
echo.
echo 🔍 Step 6: Checking PostgreSQL data...
echo Connecting to PostgreSQL to verify data was saved:
docker exec postgres-taskdb psql -U taskuser -d taskdb -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

echo.
echo.
echo ========================================
echo ✅ DOCKER + POSTGRESQL TEST COMPLETE!
echo ========================================
echo.
echo 📊 Results:
echo - PostgreSQL container: postgres-taskdb
echo - Database: taskdb
echo - Backend running with PostgreSQL
echo - Tasks should be persisted in PostgreSQL
echo.
echo 🛑 To stop everything:
echo docker stop postgres-taskdb
echo docker rm postgres-taskdb
echo.
echo 💡 To continue testing, keep everything running
echo    and use the frontend with http://localhost:8082
echo.
pause

echo.
echo 🧹 Cleanup? (Y/N)
set /p cleanup="Stop and remove PostgreSQL container? (Y/N): "
if /i "%cleanup%"=="Y" (
    echo Stopping PostgreSQL container...
    docker stop postgres-taskdb
    docker rm postgres-taskdb
    echo ✅ Cleanup complete
) else (
    echo 🏃 Leaving containers running for continued testing
)

echo.
echo 📝 Docker PostgreSQL test completed!
pause
