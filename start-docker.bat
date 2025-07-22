@echo off
chcp 65001 >nul
title DoAn Nganh - Docker Manager
color 0A

echo.
echo ============================================
echo       STARTING DOAN NGANH DOCKER
echo ============================================
echo.

cd /d "%~dp0"

if not exist "docker-compose.yml" (
    echo [ERROR] docker-compose.yml not found!
    pause
    exit /b 1
)

echo [INFO] Stopping existing containers...
docker-compose down --remove-orphans

echo [INFO] Removing unused containers and images...
docker system prune -f

echo.
echo [INFO] Building and starting services...
echo This may take several minutes on first run...
echo.

docker-compose up --build -d

echo.
echo [INFO] Waiting for services to start...
timeout /t 30 /nobreak

echo.
echo [INFO] Service Status:
docker-compose ps

echo.
echo [INFO] Checking service health...

REM Check PostgreSQL
echo Checking PostgreSQL...
docker exec doannganh-postgres pg_isready -U postgres -d doannganh_db 2>nul
if %errorlevel%==0 (
    echo [OK] PostgreSQL: Ready
) else (
    echo [ERROR] PostgreSQL: Not ready
)

REM Check Backend
echo Checking Backend...
timeout /t 10 /nobreak
curl -s http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel%==0 (
    echo [OK] Backend: Ready
) else (
    echo [WARNING] Backend: Still starting... (check logs)
)

echo.
echo ============================================
echo         SERVICE INFORMATION
echo ============================================
echo.
echo PostgreSQL Database:
echo   URL: localhost:5432
echo   Database: doannganh_db
echo   User: postgres / password
echo.
echo pgAdmin:
echo   URL: http://localhost:5050
echo   Login: admin@doannganh.com / admin123
echo.
echo Backend API:
echo   URL: http://localhost:8080/api
echo   Health: http://localhost:8080/actuator/health
echo.
echo Useful commands:
echo   docker-compose logs backend    (view backend logs)
echo   docker-compose logs postgres   (view database logs)
echo   docker-compose ps             (check status)
echo.

pause