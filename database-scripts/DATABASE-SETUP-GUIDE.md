# PostgreSQL Database Setup Documentation

## 📋 Tổng quan
Hệ thống Task Management đã được cấu hình để sử dụng PostgreSQL database với đầy đủ tính năng enterprise:

- **Database**: taskmanagement_db
- **Username**: taskmanager  
- **Password**: taskmanager123
- **Host**: localhost
- **Port**: 5432

## 🚀 Cài đặt và Khởi động

### 1. Cài đặt PostgreSQL Database

```bash
# Chạy script setup database
cd database-scripts
setup-postgresql.bat
```

### 2. Khởi động Backend với PostgreSQL

```bash
# Khởi động backend với PostgreSQL profile
start-with-postgresql.bat
```

### 3. Kiểm tra Database Health

```bash
# Kiểm tra trạng thái database
check-database.bat
```

## 📊 Database Schema

### Core Tables

#### 1. users
- **Chức năng**: Quản lý thông tin người dùng và authentication
- **Đặc điểm**: 
  - Username/email unique constraints
  - BCrypt password encoding
  - Role-based access control (ADMIN, MANAGER, USER)
  - Profile management (avatar, phone, department)
  - Audit trail (created_at, updated_at, last_login)

#### 2. projects  
- **Chức năng**: Quản lý dự án và workflow
- **Đặc điểm**:
  - Project lifecycle management (PLANNING → ACTIVE → COMPLETED)
  - Budget tracking với BigDecimal precision
  - Progress percentage tracking
  - Color-coded organization
  - Owner-based access control

#### 3. tasks
- **Chức năng**: Core task management với advanced features
- **Đặc điểm**:
  - Hierarchical task structure (parent-child relationships)
  - PostgreSQL arrays cho tags
  - Priority và status management
  - Time estimation vs actual tracking
  - Full-text search capabilities

#### 4. project_members
- **Chức năng**: Many-to-many relationship với advanced permissions
- **Đặc điểm**:
  - Role-based project access
  - Granular permissions system
  - Membership audit trail

### Advanced Features Tables

#### 5. notifications
- **Chức năng**: Real-time notification system
- **Đặc điểm**:
  - Type-based notifications (TASK_ASSIGNED, PROJECT_UPDATE, etc.)
  - Read/unread status tracking
  - Action URLs cho deep linking
  - Entity relationship tracking

#### 6. task_dependencies
- **Chức năng**: Project management dependencies
- **Đặc điểm**:
  - Multiple dependency types (FINISH_TO_START, etc.)
  - Prerequisite tracking
  - Dependency validation

#### 7. time_logs
- **Chức năng**: Professional time tracking
- **Đặc điểm**:
  - Start/stop time tracking
  - Automatic duration calculation
  - Billable/non-billable categorization
  - Task-based time allocation

#### 8. user_settings
- **Chức năng**: Personalization và preferences
- **Đặc điểm**:
  - Theme preferences (light/dark)
  - Language và timezone settings
  - Dashboard layout customization (JSONB)
  - Notification preferences

#### 9. activity_logs
- **Chức năng**: Comprehensive audit trail
- **Đặc điểm**:
  - User action tracking
  - Entity change logging
  - IP address và user agent tracking
  - JSONB details storage

## 🔧 Configuration Features

### 1. Connection Pooling (HikariCP)
```yaml
hikari:
  maximum-pool-size: 20
  minimum-idle: 5
  idle-timeout: 300000
  connection-timeout: 20000
  leak-detection-threshold: 60000
```

### 2. Database Migration (Flyway)
- **Versioned migrations**: V1__Create_initial_schema.sql
- **Sample data**: V2__Insert_initial_data.sql
- **Baseline support** cho existing databases

### 3. Advanced Indexing
- **Performance indexes**: assignee, project, status, due_date
- **Full-text search**: PostgreSQL GIN indexes
- **Relationship indexes**: optimized joins

### 4. PostgreSQL-specific Features
- **JSONB columns**: user_settings, activity_logs details
- **Array types**: tags, permissions
- **Advanced data types**: BigDecimal for financial data
- **Text search**: English language full-text search

## 💾 Database Management Scripts

### Backup & Restore
```bash
# Tạo backup
backup-database.bat

# Restore from backup (manual)
psql -U taskmanager -d taskmanagement_db -f backup_file.sql
```

### Monitoring & Health Checks
```bash
# Comprehensive health check
check-database.bat

# Manual connection test
psql -U taskmanager -d taskmanagement_db -h localhost
```

## 🔐 Security Features

### 1. User Authentication
- BCrypt password hashing
- JWT token-based authentication
- Role-based access control

### 2. Database Security
- Dedicated database user với limited permissions
- Connection SSL support ready
- SQL injection protection via JPA

### 3. Audit Trail
- Complete user action logging
- Entity change tracking
- IP address và session tracking

## 📈 Performance Optimizations

### 1. Database Level
- Strategic indexing for common queries
- Connection pooling với optimal settings
- Query optimization via JPA/Hibernate

### 2. Application Level
- Lazy loading for large datasets
- Pagination support
- Efficient relationship mapping

## 🔄 Data Migration Features

### Sample Data Included
- **4 sample users** với different roles
- **4 sample projects** với realistic data
- **12 sample tasks** với dependencies
- **Project memberships** và permissions
- **Time logs** và notifications
- **User settings** và activity logs

### Migration Safety
- Baseline support
- Rollback capabilities
- Version tracking
- Data integrity constraints

## 🌟 Enterprise Features

### 1. Multi-tenancy Ready
- User-based data isolation
- Project-based access control
- Role-based permissions

### 2. Scalability
- Connection pooling
- Efficient indexing
- Lazy loading relationships

### 3. Monitoring
- Health check endpoints
- Database metrics
- Performance monitoring

## 📝 Database Schema Diagram

```
users (1) ──────── (*) project_members (*) ──────── (1) projects
  │                                                      │
  │ (1)                                              (1) │
  │                                                      │
  ▼ (*)                                               (*) ▼
tasks ◄──────────── task_dependencies ──────────────► tasks
  │                                                      
  │ (1)                                              
  │                                                      
  ▼ (*)                                               
time_logs                                           

users (1) ──────── (*) notifications
users (1) ──────── (1) user_settings  
users (*) ──────── (*) activity_logs
tasks (1) ──────── (*) task_comments
tasks (1) ──────── (*) task_attachments
```

## ✅ Verification Checklist

Sau khi setup, verify các tính năng:

- [ ] ✅ Database connection successful
- [ ] ✅ Tables created with proper schema
- [ ] ✅ Sample data inserted
- [ ] ✅ Indexes created for performance
- [ ] ✅ Relationships working correctly
- [ ] ✅ Flyway migration successful
- [ ] ✅ Backend starts with PostgreSQL profile
- [ ] ✅ API endpoints accessible
- [ ] ✅ Authentication working
- [ ] ✅ CRUD operations functional

## 🔧 Troubleshooting

### Common Issues
1. **Connection refused**: Check PostgreSQL service status
2. **Authentication failed**: Verify username/password
3. **Database not found**: Run setup-postgresql.bat
4. **Permission denied**: Check user privileges
5. **Port conflicts**: Verify port 5432 availability

### Logs Location
- **PostgreSQL logs**: Check PostgreSQL installation logs
- **Application logs**: Console output when running backend
- **Flyway logs**: Migration status in application startup

---
**🎓 Capstone Project Ready**: Database đã được setup với đầy đủ tính năng professional cho đồ án cơ sở ngành!
