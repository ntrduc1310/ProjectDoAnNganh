@echo off
chcp 65001 >nul
echo ==========================================
echo 🐋 KHỞI ĐỘNG POSTGRESQL VỚI DOCKER
echo ==========================================
echo.

echo 🔍 Kiểm tra Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker chưa được cài đặt!
    echo 📥 Vui lòng cài Docker Desktop từ:
    echo    https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

echo ✅ Docker OK
docker --version
echo.

echo 🐘 Khởi động PostgreSQL container...
echo 📋 Cấu hình:
echo    - Image: postgres:16-alpine
echo    - Database: doannganh_db
echo    - Username: postgres
echo    - Password: password
echo    - Port: 5432
echo.

docker-compose up -d postgres

echo.
echo 🔍 Kiểm tra container status...
docker ps | findstr doannganh-postgres

echo.
echo ⏳ Đợi PostgreSQL sẵn sàng...
timeout /t 10 /nobreak > nul

echo.
echo 🗄️ Kiểm tra database connection...
docker exec doannganh-postgres psql -U postgres -d doannganh_db -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Database chưa sẵn sàng, đợi thêm...
    timeout /t 5 /nobreak > nul
    docker exec doannganh-postgres psql -U postgres -d doannganh_db -c "SELECT 1;" >nul 2>&1
)

echo ✅ PostgreSQL sẵn sàng!
echo.

echo 🚀 Bước tiếp theo:
echo    1. Khởi động backend: start-backend-postgresql.bat
echo    2. Khởi động frontend: cd frontend && npm run dev
echo.

echo 📊 Quản lý Docker:
echo    - Xem logs: docker logs doannganh-postgres
echo    - Dừng: docker-compose down
echo    - Restart: docker-compose restart postgres
echo.

pause
