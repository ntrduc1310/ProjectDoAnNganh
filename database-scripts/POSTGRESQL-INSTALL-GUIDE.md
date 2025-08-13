# 🐘 PostgreSQL Installation Guide for Windows

## 📥 Download và Cài đặt PostgreSQL

### Bước 1: Download PostgreSQL
1. Truy cập: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Chọn version mới nhất (PostgreSQL 15 hoặc 16)
4. Download file `.exe` installer

### Bước 2: Cài đặt PostgreSQL
1. **Chạy installer** với quyền Administrator
2. **Installation Directory**: Để mặc định `C:\Program Files\PostgreSQL\15`
3. **Components**: Chọn tất cả:
   - PostgreSQL Server
   - pgAdmin 4
   - Stack Builder
   - Command Line Tools
4. **Data Directory**: Để mặc định `C:\Program Files\PostgreSQL\15\data`
5. **Password**: Nhập password cho superuser `postgres` (ví dụ: `postgres123`)
6. **Port**: Để mặc định `5432`
7. **Locale**: Default locale
8. **Finish Installation**

### Bước 3: Verify Installation
Mở Command Prompt và chạy:
```cmd
psql --version
```

Nếu hiện lỗi "command not found", thêm PostgreSQL vào PATH:

#### Thêm PostgreSQL vào PATH:
1. **Windows + R** → gõ `sysdm.cpl` → Enter
2. **Advanced** tab → **Environment Variables**
3. **System Variables** → tìm **Path** → **Edit**
4. **New** → thêm: `C:\Program Files\PostgreSQL\15\bin`
5. **OK** → **OK** → **OK**
6. **Restart Command Prompt**

## 🚀 Alternative: Docker PostgreSQL (Nhanh hơn)

Nếu bạn có Docker, có thể sử dụng PostgreSQL container:

### Docker Setup:
```cmd
# Pull PostgreSQL image
docker pull postgres:15

# Run PostgreSQL container
docker run --name taskmanagement-postgres ^
  -e POSTGRES_DB=taskmanagement_db ^
  -e POSTGRES_USER=taskmanager ^
  -e POSTGRES_PASSWORD=taskmanager123 ^
  -p 5432:5432 ^
  -d postgres:15

# Verify container
docker ps
```

### Connect to Docker PostgreSQL:
```cmd
docker exec -it taskmanagement-postgres psql -U taskmanager -d taskmanagement_db
```

## 🔧 Manual Database Setup (sau khi cài PostgreSQL)

### Connect to PostgreSQL:
```cmd
psql -U postgres -h localhost
```

### Create Database và User:
```sql
-- Create database
CREATE DATABASE taskmanagement_db;

-- Create user
CREATE USER taskmanager WITH ENCRYPTED PASSWORD 'taskmanager123';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE taskmanagement_db TO taskmanager;
ALTER USER taskmanager CREATEDB;

-- Connect to new database
\c taskmanagement_db

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO taskmanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskmanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskmanager;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taskmanager;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taskmanager;

-- Exit
\q
```

## ✅ Test Connection

### Test với psql:
```cmd
psql -U taskmanager -d taskmanagement_db -h localhost -p 5432
```

### Test với application:
```cmd
cd d:\ProjectDoAnNganh2\database-scripts
check-database.bat
```

## 🎯 Next Steps

Sau khi PostgreSQL đã ready:

1. **Run database setup**: `setup-postgresql.bat`
2. **Start backend**: `start-with-postgresql.bat`
3. **Verify health**: `check-database.bat`

## 📝 Connection Details

**Production Setup:**
- **Host**: localhost
- **Port**: 5432
- **Database**: taskmanagement_db
- **Username**: taskmanager
- **Password**: taskmanager123
- **JDBC URL**: `jdbc:postgresql://localhost:5432/taskmanagement_db`

## 🛠️ Troubleshooting

### Issue: "psql: command not found"
**Solution**: Add PostgreSQL bin directory to PATH

### Issue: "Connection refused"
**Solution**: 
- Check PostgreSQL service: `services.msc` → PostgreSQL
- Or start service: `net start postgresql-x64-15`

### Issue: "Authentication failed"
**Solution**: Verify username/password are correct

### Issue: "Database does not exist"
**Solution**: Run the manual database setup commands above

---
**🎓 Ready for Capstone**: PostgreSQL setup completed cho đồ án chuyên nghiệp!
