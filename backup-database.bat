@echo off
title DoAn Nganh - Database Backup
color 0A

echo.
echo ============================================
echo         💾 DATABASE BACKUP
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

REM Create backups directory if not exists
if not exist "backups" mkdir backups

REM Generate timestamp
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do set DATE=%%c-%%a-%%b
for /f "tokens=1-3 delims=: " %%a in ('time /t') do set TIME=%%a-%%b-%%c
set TIMESTAMP=%DATE%_%TIME::=-%

set BACKUP_FILE=backups\doannganh_backup_%TIMESTAMP%.sql

echo 💾 Creating backup: %BACKUP_FILE%
docker exec doannganh-postgres pg_dump -U postgres doannganh_db > %BACKUP_FILE%

if %errorlevel%==0 (
    echo ✅ Backup created successfully!
    echo 📁 Location: %BACKUP_FILE%
) else (
    echo ❌ Backup failed!
)

echo.
pause