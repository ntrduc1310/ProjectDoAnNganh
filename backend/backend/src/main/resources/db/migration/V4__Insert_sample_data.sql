-- =====================================
-- Sample Data Migration
-- Version: V2__Insert_sample_data.sql
-- Description: Insert sample users, projects, and tasks for testing
-- =====================================

-- Insert sample users với skills và workload
INSERT INTO users (username, email, password, first_name, last_name, role, skills, current_workload, max_workload, hourly_rate, department, status) VALUES
('admin', 'admin@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'User', 'ADMIN', 
 '["Management", "Leadership", "Strategic Planning"]', 0, 40, 50.00, 'Management', 'ACTIVE'),

('john.doe', 'john.doe@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe', 'MANAGER', 
 '["Java", "Spring Boot", "Project Management", "Team Leadership"]', 20, 40, 45.00, 'Development', 'ACTIVE'),

('jane.smith', 'jane.smith@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jane', 'Smith', 'USER', 
 '["React", "TypeScript", "UI/UX Design", "Frontend Development"]', 25, 40, 40.00, 'Development', 'ACTIVE'),

('mike.wilson', 'mike.wilson@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Mike', 'Wilson', 'USER', 
 '["PostgreSQL", "Database Design", "Backend Development", "API Development"]', 15, 40, 42.00, 'Development', 'ACTIVE'),

('sarah.lee', 'sarah.lee@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Sarah', 'Lee', 'USER', 
 '["Testing", "Quality Assurance", "Automation", "Documentation"]', 18, 40, 38.00, 'QA', 'ACTIVE');

-- Insert sample projects với budget tracking
INSERT INTO projects (name, description, status, priority, start_date, end_date, budget, actual_cost, progress, manager_id, client_name, estimated_hours) VALUES
('Task Management System', 'Comprehensive task management application with load balancing features', 'IN_PROGRESS', 'HIGH', 
 '2024-01-01', '2024-06-30', 150000.00, 85000.00, 75, 2, 'Internal Project', 1200),

('E-commerce Platform', 'Modern e-commerce platform with advanced analytics', 'PLANNING', 'HIGH', 
 '2024-03-01', '2024-12-31', 300000.00, 25000.00, 15, 2, 'TechCorp Ltd', 2400),

('Mobile App Development', 'Cross-platform mobile application', 'IN_PROGRESS', 'MEDIUM', 
 '2024-02-15', '2024-08-15', 120000.00, 60000.00, 50, 2, 'StartupXYZ', 960);

-- Insert sample tasks với load balancing fields
INSERT INTO tasks (title, description, status, priority, estimated_hours, actual_hours, complexity_score, skill_requirements, due_date, project_id, assignee_id, creator_id, assignment_algorithm, progress) VALUES
('Database Schema Design', 'Design and implement PostgreSQL database schema with advanced features', 'COMPLETED', 'HIGH', 
 16, 18, 8, '["PostgreSQL", "Database Design"]', '2024-01-15 17:00:00', 1, 4, 2, 'SKILL_BASED', 100),

('Frontend Component Development', 'Create React components for task management interface', 'IN_PROGRESS', 'HIGH', 
 24, 12, 7, '["React", "TypeScript", "UI/UX Design"]', '2024-01-30 17:00:00', 1, 3, 2, 'SKILL_BASED', 60),

('Load Balancing Algorithm Implementation', 'Implement multiple load balancing algorithms for task assignment', 'TODO', 'HIGH', 
 20, 0, 9, '["Java", "Spring Boot", "Algorithms"]', '2024-02-15 17:00:00', 1, 2, 2, 'WORKLOAD_BASED', 0),

('API Documentation', 'Create comprehensive API documentation using Swagger', 'TODO', 'MEDIUM', 
 8, 0, 4, '["Documentation", "API Development"]', '2024-02-01 17:00:00', 1, 5, 2, 'ROUND_ROBIN', 0),

('Performance Testing', 'Conduct comprehensive performance testing of the application', 'TODO', 'MEDIUM', 
 12, 0, 6, '["Testing", "Performance Analysis"]', '2024-02-20 17:00:00', 1, 5, 2, 'LEAST_LOADED', 0),

('E-commerce Backend Setup', 'Initial backend architecture for e-commerce platform', 'TODO', 'HIGH', 
 32, 0, 8, '["Java", "Spring Boot", "Microservices"]', '2024-03-15 17:00:00', 2, NULL, 2, 'SKILL_BASED', 0),

('Mobile App UI Design', 'Design user interface for mobile application', 'TODO', 'MEDIUM', 
 16, 0, 5, '["UI/UX Design", "Mobile Development"]', '2024-03-01 17:00:00', 3, NULL, 2, 'ROUND_ROBIN', 0);

-- Insert sample task history for analytics
INSERT INTO task_history (task_id, user_id, action, old_status, new_status, old_assignee_id, new_assignee_id, hours_logged, notes) VALUES
(1, 4, 'ASSIGNED', NULL, 'TODO', NULL, 4, 0, 'Task assigned to Mike Wilson for database expertise'),
(1, 4, 'STATUS_CHANGE', 'TODO', 'IN_PROGRESS', 4, 4, 0, 'Started working on database schema'),
(1, 4, 'TIME_LOG', 'IN_PROGRESS', 'IN_PROGRESS', 4, 4, 8, 'Completed initial schema design'),
(1, 4, 'STATUS_CHANGE', 'IN_PROGRESS', 'COMPLETED', 4, 4, 10, 'Database schema completed and tested'),
(2, 3, 'ASSIGNED', NULL, 'TODO', NULL, 3, 0, 'Task assigned to Jane Smith for frontend expertise'),
(2, 3, 'STATUS_CHANGE', 'TODO', 'IN_PROGRESS', 3, 3, 0, 'Started frontend component development'),
(2, 3, 'TIME_LOG', 'IN_PROGRESS', 'IN_PROGRESS', 3, 3, 6, 'Completed task list component'),
(2, 3, 'TIME_LOG', 'IN_PROGRESS', 'IN_PROGRESS', 3, 3, 6, 'Completed task form component');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, read_status, related_task_id, related_project_id) VALUES
(4, 'Task Completed', 'You have successfully completed "Database Schema Design"', 'SUCCESS', TRUE, 1, 1),
(3, 'New Task Assigned', 'You have been assigned to "Frontend Component Development"', 'INFO', FALSE, 2, 1),
(2, 'Project Update', 'Task Management System project is 75% complete', 'INFO', FALSE, NULL, 1),
(5, 'New Task Available', 'API Documentation task is ready for assignment', 'INFO', FALSE, 4, 1),
(2, 'Budget Alert', 'Project "Task Management System" has used 56% of allocated budget', 'WARNING', FALSE, NULL, 1);

-- Insert sample workload analytics
INSERT INTO workload_analytics (user_id, date, planned_hours, actual_hours, efficiency_score, tasks_completed) VALUES
(4, '2024-01-10', 8, 8, 100.0, 1),
(4, '2024-01-11', 8, 10, 80.0, 0),
(3, '2024-01-12', 8, 6, 133.3, 0),
(3, '2024-01-13', 8, 6, 133.3, 0),
(2, '2024-01-14', 6, 7, 85.7, 0),
(5, '2024-01-15', 8, 0, 0.0, 0);

-- Add comments for better understanding
COMMENT ON TABLE users IS 'Enhanced user table with skills, workload tracking, and hourly rates';
COMMENT ON TABLE projects IS 'Enhanced project table with budget tracking and progress monitoring';
COMMENT ON TABLE tasks IS 'Enhanced task table with complexity scoring and skill requirements for load balancing';
COMMENT ON TABLE task_history IS 'Comprehensive task history for analytics and audit trails';
COMMENT ON TABLE workload_analytics IS 'Daily workload analytics for performance monitoring and load balancing optimization';
