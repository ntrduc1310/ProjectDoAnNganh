-- Create extended tables for advanced features
-- Version: V3__Create_extended_tables.sql

-- Create task_history table for audit trail
CREATE TABLE IF NOT EXISTS task_history (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT NOT NULL REFERENCES tasks(id),
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    old_assignee_id BIGINT REFERENCES users(id),
    new_assignee_id BIGINT REFERENCES users(id),
    hours_logged INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create workload_analytics table for performance tracking
CREATE TABLE IF NOT EXISTS workload_analytics (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    date DATE NOT NULL,
    planned_hours INTEGER DEFAULT 0,
    actual_hours INTEGER DEFAULT 0,
    efficiency_score DECIMAL(5,2) DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Add additional columns to users table for V4 requirements
ALTER TABLE users ADD COLUMN IF NOT EXISTS skills JSONB;
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_workload INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS max_workload INTEGER DEFAULT 40;
ALTER TABLE users ADD COLUMN IF NOT EXISTS hourly_rate DECIMAL(10,2);
ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS position VARCHAR(100);

-- Add additional columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS actual_cost DECIMAL(15,2) DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_name VARCHAR(200);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS estimated_hours INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS manager_id BIGINT REFERENCES users(id);

-- Add additional columns to tasks table for load balancing
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS complexity_score INTEGER DEFAULT 1;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS skill_requirements JSONB;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS assignment_algorithm VARCHAR(50);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS assignee_id BIGINT REFERENCES users(id);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS creator_id BIGINT REFERENCES users(id);

-- Update existing references for backward compatibility
UPDATE tasks SET assignee_id = assigned_to_id WHERE assignee_id IS NULL AND assigned_to_id IS NOT NULL;
UPDATE tasks SET creator_id = created_by_id WHERE creator_id IS NULL AND created_by_id IS NOT NULL;

-- Add columns to notifications for better tracking
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS read_status BOOLEAN DEFAULT FALSE;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS related_task_id BIGINT REFERENCES tasks(id);
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS related_project_id BIGINT REFERENCES projects(id);

-- Update read_status from is_read for backward compatibility
UPDATE notifications SET read_status = is_read WHERE read_status IS NULL;

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_task_history_task ON task_history(task_id);
CREATE INDEX IF NOT EXISTS idx_task_history_user ON task_history(user_id);
CREATE INDEX IF NOT EXISTS idx_task_history_created ON task_history(created_at);

CREATE INDEX IF NOT EXISTS idx_workload_analytics_user ON workload_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_workload_analytics_date ON workload_analytics(date);

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_tasks_complexity ON tasks(complexity_score);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_creator ON tasks(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_manager ON projects(manager_id);

-- Add comments
COMMENT ON TABLE task_history IS 'Audit trail for task changes and time logging';
COMMENT ON TABLE workload_analytics IS 'Daily workload analytics for performance monitoring';
COMMENT ON COLUMN users.skills IS 'JSON array of user skills for load balancing';
COMMENT ON COLUMN users.current_workload IS 'Current workload in hours';
COMMENT ON COLUMN users.max_workload IS 'Maximum workload capacity in hours';
COMMENT ON COLUMN tasks.complexity_score IS 'Task complexity score (1-10) for load balancing';
COMMENT ON COLUMN tasks.skill_requirements IS 'JSON array of required skills for the task';