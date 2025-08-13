# 🚀 HƯỚNG DẪN CÀI ĐẶT POSTGRESQL CHO ĐỒ ÁN

## 📥 Cài đặt PostgreSQL

### Bước 1: Tải PostgreSQL
1. Truy cập: https://www.postgresql.org/download/windows/
2. Tải PostgreSQL 15 hoặc 16 (khuyến nghị 16)
3. Chạy file installer

### Bước 2: Cài đặt
```
📋 Thông tin cài đặt:
- Installation Directory: C:\Program Files\PostgreSQL\16
- Data Directory: C:\Program Files\PostgreSQL\16\data
- Password: password (cho user postgres)
- Port: 5432
- Locale: Default

✅ Tích chọn tất cả components:
- PostgreSQL Server
- pgAdmin 4
- Stack Builder
- Command Line Tools
```

### Bước 3: Thêm vào PATH
1. Mở System Properties → Environment Variables
2. Thêm vào PATH: `C:\Program Files\PostgreSQL\16\bin`
3. Restart Command Prompt/VS Code

### Bước 4: Kiểm tra cài đặt
```cmd
psql --version
```

## 🚀 SAU KHI CÀI ĐẶT XONG

### 1. Tạo Database
```cmd
cd database-scripts
setup-postgresql.bat
```

### 2. Khởi động Backend
```cmd
start-backend-postgresql.bat
```

### 3. Khởi động Frontend
```cmd
cd frontend
npm run dev
```

## 🐋 PHƯƠNG ÁN THAY THẾ: DOCKER

Nếu không muốn cài PostgreSQL directly:

### 1. Cài Docker Desktop
- Tải từ: https://www.docker.com/products/docker-desktop/

### 2. Chạy PostgreSQL trong Docker
```cmd
cd d:\ProjectDoAnNganh2
docker-compose up -d postgres
```

### 3. Khởi động backend
```cmd
start-backend-postgresql.bat
```

## 📊 TÍNH NĂNG CỦA DỰ ÁN VỚI POSTGRESQL

### Load Balancing Algorithms:
- ✅ Round Robin Assignment
- ✅ Skill-Based Matching  
- ✅ Workload Distribution
- ✅ Priority-Based Assignment
- ✅ Least Loaded Strategy

### Advanced Features:
- ✅ JSONB Skills Tracking
- ✅ Workload Analytics
- ✅ Performance Monitoring
- ✅ Flyway Migrations
- ✅ Production-Ready Config

### Database Schema:
- 👥 Users với skills/workload tracking
- 📋 Tasks với complexity scoring
- 📊 Analytics và reporting
- 🔔 Notification system
- 📈 Performance metrics

## 🎯 GIÁ TRỊ CHO ĐỒ ÁN

Với PostgreSQL, dự án của bạn sẽ có:
- **Độ phức tạp kỹ thuật cao**: Algorithms + Database engineering
- **Ứng dụng thực tế**: Enterprise-grade task management
- **Kiến trúc chuyên nghiệp**: Scalable, maintainable code
- **Tính năng nâng cao**: Load balancing, analytics, performance monitoring

## 🔧 SUPPORT

Nếu gặp vấn đề:
1. Kiểm tra PostgreSQL service đang chạy
2. Verify credentials (postgres/password)
3. Kiểm tra port 5432 available
4. Restart VS Code sau khi thêm PATH

---
**Sẵn sàng cho capstone project chất lượng cao!** 🎓
