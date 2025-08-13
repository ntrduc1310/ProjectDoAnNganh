-- =====================================
-- PostgreSQL Database Setup Script
-- Project: Task Management System  
-- Author: Capstone Project Team
-- =====================================

-- Tạo database
CREATE DATABASE taskmanagement_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Tạo user cho application
CREATE USER taskmanager WITH 
    PASSWORD 'taskmanager123'
    CREATEDB
    LOGIN;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE taskmanagement_db TO taskmanager;

-- Kết nối đến database mới
\c taskmanagement_db;

-- Tạo schema và grant permissions
CREATE SCHEMA IF NOT EXISTS public;
GRANT ALL ON SCHEMA public TO taskmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskmanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskmanager;

-- Set default privileges cho các table/sequence tương lai
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taskmanager;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taskmanager;

-- Tạo extension cho advanced features
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Thông báo hoàn thành
SELECT 'Database setup completed successfully!' as status;
