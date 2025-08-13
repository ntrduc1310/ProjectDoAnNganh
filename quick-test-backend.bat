@echo off
echo ========================================
echo       QUICK BACKEND TEST
echo ========================================

echo.
echo 🔧 Testing compilation...
cd /d "%~dp0backend\backend"

call mvn compile -q
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Compilation failed
    pause
    exit /b 1
)

echo ✅ Compilation successful!
echo.

echo 📦 Testing package build...
call mvn package -DskipTests -q
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Package build failed
    pause
    exit /b 1
)

echo ✅ Package build successful!
echo.

echo 🚀 Starting backend...
echo.
echo Backend will be available at:
echo   - Main API: http://localhost:8081
echo   - Health: http://localhost:8081/api/dashboard/health
echo   - Stats: http://localhost:8081/api/dashboard/stats
echo   - H2 Console: http://localhost:8081/h2-console
echo.

start "" cmd /k "mvn spring-boot:run"

echo.
echo ✅ Backend started successfully!
echo Check the new window for application logs.
echo.

pause
