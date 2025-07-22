@echo off
title DoAn Nganh - Stop Docker
color 0C

echo.
echo ============================================
echo       🛑 STOPPING DOAN NGANH DOCKER
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 🛑 Stopping all services...
docker-compose down

echo 🧹 Cleaning up networks...
docker network prune -f

echo.
echo ✅ All services stopped successfully!
echo.
echo 💡 To start again, run: start-docker.bat
echo.
pause