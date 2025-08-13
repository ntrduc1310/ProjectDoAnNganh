@echo off
chcp 65001 >nul
echo ==========================================
echo 🚀 KHỞI ĐỘNG BACKEND - ĐỒ ÁN NGÀNH
echo ==========================================
echo.

echo 🔍 Kiểm tra PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL chưa được cài đặt!
    echo 📥 Vui lòng chạy setup-postgresql.bat trước
    pause
    exit /b 1
)

echo ✅ PostgreSQL OK
echo.

echo 🗄️ Kiểm tra database...
psql -U postgres -d doannganh_db -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Database chưa được tạo!
    echo 📥 Vui lòng chạy setup-postgresql.bat trước
    pause
    exit /b 1
)

echo ✅ Database OK
echo.

echo 🚀 Khởi động Spring Boot backend...
echo 📋 Cấu hình:
echo    - Profile: postgresql
echo    - Database: doannganh_db
echo    - Port: 8081
echo    - Flyway migrations: enabled
echo.

cd /d "%~dp0"
cd backend\backend

echo 🔧 Compiling và khởi động...
mvn clean spring-boot:run

pause
