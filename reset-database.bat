@echo off
title DoAn Nganh - Reset Database
color 0E

echo.
echo ============================================
echo       🗃️ RESET DATABASE
echo ============================================
echo.
echo ⚠️  WARNING: This will DELETE ALL data!
echo.
set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    pause
    exit /b 0
)

REM Change to project directory
cd /d "%~dp0"

echo.
echo 🛑 Stopping services...
docker-compose down

echo 🗑️ Removing database volume...
docker volume rm projectdoannganh2_postgres_data 2>nul
docker volume rm projectdoannganh2_pgadmin_data 2>nul

echo 🔄 Recreating services with fresh database...
docker-compose up --build -d

echo.
echo ⏳ Waiting for database initialization...
timeout /t 30 /nobreak

echo.
echo ✅ Database reset complete!
echo 📊 Fresh database created with schema.sql and data.sql
echo.
echo 🌐 Access pgAdmin: http://localhost:5050
echo 📊 Database: localhost:5432
echo.
pause