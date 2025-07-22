@echo off
title DoAn Nganh - Docker Status
color 0F

echo.
echo ============================================
echo         📊 DOCKER STATUS CHECK
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 🔍 Container Status:
docker-compose ps

echo.
echo 🌐 Service Health Checks:
echo.

REM Check PostgreSQL
echo Checking PostgreSQL...
docker exec doannganh-postgres pg_isready -U postgres 2>nul
if %errorlevel%==0 (
    echo ✅ PostgreSQL: Running
) else (
    echo ❌ PostgreSQL: Not available
)

REM Check Backend
echo Checking Backend API...
curl -s http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Backend API: Running
) else (
    echo ❌ Backend API: Not available
)

REM Check pgAdmin
echo Checking pgAdmin...
curl -s http://localhost:5050 >nul 2>&1
if %errorlevel%==0 (
    echo ✅ pgAdmin: Running
) else (
    echo ❌ pgAdmin: Not available
)

echo.
echo 📈 Resource Usage:
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

echo.
pause