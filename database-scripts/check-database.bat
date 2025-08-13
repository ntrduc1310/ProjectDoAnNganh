@echo off
echo ========================================
echo    PostgreSQL Database Health Check
echo ========================================

echo Checking PostgreSQL service status...
sc query postgresql-x64-15 | find "RUNNING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ PostgreSQL service is running
) else (
    echo ❌ PostgreSQL service is not running
    echo   Run: net start postgresql-x64-15
)

echo.
echo Checking database connection...
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "SELECT 1;" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection successful
) else (
    echo ❌ Cannot connect to database
    echo   Check username/password and database existence
)

echo.
echo Database information:
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "
SELECT 
    current_database() as database_name,
    current_user as current_user,
    version() as postgresql_version;
"

echo.
echo Table information:
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
"

echo.
echo Database size:
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "
SELECT 
    pg_database.datname as database_name,
    pg_size_pretty(pg_database_size(pg_database.datname)) as size
FROM pg_database 
WHERE datname = 'taskmanagement_db';
"

echo.
echo Connection summary:
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432 -c "
SELECT 
    datname as database,
    usename as username,
    client_addr,
    state,
    query_start
FROM pg_stat_activity 
WHERE datname = 'taskmanagement_db'
ORDER BY query_start DESC;
"

pause
