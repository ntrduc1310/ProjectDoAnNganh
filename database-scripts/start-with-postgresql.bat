@echo off
echo ========================================
echo   Start Task Management with PostgreSQL
echo ========================================

:: Check if PostgreSQL service is running
echo Checking PostgreSQL service...
sc query postgresql-x64-15 | find "RUNNING" >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting PostgreSQL service...
    net start postgresql-x64-15
    if %ERRORLEVEL% NEQ 0 (
        echo Warning: Could not start PostgreSQL service automatically
        echo Please start PostgreSQL manually
        pause
    )
) else (
    echo ✅ PostgreSQL service is already running
)

:: Test database connection
echo.
echo Testing database connection...
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "SELECT version();" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection successful
) else (
    echo ❌ Database connection failed
    echo Please check:
    echo   1. PostgreSQL is running
    echo   2. Database 'taskmanagement_db' exists
    echo   3. User 'taskmanager' has proper permissions
    pause
    exit /b 1
)

:: Navigate to backend directory
echo.
echo Starting backend with PostgreSQL profile...
cd /d "%~dp0..\backend\backend"

:: Start backend with PostgreSQL profile
echo.
echo Starting Spring Boot application...
echo Using profile: postgresql
echo Database: taskmanagement_db
echo.

mvnw spring-boot:run -Dspring-boot.run.profiles=postgresql

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Backend startup failed!
    echo Please check the console output for errors.
    pause
)

echo.
echo Backend stopped.
pause
