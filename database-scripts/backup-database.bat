@echo off
echo ========================================
echo     PostgreSQL Database Backup
echo ========================================

:: Set variables
set BACKUP_DIR=%~dp0backups
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_FILE=%BACKUP_DIR%\taskmanagement_backup_%TIMESTAMP%.sql

:: Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Creating backup: %BACKUP_FILE%
echo.

:: Create backup
pg_dump -U taskmanager -h localhost -p 5432 -d taskmanagement_db -f "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Backup created successfully: %BACKUP_FILE%
    echo.
    
    :: Get file size
    for %%I in ("%BACKUP_FILE%") do set SIZE=%%~zI
    echo Backup size: %SIZE% bytes
    echo.
    
    :: Clean old backups (keep last 7 days)
    echo Cleaning old backups...
    forfiles /p "%BACKUP_DIR%" /s /m *.sql /d -7 /c "cmd /c del @path" 2>nul
    
) else (
    echo.
    echo ❌ Backup failed!
    echo Please check your PostgreSQL connection settings.
    echo.
)

pause
