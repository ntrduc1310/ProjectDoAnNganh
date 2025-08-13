@echo off
chcp 65001 >nul
echo ==========================================
echo � POSTGRESQL SETUP CHO ĐỒ ÁN NGÀNH
echo ==========================================

echo 📋 Kiểm tra yêu cầu:
echo - PostgreSQL 15 hoặc 16 đã cài đặt
echo - PostgreSQL service đang chạy  
echo - psql command có trong PATH
echo.

echo 🔍 Kiểm tra PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL chưa được cài đặt hoặc chưa có trong PATH!
    echo.
    echo 📥 Vui lòng cài đặt PostgreSQL từ:
    echo    https://www.postgresql.org/download/windows/
    echo.
    echo 📝 Hướng dẫn cài đặt:
    echo - Chọn PostgreSQL 15 hoặc 16
    echo - Username: postgres  
    echo - Password: password
    echo - Port: 5432
    echo - Thêm PostgreSQL bin vào PATH
    echo.
    pause
    exit /b 1
)

echo ✅ PostgreSQL đã được tìm thấy!
psql --version

echo.
echo 🏗️ Thiết lập database cho dự án...
echo.
echo 💡 Bạn sẽ được yêu cầu nhập password của postgres user

psql -U postgres -d postgres -f setup-postgresql-database.sql

:: Grant additional permissions
echo Thiết lập quyền truy cập...
psql -U postgres -d taskmanagement_db -c "GRANT ALL ON SCHEMA public TO taskmanager;"
psql -U postgres -d taskmanagement_db -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskmanager;"
psql -U postgres -d taskmanagement_db -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskmanager;"
psql -U postgres -d taskmanagement_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taskmanager;"
psql -U postgres -d taskmanagement_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taskmanager;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ PostgreSQL database setup completed successfully!
    echo.
    echo Database: taskmanagement_db
    echo Username: taskmanager
    echo Password: taskmanager123
    echo Host: localhost
    echo Port: 5432
    echo.
    echo Connection URL: jdbc:postgresql://localhost:5432/taskmanagement_db
    echo.
) else (
    echo.
    echo ❌ Database setup failed!
    echo Please check the error messages above.
    echo.
)

pause
