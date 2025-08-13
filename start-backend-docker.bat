@echo off
chcp 65001 >nul
echo ==========================================
echo 🚀 KHỞI ĐỘNG BACKEND VỚI DOCKER POSTGRESQL
echo ==========================================
echo.

echo 🐋 Kiểm tra Docker PostgreSQL...
docker ps | findstr doannganh-postgres >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL container chưa chạy!
    echo 📥 Vui lòng chạy start-postgresql-docker.bat trước
    pause
    exit /b 1
)

echo ✅ PostgreSQL container đang chạy
echo.

echo 🗄️ Kiểm tra database connection...
docker exec doannganh-postgres psql -U postgres -d doannganh_db -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Database chưa sẵn sàng, đợi thêm...
    timeout /t 10 /nobreak > nul
    docker exec doannganh-postgres psql -U postgres -d doannganh_db -c "SELECT 1;" >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Không thể kết nối database!
        pause
        exit /b 1
    )
)

echo ✅ Database connection OK
echo.

echo 🚀 Khởi động Spring Boot backend...
echo 📋 Cấu hình:
echo    - Profile: postgresql
echo    - Database: doannganh_db (Docker)
echo    - Host: localhost:5432
echo    - Port: 8081
echo    - Flyway migrations: enabled
echo    - Load Balancing: 5 algorithms
echo.

cd backend\backend

echo 🔧 Cleaning và compiling...
call mvn clean compile

echo.
echo 🚀 Starting application...
call mvn spring-boot:run

pause
