@echo off
echo ========================================
echo   Quick Start - Task Management Backend
echo ========================================

echo.
echo This script will start the backend with H2 database first,
echo then provide instructions for PostgreSQL setup.
echo.

echo 🚀 Starting backend with H2 database (development mode)...
echo.
echo Backend will be available at: http://localhost:8081
echo H2 Console: http://localhost:8081/h2-console
echo.

cd /d "%~dp0..\backend\backend"

echo Starting Spring Boot application...
start "" cmd /k "mvnw spring-boot:run"

echo.
echo ✅ Backend started in development mode!
echo.
echo 📋 Next Steps for PostgreSQL Production Setup:
echo.
echo 1. Install PostgreSQL (see POSTGRESQL-INSTALL-GUIDE.md)
echo 2. Run: database-scripts\setup-postgresql.bat  
echo 3. Run: database-scripts\start-with-postgresql.bat
echo.
echo 🎯 For your capstone project, PostgreSQL provides:
echo   ✓ Professional database features
echo   ✓ Advanced data types (JSONB, Arrays)
echo   ✓ Full-text search capabilities
echo   ✓ Connection pooling & performance optimization
echo   ✓ Database migration with Flyway
echo   ✓ Comprehensive audit trail
echo   ✓ Production-ready scalability
echo.

pause
