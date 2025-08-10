-- ====================================
-- SIMPLE DATABASE SCHEMA
-- ====================================

-- Set timezone and encoding (PostgreSQL specific - disabled for H2)
-- SET timezone = 'Asia/Ho_Chi_Minh';
-- SET client_encoding = 'UTF8';

-- ====================================
-- DROP TABLES IF EXIST
-- ====================================

DROP TABLE IF EXISTS ai_suggestions CASCADE;
DROP TABLE IF EXISTS project_metrics CASCADE;
DROP TABLE IF EXISTS skill_matrix CASCADE;
DROP TABLE IF EXISTS workload_predictions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS task_assignments CASCADE;
DROP TABLE IF EXISTS task_comments CASCADE;
DROP TABLE IF EXISTS task_dependencies CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS project_members CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workload_history CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;

-- ====================================
-- USERS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TEAM_MEMBERS TABLE
-- ====================================
CREATE TABLE team_members (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    workload_capacity INTEGER DEFAULT 40,
    current_workload INTEGER DEFAULT 0,
    workload_percentage DECIMAL(5,2) DEFAULT 0.0,
    efficiency_score DECIMAL(5,2) DEFAULT 75.0,
    availability_status VARCHAR(20) DEFAULT 'AVAILABLE',
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- PROJECTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TASKS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(20) DEFAULT 'TODO',
    assignee_email VARCHAR(100),
    project_id BIGINT,
    estimated_hours INTEGER,
    actual_hours INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- ====================================
-- PROJECT_MEMBERS TABLE
-- ====================================
CREATE TABLE project_members (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    role_in_project VARCHAR(100) DEFAULT 'Developer',
    joined_date DATE DEFAULT CURRENT_DATE,
    left_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- TASK_ASSIGNMENTS TABLE
-- ====================================
CREATE TABLE task_assignments (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    assigned_date TIMESTAMP DEFAULT NOW(),
    assigned_by BIGINT REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'ASSIGNED',
    allocation_percentage INTEGER DEFAULT 100,
    notes TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- SKILL_MATRIX TABLE
-- ====================================
CREATE TABLE skill_matrix (
    id BIGSERIAL PRIMARY KEY,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(20) DEFAULT 'INTERMEDIATE',
    years_experience INTEGER DEFAULT 0,
    last_used DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- NOTIFICATIONS TABLE
-- ====================================
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_email_sent BOOLEAN DEFAULT FALSE,
    priority INTEGER DEFAULT 1,
    action_url TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- AI_SUGGESTIONS TABLE
-- ====================================
CREATE TABLE ai_suggestions (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    suggested_assignee_id BIGINT REFERENCES team_members(id),
    task_id BIGINT REFERENCES tasks(id),
    project_id BIGINT REFERENCES projects(id),
    status VARCHAR(20) DEFAULT 'PENDING',
    reasoning TEXT,
    expected_impact TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ====================================
-- BASIC INDEXES
-- ====================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_manager_id ON projects(manager_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_assignee_email ON tasks(assignee_email);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_task_assignments_task_id ON task_assignments(task_id);
CREATE INDEX idx_task_assignments_team_member_id ON task_assignments(team_member_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Insert default data
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'ADMIN'),
('user1', 'user1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'User One', 'USER'),
('user2', 'user2@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'User Two', 'USER');

INSERT INTO projects (name, description, status) VALUES
('Default Project', 'Default project for tasks', 'ACTIVE'),
('Sample Project', 'Sample project for testing', 'ACTIVE');

INSERT INTO tasks (title, description, priority, status, assignee_email, project_id, due_date) VALUES
('Setup Project', 'Initialize project structure', 'HIGH', 'COMPLETED', 'admin@example.com', 1, CURRENT_DATE + 7),
('Create API', 'Develop REST API endpoints', 'HIGH', 'IN_PROGRESS', 'user1@example.com', 1, CURRENT_DATE + 14),
('Frontend Development', 'Build React frontend', 'MEDIUM', 'TODO', 'user2@example.com', 1, CURRENT_DATE + 21);