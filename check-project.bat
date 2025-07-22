@echo off
title DoAn Nganh - Project Requirements Check
color 0B

echo.
echo ============================================
echo    🔍 CHECKING PROJECT REQUIREMENTS
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

set /a errors=0

echo 📁 Checking Project Structure...
echo.

REM 1. Check docker-compose.yml
if exist "docker-compose.yml" (
    echo ✅ docker-compose.yml: Found
) else (
    echo ❌ docker-compose.yml: MISSING
    set /a errors+=1
)

REM 2. Check Backend Dockerfile
if exist "backend\backend\Dockerfile" (
    echo ✅ Backend Dockerfile: Found
) else (
    echo ❌ Backend Dockerfile: MISSING at backend\backend\Dockerfile
    set /a errors+=1
)

REM 3. Check Backend pom.xml
if exist "backend\backend\pom.xml" (
    echo ✅ Backend pom.xml: Found
) else (
    echo ❌ Backend pom.xml: MISSING at backend\backend\pom.xml
    set /a errors+=1
)

REM 4. Check application files
if exist "backend\backend\src\main\resources\application.yml" (
    echo ✅ application.yml: Found
) else if exist "backend\backend\src\main\resources\application.properties" (
    echo ✅ application.properties: Found
) else (
    echo ❌ application.yml/properties: MISSING
    set /a errors+=1
)

if exist "backend\backend\src\main\resources\application-dev.yml" (
    echo ✅ application-dev.yml: Found
) else (
    echo ⚠️  application-dev.yml: Missing (recommended)
)

if exist "backend\backend\src\main\resources\application-docker.yml" (
    echo ✅ application-docker.yml: Found
) else (
    echo ❌ application-docker.yml: MISSING (required for Docker)
    set /a errors+=1
)

REM 5. Check schema.sql
if exist "backend\backend\src\main\resources\schema.sql" (
    echo ✅ schema.sql: Found
) else (
    echo ❌ schema.sql: MISSING
    set /a errors+=1
)

REM 6. Check data.sql (optional but recommended)
if exist "backend\backend\src\main\resources\data.sql" (
    echo ✅ data.sql: Found
) else (
    echo ⚠️  data.sql: Missing (recommended for sample data)
)

echo.
echo 🐳 Checking Docker...

REM 7. Check Docker
docker --version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Docker: Installed
    docker --version
) else (
    echo ❌ Docker: NOT INSTALLED or not running
    set /a errors+=1
)

REM 8. Check Docker Compose
docker-compose --version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Docker Compose: Available
) else (
    echo ❌ Docker Compose: NOT AVAILABLE
    set /a errors+=1
)

REM 9. Check if Docker Desktop is running
docker info >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Docker Daemon: Running
) else (
    echo ❌ Docker Daemon: NOT RUNNING - Start Docker Desktop
    set /a errors+=1
)

echo.
echo 🌐 Checking Ports...

REM 10. Check ports
netstat -an | find ":5432" >nul
if %errorlevel%==0 (
    echo ⚠️  Port 5432 (PostgreSQL): Already in use
    echo    Stop existing PostgreSQL or change port in docker-compose.yml
) else (
    echo ✅ Port 5432: Available
)

netstat -an | find ":8080" >nul
if %errorlevel%==0 (
    echo ⚠️  Port 8080 (Backend): Already in use
    echo    Stop existing service or change port
) else (
    echo ✅ Port 8080: Available
)

netstat -an | find ":5050" >nul
if %errorlevel%==0 (
    echo ⚠️  Port 5050 (pgAdmin): Already in use
    echo    Stop existing service or change port
) else (
    echo ✅ Port 5050: Available
)

echo.
echo ============================================
echo              📊 SUMMARY
echo ============================================

if %errors%==0 (
    echo.
    echo ✅ ALL REQUIREMENTS MET!
    echo 🚀 Ready to run: start-docker.bat
    echo.
) else (
    echo.
    echo ❌ FOUND %errors% ISSUES!
    echo 🔧 Please fix the missing files/requirements above
    echo.
)

echo 📝 Current Project Structure:
echo.
dir /b
echo.

pause