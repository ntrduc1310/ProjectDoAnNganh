@echo off
title DoAn Nganh - Docker Logs
color 0B

echo.
echo ============================================
echo         📝 DOCKER LOGS VIEWER
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo Choose which logs to view:
echo.
echo 1. All services
echo 2. Backend only
echo 3. PostgreSQL only
echo 4. pgAdmin only
echo 5. Follow live logs (all)
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo 📝 Showing logs for all services...
    docker-compose logs --tail=100
) else if "%choice%"=="2" (
    echo.
    echo 📝 Showing backend logs...
    docker-compose logs --tail=100 backend
) else if "%choice%"=="3" (
    echo.
    echo 📝 Showing PostgreSQL logs...
    docker-compose logs --tail=100 postgres
) else if "%choice%"=="4" (
    echo.
    echo 📝 Showing pgAdmin logs...
    docker-compose logs --tail=100 pgadmin
) else if "%choice%"=="5" (
    echo.
    echo 📝 Following live logs (Ctrl+C to exit)...
    docker-compose logs -f
) else (
    echo Invalid choice!
)

echo.
pause