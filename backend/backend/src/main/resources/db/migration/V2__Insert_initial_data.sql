-- Insert initial data for Task Management System
-- Version: V2__Insert_initial_data.sql

-- Insert admin user
INSERT INTO users (username, email, password, first_name, last_name, role, enabled) VALUES 
('admin', 'admin@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Admin', 'User', 'ADMIN', true),
('user1', 'user1@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'John', 'Doe', 'USER', true),
('user2', 'user2@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Jane', 'Smith', 'USER', true),
('manager1', 'manager1@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Mike', 'Johnson', 'MANAGER', true);
-- Default password for all users: 'password123'

-- Insert sample projects
INSERT INTO projects (name, description, start_date, end_date, status, priority, owner_id, budget, progress_percentage, color_code) VALUES 
('Website Redesign', 'Complete redesign of company website with modern UI/UX', '2024-01-01', '2024-06-30', 'ACTIVE', 'HIGH', 1, 50000.00, 25, '#3B82F6'),
('Mobile App Development', 'Native mobile application for iOS and Android', '2024-02-01', '2024-12-31', 'ACTIVE', 'HIGH', 4, 120000.00, 15, '#10B981'),
('Database Migration', 'Migrate legacy database to PostgreSQL', '2024-03-01', '2024-05-31', 'ACTIVE', 'MEDIUM', 1, 25000.00, 60, '#F59E0B'),
('Marketing Campaign', 'Q2 digital marketing campaign launch', '2024-04-01', '2024-08-31', 'PLANNING', 'MEDIUM', 4, 75000.00, 5, '#EF4444');

-- Insert project members
INSERT INTO project_members (project_id, user_id, role, permissions) VALUES 
(1, 1, 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
(1, 2, 'DEVELOPER', ARRAY['READ', 'WRITE']),
(1, 3, 'DESIGNER', ARRAY['READ', 'WRITE']),
(2, 4, 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
(2, 2, 'LEAD_DEVELOPER', ARRAY['READ', 'WRITE', 'MANAGE_TASKS']),
(2, 3, 'UI_UX_DESIGNER', ARRAY['READ', 'WRITE']),
(3, 1, 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
(3, 2, 'DATABASE_ADMIN', ARRAY['READ', 'WRITE', 'MANAGE_TASKS']),
(4, 4, 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
(4, 3, 'MARKETING_SPECIALIST', ARRAY['READ', 'WRITE']);

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, due_date, assigned_to_id, created_by_id, project_id, estimated_hours, tags, progress_percentage) VALUES 
-- Website Redesign Tasks
('Design Homepage Mockup', 'Create wireframes and mockups for the new homepage design', 'IN_PROGRESS', 'HIGH', '2024-02-15 17:00:00', 3, 1, 1, 20, ARRAY['design', 'homepage', 'mockup'], 75),
('Implement Responsive Navigation', 'Develop mobile-first responsive navigation component', 'TODO', 'HIGH', '2024-02-20 17:00:00', 2, 1, 1, 15, ARRAY['development', 'navigation', 'responsive'], 0),
('Content Strategy Planning', 'Plan content architecture and SEO strategy', 'COMPLETED', 'MEDIUM', '2024-01-30 17:00:00', 3, 1, 1, 12, ARRAY['content', 'seo', 'strategy'], 100),
('Backend API Integration', 'Integrate new frontend with existing backend APIs', 'TODO', 'MEDIUM', '2024-03-01 17:00:00', 2, 1, 1, 25, ARRAY['development', 'api', 'integration'], 0),

-- Mobile App Development Tasks
('UI/UX Design System', 'Create comprehensive design system for mobile app', 'IN_PROGRESS', 'HIGH', '2024-03-15 17:00:00', 3, 4, 2, 30, ARRAY['design', 'mobile', 'ui-system'], 40),
('User Authentication Module', 'Implement secure user login and registration', 'TODO', 'HIGH', '2024-04-01 17:00:00', 2, 4, 2, 20, ARRAY['development', 'authentication', 'security'], 0),
('Push Notifications Setup', 'Configure Firebase push notifications', 'TODO', 'MEDIUM', '2024-05-01 17:00:00', 2, 4, 2, 15, ARRAY['development', 'notifications', 'firebase'], 0),

-- Database Migration Tasks
('Schema Analysis', 'Analyze current database schema and dependencies', 'COMPLETED', 'HIGH', '2024-03-10 17:00:00', 2, 1, 3, 16, ARRAY['database', 'analysis', 'migration'], 100),
('Data Migration Scripts', 'Write scripts to migrate data from old to new database', 'IN_PROGRESS', 'HIGH', '2024-04-01 17:00:00', 2, 1, 3, 40, ARRAY['database', 'migration', 'scripts'], 70),
('Performance Testing', 'Test database performance after migration', 'TODO', 'MEDIUM', '2024-05-15 17:00:00', 2, 1, 3, 12, ARRAY['database', 'testing', 'performance'], 0),

-- Marketing Campaign Tasks
('Campaign Strategy Document', 'Create comprehensive digital marketing strategy', 'TODO', 'HIGH', '2024-04-15 17:00:00', 3, 4, 4, 25, ARRAY['marketing', 'strategy', 'planning'], 0),
('Social Media Content Calendar', 'Plan and schedule social media posts for Q2', 'TODO', 'MEDIUM', '2024-05-01 17:00:00', 3, 4, 4, 20, ARRAY['marketing', 'social-media', 'content'], 0);

-- Insert task dependencies
INSERT INTO task_dependencies (prerequisite_task_id, dependent_task_id, dependency_type) VALUES 
(1, 2, 'FINISH_TO_START'), -- Homepage mockup must be done before navigation implementation
(3, 1, 'FINISH_TO_START'), -- Content strategy before homepage design
(2, 4, 'FINISH_TO_START'), -- Navigation before API integration
(8, 9, 'FINISH_TO_START'), -- Schema analysis before data migration
(9, 10, 'FINISH_TO_START'), -- Data migration before performance testing
(11, 12, 'FINISH_TO_START'); -- Strategy before content calendar

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read, action_url, related_entity_type, related_entity_id) VALUES 
(2, 'New Task Assigned', 'You have been assigned to task: Implement Responsive Navigation', 'TASK_ASSIGNED', false, '/tasks/2', 'TASK', 2),
(3, 'Task Due Soon', 'Task "Design Homepage Mockup" is due tomorrow', 'TASK_DUE', false, '/tasks/1', 'TASK', 1),
(2, 'Project Update', 'Database Migration project progress updated to 60%', 'PROJECT_UPDATE', true, '/projects/3', 'PROJECT', 3),
(4, 'New Project Member', 'Jane Smith joined Mobile App Development project', 'PROJECT_MEMBER', false, '/projects/2', 'PROJECT', 2),
(1, 'Task Completed', 'Content Strategy Planning has been completed', 'TASK_COMPLETED', true, '/tasks/3', 'TASK', 3);

-- Insert sample task comments
INSERT INTO task_comments (task_id, user_id, comment) VALUES 
(1, 1, 'Great progress on the homepage design! The new layout looks modern and user-friendly.'),
(1, 3, 'Thank you! I''ve incorporated the feedback from the stakeholder meeting. Ready for review.'),
(2, 1, 'Make sure to test the navigation on both iOS Safari and Android Chrome browsers.'),
(9, 2, 'Migration scripts are 70% complete. Found some data inconsistencies that need manual review.'),
(9, 1, 'Thanks for the update. Let''s schedule a meeting to review the inconsistencies.');

-- Insert sample time logs
INSERT INTO time_logs (task_id, user_id, start_time, end_time, duration_minutes, description, billable) VALUES 
(1, 3, '2024-01-15 09:00:00', '2024-01-15 12:30:00', 210, 'Initial homepage wireframe creation', true),
(1, 3, '2024-01-16 14:00:00', '2024-01-16 17:00:00', 180, 'Homepage mockup refinement and stakeholder feedback integration', true),
(3, 3, '2024-01-20 10:00:00', '2024-01-20 15:00:00', 300, 'Content strategy research and planning', true),
(8, 2, '2024-03-05 09:00:00', '2024-03-05 16:00:00', 420, 'Database schema analysis and documentation', true),
(9, 2, '2024-03-15 08:30:00', '2024-03-15 17:30:00', 540, 'Data migration script development', true);

-- Insert user settings
INSERT INTO user_settings (user_id, theme, language, timezone, email_notifications, push_notifications, dashboard_layout, preferences) VALUES 
(1, 'dark', 'en', 'UTC', true, true, 
 '{"widgets": ["tasks", "projects", "notifications", "analytics"], "layout": "grid"}',
 '{"autoSave": true, "defaultView": "kanban", "taskGrouping": "status"}'),
(2, 'light', 'en', 'America/New_York', true, false,
 '{"widgets": ["tasks", "timeTracking", "projects"], "layout": "list"}',
 '{"autoSave": true, "defaultView": "list", "taskGrouping": "project"}'),
(3, 'light', 'en', 'Europe/London', false, true,
 '{"widgets": ["tasks", "calendar", "notifications"], "layout": "grid"}',
 '{"autoSave": false, "defaultView": "calendar", "taskGrouping": "dueDate"}'),
(4, 'dark', 'en', 'Asia/Tokyo', true, true,
 '{"widgets": ["projects", "analytics", "team"], "layout": "dashboard"}',
 '{"autoSave": true, "defaultView": "dashboard", "taskGrouping": "assignee"}');

-- Insert sample activity logs
INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, ip_address) VALUES 
(1, 'CREATE_PROJECT', 'PROJECT', 1, '{"projectName": "Website Redesign", "budget": 50000}', '192.168.1.100'),
(1, 'ASSIGN_TASK', 'TASK', 1, '{"taskTitle": "Design Homepage Mockup", "assignedTo": "Jane Smith"}', '192.168.1.100'),
(3, 'UPDATE_TASK', 'TASK', 1, '{"field": "progress", "oldValue": 50, "newValue": 75}', '192.168.1.101'),
(2, 'COMPLETE_TASK', 'TASK', 3, '{"taskTitle": "Content Strategy Planning"}', '192.168.1.102'),
(4, 'CREATE_PROJECT', 'PROJECT', 2, '{"projectName": "Mobile App Development", "budget": 120000}', '192.168.1.103'),
(1, 'LOGIN', 'USER', 1, '{"loginMethod": "password", "success": true}', '192.168.1.100'),
(2, 'LOGIN', 'USER', 2, '{"loginMethod": "password", "success": true}', '192.168.1.102');
