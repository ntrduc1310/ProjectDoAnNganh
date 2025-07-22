@echo off
title DoAn Nganh - Database Restore
color 0E

echo.
echo ============================================
echo         🔄 DATABASE RESTORE
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

if not exist "backups" (
    echo ❌ No backups directory found!
    pause
    exit /b 1
)

echo Available backup files:
dir /b backups\*.sql

echo.
set /p backup_file="Enter backup filename: "

if not exist "backups\%backup_file%" (
    echo ❌ Backup file not found!
    pause
    exit /b 1
)

echo.
echo ⚠️  This will replace all current data!
set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo 🔄 Restoring from backup...
type backups\%backup_file% | docker exec -i doannganh-postgres psql -U postgres -d doannganh_db

if %errorlevel%==0 (
    echo ✅ Database restored successfully!
) else (
    echo ❌ Restore failed!
)

echo.
pause