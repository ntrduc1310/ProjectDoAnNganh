@echo off
echo ========================================
echo      FIXING PROJECT CLASSPATH ERRORS
echo ========================================

echo.
echo 🔧 Step 1: Navigate to backend directory
cd /d "%~dp0backend\backend"

echo.
echo 🧹 Step 2: Clean Maven project
call mvn clean
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven clean failed
    pause
    exit /b 1
)

echo.
echo 📦 Step 3: Download dependencies
call mvn dependency:resolve
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Dependency resolution failed
    pause
    exit /b 1
)

echo.
echo 🔨 Step 4: Compile project
call mvn compile
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Compilation failed - check for errors above
    pause
    exit /b 1
)

echo.
echo ✅ Project fixed successfully!
echo.
echo 🚀 You can now start the backend:
echo    mvn spring-boot:run
echo.
echo 🔍 Or test compilation:
echo    mvn package -DskipTests
echo.

pause
