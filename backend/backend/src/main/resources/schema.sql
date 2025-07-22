-- ====================================
-- COMPLETE DATABASE SCHEMA
-- Decision Support System for Task Assignment & Workload Balancing
-- ====================================

-- Set timezone and encoding
SET timezone = 'Asia/Ho_Chi_Minh';
SET client_encoding = 'UTF8';

-- ====================================
-- DROP TABLES IF EXIST (Clean Slate)
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

-- ====================================
-- DROP CUSTOM TYPES IF EXIST
-- ====================================
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS availability_status CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS suggestion_type CASCADE;
DROP TYPE IF EXISTS suggestion_status CASCADE;
DROP TYPE IF EXISTS proficiency_level CASCADE;

-- ====================================
-- CREATE CUSTOM ENUMS
-- ====================================
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'TEAM_LEAD', 'USER');
CREATE TYPE project_status AS ENUM ('PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'CANCELLED');
CREATE TYPE task_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE availability_status AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE', 'ON_LEAVE');
CREATE TYPE notification_type AS ENUM ('TASK_ASSIGNED', 'TASK_COMPLETED', 'DEADLINE_REMINDER', 'PROJECT_UPDATE', 'WORKLOAD_ALERT', 'SYSTEM_NOTIFICATION');
CREATE TYPE suggestion_type AS ENUM ('TASK_ASSIGNMENT', 'WORKLOAD_BALANCE', 'DEADLINE_RISK', 'RESOURCE_OPTIMIZATION', 'SKILL_DEVELOPMENT');
CREATE TYPE suggestion_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'IMPLEMENTED', 'EXPIRED');
CREATE TYPE proficiency_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- ====================================
-- USERS TABLE (Authentication & Profile)
-- ====================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'USER',
    department VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT full_name_not_empty CHECK (LENGTH(TRIM(full_name)) > 0)
);

-- ====================================
-- USER_SESSIONS TABLE (JWT Token Management)
-- ====================================
CREATE TABLE user_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    access_token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255),
    device_info TEXT,
    ip_address INET,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Indexes
    CONSTRAINT unique_active_session UNIQUE (user_id, access_token_hash)
);

-- ====================================
-- TEAM_MEMBERS TABLE (Extended User Info)
-- ====================================
CREATE TABLE team_members (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    skills TEXT[], -- Array of skills
    workload_capacity INTEGER DEFAULT 100 CHECK (workload_capacity >= 0 AND workload_capacity <= 150),
    current_workload INTEGER DEFAULT 0 CHECK (current_workload >= 0),
    efficiency_score DECIMAL(5,2) DEFAULT 0.00 CHECK (efficiency_score >= 0 AND efficiency_score <= 100),
    availability_status availability_status DEFAULT 'AVAILABLE',
    hourly_rate DECIMAL(10,2),
    join_date DATE DEFAULT CURRENT_DATE,
    bio TEXT,
    years_experience INTEGER DEFAULT 0 CHECK (years_experience >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT workload_consistency CHECK (current_workload <= workload_capacity)
);

-- ====================================
-- PROJECTS TABLE
-- ====================================
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status project_status NOT NULL DEFAULT 'PLANNING',
    priority task_priority NOT NULL DEFAULT 'MEDIUM',
    budget DECIMAL(15,2),
    budget_used DECIMAL(15,2) DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    manager_id BIGINT REFERENCES users(id),
    client_name VARCHAR(255),
    repository_url TEXT,
    documentation_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_date_range CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
    CONSTRAINT valid_actual_dates CHECK (actual_end_date IS NULL OR actual_start_date IS NULL OR actual_end_date >= actual_start_date),
    CONSTRAINT budget_consistency CHECK (budget_used <= budget OR budget IS NULL),
    CONSTRAINT project_name_not_empty CHECK (LENGTH(TRIM(name)) > 0)
);

-- ====================================
-- PROJECT_MEMBERS TABLE (Many-to-Many)
-- ====================================
CREATE TABLE project_members (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    role_in_project VARCHAR(100) DEFAULT 'Developer',
    joined_date DATE DEFAULT CURRENT_DATE,
    left_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_project_member UNIQUE (project_id, team_member_id),
    CONSTRAINT valid_project_dates CHECK (left_date IS NULL OR left_date >= joined_date)
);

-- ====================================
-- TASKS TABLE
-- ====================================
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'TODO',
    priority task_priority NOT NULL DEFAULT 'MEDIUM',
    estimated_hours INTEGER CHECK (estimated_hours > 0),
    actual_hours INTEGER DEFAULT 0 CHECK (actual_hours >= 0),
    remaining_hours INTEGER,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    due_date TIMESTAMP,
    start_date TIMESTAMP,
    completed_date TIMESTAMP,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    created_by BIGINT REFERENCES users(id),
    tags TEXT[], -- Array of tags
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    story_points INTEGER CHECK (story_points > 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT task_title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
    CONSTRAINT valid_completion_status CHECK (
        (status = 'COMPLETED' AND completion_percentage = 100) OR 
        (status != 'COMPLETED' AND completion_percentage < 100)
    )
);

-- ====================================
-- TASK_DEPENDENCIES TABLE
-- ====================================
CREATE TABLE task_dependencies (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    depends_on_task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    dependency_type VARCHAR(50) DEFAULT 'FINISH_TO_START', -- FINISH_TO_START, START_TO_START, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT no_self_dependency CHECK (task_id != depends_on_task_id),
    CONSTRAINT unique_dependency UNIQUE (task_id, depends_on_task_id)
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
    allocation_percentage INTEGER DEFAULT 100 CHECK (allocation_percentage > 0 AND allocation_percentage <= 100),
    notes TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_task_assignment UNIQUE (task_id, team_member_id)
);

-- ====================================
-- TASK_COMMENTS TABLE
-- ====================================
CREATE TABLE task_comments (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE, -- Internal team comments vs client-visible
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT comment_not_empty CHECK (LENGTH(TRIM(comment)) > 0)
);

-- ====================================
-- SKILL_MATRIX TABLE
-- ====================================
CREATE TABLE skill_matrix (
    id BIGSERIAL PRIMARY KEY,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level proficiency_level NOT NULL DEFAULT 'INTERMEDIATE',
    years_experience INTEGER DEFAULT 0 CHECK (years_experience >= 0),
    last_used DATE,
    is_certified BOOLEAN DEFAULT FALSE,
    certification_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_member_skill UNIQUE (team_member_id, skill_name),
    CONSTRAINT skill_name_not_empty CHECK (LENGTH(TRIM(skill_name)) > 0)
);

-- ====================================
-- WORKLOAD_PREDICTIONS TABLE (AI Generated)
-- ====================================
CREATE TABLE workload_predictions (
    id BIGSERIAL PRIMARY KEY,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    predicted_workload DECIMAL(5,2) NOT NULL CHECK (predicted_workload >= 0),
    confidence_score DECIMAL(5,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
    prediction_date DATE NOT NULL,
    prediction_period INTEGER DEFAULT 30, -- Days ahead
    factors TEXT[], -- Array of factors considered
    algorithm_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint for date-based predictions
    CONSTRAINT unique_prediction UNIQUE (team_member_id, prediction_date, prediction_period)
);

-- ====================================
-- AI_SUGGESTIONS TABLE
-- ====================================
CREATE TABLE ai_suggestions (
    id BIGSERIAL PRIMARY KEY,
    type suggestion_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
    suggested_assignee_id BIGINT REFERENCES team_members(id),
    task_id BIGINT REFERENCES tasks(id),
    project_id BIGINT REFERENCES projects(id),
    status suggestion_status DEFAULT 'PENDING',
    reasoning TEXT,
    expected_impact TEXT,
    implementation_notes TEXT,
    reviewed_by BIGINT REFERENCES users(id),
    reviewed_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
    CONSTRAINT description_not_empty CHECK (LENGTH(TRIM(description)) > 0)
);

-- ====================================
-- NOTIFICATIONS TABLE
-- ====================================
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_email_sent BOOLEAN DEFAULT FALSE,
    priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
    action_url TEXT,
    metadata JSONB, -- Additional data in JSON format
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    read_at TIMESTAMP,
    
    -- Constraints
    CONSTRAINT title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
    CONSTRAINT message_not_empty CHECK (LENGTH(TRIM(message)) > 0)
);

-- ====================================
-- PROJECT_METRICS TABLE (Analytics)
-- ====================================
CREATE TABLE project_metrics (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_unit VARCHAR(50),
    measurement_date DATE NOT NULL,
    calculation_method TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_project_metric UNIQUE (project_id, metric_name, measurement_date),
    CONSTRAINT metric_name_not_empty CHECK (LENGTH(TRIM(metric_name)) > 0)
);

-- ====================================
-- WORKLOAD_HISTORY TABLE (Time Series Data)
-- ====================================
CREATE TABLE workload_history (
    id BIGSERIAL PRIMARY KEY,
    team_member_id BIGINT REFERENCES team_members(id) ON DELETE CASCADE,
    workload_value INTEGER NOT NULL CHECK (workload_value >= 0),
    efficiency_score DECIMAL(5,2),
    active_tasks_count INTEGER DEFAULT 0,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_daily_workload UNIQUE (team_member_id, recorded_date)
);

-- ====================================
-- SYSTEM_SETTINGS TABLE (Configuration)
-- ====================================
CREATE TABLE system_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type VARCHAR(50) DEFAULT 'STRING', -- STRING, INTEGER, BOOLEAN, JSON
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Can be accessed by frontend
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT setting_key_not_empty CHECK (LENGTH(TRIM(setting_key)) > 0)
);

-- ====================================
-- AUDIT_LOG TABLE (System Auditing)
-- ====================================
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id BIGINT NOT NULL,
    action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by BIGINT REFERENCES users(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Indexes for performance
    CONSTRAINT action_check CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_department ON users(department);

-- Team members indexes
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_availability ON team_members(availability_status);
CREATE INDEX idx_team_members_workload ON team_members(current_workload);
CREATE INDEX idx_team_members_efficiency ON team_members(efficiency_score);

-- Projects indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_priority ON projects(priority);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);

-- Tasks indexes
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);

-- Task assignments indexes
CREATE INDEX idx_task_assignments_task_id ON task_assignments(task_id);
CREATE INDEX idx_task_assignments_member_id ON task_assignments(team_member_id);
CREATE INDEX idx_task_assignments_assigned_by ON task_assignments(assigned_by);
CREATE INDEX idx_task_assignments_date ON task_assignments(assigned_date);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- AI suggestions indexes
CREATE INDEX idx_ai_suggestions_type ON ai_suggestions(type);
CREATE INDEX idx_ai_suggestions_status ON ai_suggestions(status);
CREATE INDEX idx_ai_suggestions_task ON ai_suggestions(task_id);
CREATE INDEX idx_ai_suggestions_assignee ON ai_suggestions(suggested_assignee_id);

-- Skill matrix indexes
CREATE INDEX idx_skill_matrix_member ON skill_matrix(team_member_id);
CREATE INDEX idx_skill_matrix_skill ON skill_matrix(skill_name);
CREATE INDEX idx_skill_matrix_level ON skill_matrix(proficiency_level);

-- Workload predictions indexes
CREATE INDEX idx_workload_predictions_member ON workload_predictions(team_member_id);
CREATE INDEX idx_workload_predictions_date ON workload_predictions(prediction_date);

-- Project metrics indexes
CREATE INDEX idx_project_metrics_project ON project_metrics(project_id);
CREATE INDEX idx_project_metrics_name ON project_metrics(metric_name);
CREATE INDEX idx_project_metrics_date ON project_metrics(measurement_date);

-- Audit log indexes
CREATE INDEX idx_audit_log_table ON audit_log(table_name);
CREATE INDEX idx_audit_log_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user ON audit_log(changed_by);
CREATE INDEX idx_audit_log_date ON audit_log(created_at);

-- ====================================
-- VIEWS FOR COMMON QUERIES
-- ====================================

-- Dashboard stats view
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM projects WHERE status = 'IN_PROGRESS') AS active_projects,
    (SELECT COUNT(*) FROM tasks WHERE status = 'IN_PROGRESS') AS tasks_in_progress,
    (SELECT COUNT(*) FROM tasks WHERE status = 'TODO' AND due_date < NOW()) AS overdue_tasks,
    (SELECT COUNT(*) FROM tasks WHERE status = 'COMPLETED' AND updated_at >= NOW() - INTERVAL '7 days') AS completed_this_week,
    (SELECT COALESCE(AVG(efficiency_score), 0) FROM team_members WHERE availability_status = 'AVAILABLE') AS team_efficiency,
    (SELECT COUNT(*) FROM ai_suggestions WHERE status = 'PENDING') AS ai_suggestions_count,
    (SELECT COALESCE(AVG(current_workload * 100.0 / workload_capacity), 0) FROM team_members WHERE workload_capacity > 0) AS workload_balance,
    (SELECT COUNT(*) FROM team_members WHERE availability_status = 'AVAILABLE') AS available_members;

-- Team workload overview
CREATE OR REPLACE VIEW team_workload_overview AS
SELECT 
    tm.id,
    u.full_name,
    u.email,
    tm.current_workload,
    tm.workload_capacity,
    ROUND((tm.current_workload * 100.0 / NULLIF(tm.workload_capacity, 0)), 2) AS workload_percentage,
    tm.efficiency_score,
    tm.availability_status,
    COUNT(ta.id) AS active_tasks,
    u.department
FROM team_members tm
JOIN users u ON tm.user_id = u.id
LEFT JOIN task_assignments ta ON tm.id = ta.team_member_id 
    AND ta.status = 'ASSIGNED'
    AND EXISTS (SELECT 1 FROM tasks t WHERE t.id = ta.task_id AND t.status IN ('TODO', 'IN_PROGRESS'))
GROUP BY tm.id, u.full_name, u.email, tm.current_workload, tm.workload_capacity, tm.efficiency_score, tm.availability_status, u.department;

-- Project progress overview
CREATE OR REPLACE VIEW project_progress_overview AS
SELECT 
    p.id,
    p.name,
    p.status,
    p.priority,
    p.start_date,
    p.end_date,
    p.completion_percentage,
    u.full_name AS manager_name,
    COUNT(t.id) AS total_tasks,
    COUNT(CASE WHEN t.status = 'COMPLETED' THEN 1 END) AS completed_tasks,
    COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END) AS in_progress_tasks,
    COUNT(CASE WHEN t.status = 'TODO' AND t.due_date < NOW() THEN 1 END) AS overdue_tasks
FROM projects p
LEFT JOIN users u ON p.manager_id = u.id
LEFT JOIN tasks t ON p.id = t.project_id
GROUP BY p.id, p.name, p.status, p.priority, p.start_date, p.end_date, p.completion_percentage, u.full_name;

-- Task assignment details
CREATE OR REPLACE VIEW task_assignment_details AS
SELECT 
    t.id AS task_id,
    t.title,
    t.status AS task_status,
    t.priority,
    t.due_date,
    t.estimated_hours,
    t.actual_hours,
    p.name AS project_name,
    u.full_name AS assigned_to,
    u.email AS assignee_email,
    tm.efficiency_score,
    ta.assigned_date,
    manager.full_name AS assigned_by_name
FROM tasks t
JOIN projects p ON t.project_id = p.id
LEFT JOIN task_assignments ta ON t.id = ta.task_id
LEFT JOIN team_members tm ON ta.team_member_id = tm.id
LEFT JOIN users u ON tm.user_id = u.id
LEFT JOIN users manager ON ta.assigned_by = manager.id;

-- ====================================
-- TRIGGERS FOR AUTO-UPDATES
-- ====================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_task_assignments_updated_at BEFORE UPDATE ON task_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_suggestions_updated_at BEFORE UPDATE ON ai_suggestions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update workload when tasks are assigned/unassigned
CREATE OR REPLACE FUNCTION update_team_member_workload()
RETURNS TRIGGER AS $$
DECLARE
    task_hours INTEGER;
    member_id BIGINT;
BEGIN
    -- Get task hours and member ID based on operation
    IF TG_OP = 'INSERT' THEN
        SELECT estimated_hours INTO task_hours FROM tasks WHERE id = NEW.task_id;
        member_id = NEW.team_member_id;
        
        -- Increase workload
        UPDATE team_members 
        SET current_workload = current_workload + COALESCE(task_hours, 0)
        WHERE id = member_id;
        
    ELSIF TG_OP = 'DELETE' THEN
        SELECT estimated_hours INTO task_hours FROM tasks WHERE id = OLD.task_id;
        member_id = OLD.team_member_id;
        
        -- Decrease workload
        UPDATE team_members 
        SET current_workload = GREATEST(0, current_workload - COALESCE(task_hours, 0))
        WHERE id = member_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE 'plpgsql';

-- Apply workload trigger
CREATE TRIGGER update_workload_on_assignment 
    AFTER INSERT OR DELETE ON task_assignments 
    FOR EACH ROW EXECUTE FUNCTION update_team_member_workload();

-- ====================================
-- DEFAULT SYSTEM SETTINGS
-- ====================================
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('MAX_WORKLOAD_CAPACITY', '120', 'INTEGER', 'Maximum workload capacity percentage', TRUE),
('DEFAULT_TASK_PRIORITY', 'MEDIUM', 'STRING', 'Default priority for new tasks', TRUE),
('AI_CONFIDENCE_THRESHOLD', '70.0', 'DECIMAL', 'Minimum confidence score for AI suggestions', FALSE),
('EMAIL_NOTIFICATIONS_ENABLED', 'true', 'BOOLEAN', 'Enable email notifications', FALSE),
('WORKLOAD_ALERT_THRESHOLD', '90', 'INTEGER', 'Workload percentage to trigger alerts', TRUE),
('DASHBOARD_REFRESH_INTERVAL', '30', 'INTEGER', 'Dashboard auto-refresh interval in seconds', TRUE);

-- ====================================
-- COMMENTS FOR DOCUMENTATION
-- ====================================
COMMENT ON TABLE users IS 'User authentication and profile information';
COMMENT ON TABLE team_members IS 'Extended information for team members including skills and workload';
COMMENT ON TABLE projects IS 'Project management information';
COMMENT ON TABLE tasks IS 'Individual tasks within projects';
COMMENT ON TABLE task_assignments IS 'Assignment of tasks to team members';
COMMENT ON TABLE ai_suggestions IS 'AI-generated suggestions for task assignment and workload optimization';
COMMENT ON TABLE notifications IS 'System notifications for users';
COMMENT ON TABLE skill_matrix IS 'Skills and proficiency levels for team members';
COMMENT ON TABLE workload_predictions IS 'AI predictions for future workload';
COMMENT ON TABLE project_metrics IS 'Analytics and metrics for projects';
COMMENT ON TABLE audit_log IS 'Audit trail for system changes';

-- ====================================
-- SUCCESS MESSAGE
-- ====================================
DO $$
BEGIN
    RAISE NOTICE '✅ Database schema created successfully!';
    RAISE NOTICE '📊 Tables created: %', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE');
    RAISE NOTICE '👁️ Views created: %', (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'public');
    RAISE NOTICE '🎯 Ready for Decision Support System!';
END $$;