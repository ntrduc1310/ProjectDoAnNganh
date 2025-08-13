-- Insert initial data for Task Management System
-- Version: V2__Insert_initial_data.sql

-- Insert users with consistent data and conflict handling
INSERT INTO users (id, username, email, password, first_name, last_name, role, enabled, status) VALUES
     (1, 'admin', 'admin@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Admin', 'User', 'ADMIN', true, 'ACTIVE'),
     (2, 'user1', 'user1@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'John', 'Doe', 'USER', true, 'ACTIVE'),
     (3, 'user2', 'user2@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Jane', 'Smith', 'USER', true, 'ACTIVE'),
     (4, 'manager1', 'manager1@taskmanagement.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdqMObIcPdmRa7oKzlEwAqO3l9u', 'Mike', 'Johnson', 'MANAGER', true, 'ACTIVE')
ON CONFLICT (username) DO NOTHING;

INSERT INTO projects (name, description, start_date, end_date, status, priority, owner_id, budget, progress_percentage, color_code) VALUES 
('Website Redesign', 'Complete redesign of company website with modern UI/UX', '2024-01-01', '2024-06-30', 'ACTIVE', 'HIGH', 1, 50000.00, 25, '#3B82F6'),
('Mobile App Development', 'Native mobile application for iOS and Android', '2024-02-01', '2024-12-31', 'ACTIVE', 'HIGH', 4, 120000.00, 15, '#10B981'),
('Database Migration', 'Migrate legacy database to PostgreSQL', '2024-03-01', '2024-05-31', 'ACTIVE', 'MEDIUM', 1, 25000.00, 60, '#F59E0B'),
('Marketing Campaign', 'Q2 digital marketing campaign launch', '2024-04-01', '2024-08-31', 'PLANNING', 'MEDIUM', 4, 75000.00, 5, '#EF4444')
ON CONFLICT (name) DO NOTHING;

-- Insert project members
INSERT INTO project_members (project_id, user_id, role, permissions) 
SELECT p.id, u.id, v.role, v.permissions
FROM (VALUES 
('Website Redesign', 'admin', 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
('Website Redesign', 'user1', 'DEVELOPER', ARRAY['READ', 'WRITE']),
('Website Redesign', 'user2', 'DESIGNER', ARRAY['READ', 'WRITE']),
('Mobile App Development', 'manager1', 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
('Mobile App Development', 'user1', 'LEAD_DEVELOPER', ARRAY['READ', 'WRITE', 'MANAGE_TASKS']),
('Mobile App Development', 'user2', 'UI_UX_DESIGNER', ARRAY['READ', 'WRITE']),
('Database Migration', 'admin', 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
('Database Migration', 'user1', 'DATABASE_ADMIN', ARRAY['READ', 'WRITE', 'MANAGE_TASKS']),
('Marketing Campaign', 'manager1', 'PROJECT_MANAGER', ARRAY['READ', 'WRITE', 'DELETE', 'MANAGE_MEMBERS']),
('Marketing Campaign', 'user2', 'MARKETING_SPECIALIST', ARRAY['READ', 'WRITE'])
) AS v(project_name, username, role, permissions)
JOIN projects p ON p.name = v.project_name
JOIN users u ON u.username = v.username
ON CONFLICT (project_id, user_id) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, due_date, assigned_to_id, created_by_id, project_id, estimated_hours, tags, progress_percentage) 
SELECT v.title, v.description, v.status, v.priority, v.due_date::timestamp,
       u_assigned.id, u_created.id, p.id, v.estimated_hours, v.tags, v.progress_percentage
FROM (VALUES 
-- Website Redesign Tasks
('Design Homepage Mockup', 'Create wireframes and mockups for the new homepage design', 'IN_PROGRESS', 'HIGH', '2024-02-15 17:00:00', 'user2', 'admin', 'Website Redesign', 20, ARRAY['design', 'homepage', 'mockup'], 75),
('Implement Responsive Navigation', 'Develop mobile-first responsive navigation component', 'TODO', 'HIGH', '2024-02-20 17:00:00', 'user1', 'admin', 'Website Redesign', 15, ARRAY['development', 'navigation', 'responsive'], 0),
('Content Strategy Planning', 'Plan content architecture and SEO strategy', 'COMPLETED', 'MEDIUM', '2024-01-30 17:00:00', 'user2', 'admin', 'Website Redesign', 12, ARRAY['content', 'seo', 'strategy'], 100),
('Backend API Integration', 'Integrate new frontend with existing backend APIs', 'TODO', 'MEDIUM', '2024-03-01 17:00:00', 'user1', 'admin', 'Website Redesign', 25, ARRAY['development', 'api', 'integration'], 0),
-- Mobile App Development Tasks
('UI/UX Design System', 'Create comprehensive design system for mobile app', 'IN_PROGRESS', 'HIGH', '2024-03-15 17:00:00', 'user2', 'manager1', 'Mobile App Development', 30, ARRAY['design', 'mobile', 'ui-system'], 40),
('User Authentication Module', 'Implement secure user login and registration', 'TODO', 'HIGH', '2024-04-01 17:00:00', 'user1', 'manager1', 'Mobile App Development', 20, ARRAY['development', 'authentication', 'security'], 0),
('Push Notifications Setup', 'Configure Firebase push notifications', 'TODO', 'MEDIUM', '2024-05-01 17:00:00', 'user1', 'manager1', 'Mobile App Development', 15, ARRAY['development', 'notifications', 'firebase'], 0),
-- Database Migration Tasks
('Schema Analysis', 'Analyze current database schema and dependencies', 'COMPLETED', 'HIGH', '2024-03-10 17:00:00', 'user1', 'admin', 'Database Migration', 16, ARRAY['database', 'analysis', 'migration'], 100),
('Data Migration Scripts', 'Write scripts to migrate data from old to new database', 'IN_PROGRESS', 'HIGH', '2024-04-01 17:00:00', 'user1', 'admin', 'Database Migration', 40, ARRAY['database', 'migration', 'scripts'], 70),
('Performance Testing', 'Test database performance after migration', 'TODO', 'MEDIUM', '2024-05-15 17:00:00', 'user1', 'admin', 'Database Migration', 12, ARRAY['database', 'testing', 'performance'], 0),
-- Marketing Campaign Tasks
('Campaign Strategy Document', 'Create comprehensive digital marketing strategy', 'TODO', 'HIGH', '2024-04-15 17:00:00', 'user2', 'manager1', 'Marketing Campaign', 25, ARRAY['marketing', 'strategy', 'planning'], 0),
('Social Media Content Calendar', 'Plan and schedule social media posts for Q2', 'TODO', 'MEDIUM', '2024-05-01 17:00:00', 'user2', 'manager1', 'Marketing Campaign', 20, ARRAY['marketing', 'social-media', 'content'], 0)
) AS v(title, description, status, priority, due_date, assigned_username, created_username, project_name, estimated_hours, tags, progress_percentage)
JOIN projects p ON p.name = v.project_name
JOIN users u_assigned ON u_assigned.username = v.assigned_username
JOIN users u_created ON u_created.username = v.created_username
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE tasks.title = v.title);

-- Insert task dependencies
INSERT INTO task_dependencies (prerequisite_task_id, dependent_task_id, dependency_type) 
SELECT t1.id, t2.id, v.dependency_type
FROM (VALUES 
('Design Homepage Mockup', 'Implement Responsive Navigation', 'FINISH_TO_START'),
('Content Strategy Planning', 'Design Homepage Mockup', 'FINISH_TO_START'),
('Implement Responsive Navigation', 'Backend API Integration', 'FINISH_TO_START'),
('Schema Analysis', 'Data Migration Scripts', 'FINISH_TO_START'),
('Data Migration Scripts', 'Performance Testing', 'FINISH_TO_START'),
('Campaign Strategy Document', 'Social Media Content Calendar', 'FINISH_TO_START')
) AS v(prerequisite_title, dependent_title, dependency_type)
JOIN tasks t1 ON t1.title = v.prerequisite_title
JOIN tasks t2 ON t2.title = v.dependent_title
ON CONFLICT (prerequisite_task_id, dependent_task_id) DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read, action_url, related_entity_type, related_entity_id) 
SELECT u.id, v.title, v.message, v.type, v.is_read, v.action_url, v.related_entity_type, 
       CASE WHEN v.related_entity_type = 'TASK' THEN t.id 
            WHEN v.related_entity_type = 'PROJECT' THEN p.id 
            ELSE NULL END
FROM (VALUES 
('user1', 'New Task Assigned', 'You have been assigned to task: Implement Responsive Navigation', 'TASK_ASSIGNED', false, '/tasks/2', 'TASK', 'Implement Responsive Navigation'),
('user2', 'Task Due Soon', 'Task "Design Homepage Mockup" is due tomorrow', 'TASK_DUE', false, '/tasks/1', 'TASK', 'Design Homepage Mockup'),
('user1', 'Project Update', 'Database Migration project progress updated to 60%', 'PROJECT_UPDATE', true, '/projects/3', 'PROJECT', 'Database Migration'),
('manager1', 'New Project Member', 'Jane Smith joined Mobile App Development project', 'PROJECT_MEMBER', false, '/projects/2', 'PROJECT', 'Mobile App Development'),
('admin', 'Task Completed', 'Content Strategy Planning has been completed', 'TASK_COMPLETED', true, '/tasks/3', 'TASK', 'Content Strategy Planning')
) AS v(username, title, message, type, is_read, action_url, related_entity_type, related_entity_name)
JOIN users u ON u.username = v.username
LEFT JOIN tasks t ON t.title = v.related_entity_name AND v.related_entity_type = 'TASK'
LEFT JOIN projects p ON p.name = v.related_entity_name AND v.related_entity_type = 'PROJECT'
WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = u.id AND title = v.title);

-- Insert sample task comments
INSERT INTO task_comments (task_id, user_id, comment) 
SELECT t.id, u.id, v.comment
FROM (VALUES 
('Design Homepage Mockup', 'admin', 'Great progress on the homepage design! The new layout looks modern and user-friendly.'),
('Design Homepage Mockup', 'user2', 'Thank you! I''ve incorporated the feedback from the stakeholder meeting. Ready for review.'),
('Implement Responsive Navigation', 'admin', 'Make sure to test the navigation on both iOS Safari and Android Chrome browsers.'),
('Data Migration Scripts', 'user1', 'Migration scripts are 70% complete. Found some data inconsistencies that need manual review.'),
('Data Migration Scripts', 'admin', 'Thanks for the update. Let''s schedule a meeting to review the inconsistencies.')
) AS v(task_title, username, comment)
JOIN tasks t ON t.title = v.task_title
JOIN users u ON u.username = v.username
WHERE NOT EXISTS (SELECT 1 FROM task_comments WHERE task_id = t.id AND user_id = u.id AND comment = v.comment);

-- Insert sample time logs
INSERT INTO time_logs (task_id, user_id, start_time, end_time, duration_minutes, description, billable) 
SELECT t.id, u.id, v.start_time, v.end_time, v.duration_minutes, v.description, v.billable
FROM (VALUES 
('Design Homepage Mockup', 'user2', '2024-01-15 09:00:00', '2024-01-15 12:30:00', 210, 'Initial homepage wireframe creation', true),
('Design Homepage Mockup', 'user2', '2024-01-16 14:00:00', '2024-01-16 17:00:00', 180, 'Homepage mockup refinement and stakeholder feedback integration', true),
('Content Strategy Planning', 'user2', '2024-01-20 10:00:00', '2024-01-20 15:00:00', 300, 'Content strategy research and planning', true),
('Schema Analysis', 'user1', '2024-03-05 09:00:00', '2024-03-05 16:00:00', 420, 'Database schema analysis and documentation', true),
('Data Migration Scripts', 'user1', '2024-03-15 08:30:00', '2024-03-15 17:30:00', 540, 'Data migration script development', true)
) AS v(task_title, username, start_time, end_time, duration_minutes, description, billable)
JOIN tasks t ON t.title = v.task_title
JOIN users u ON u.username = v.username
WHERE NOT EXISTS (SELECT 1 FROM time_logs WHERE task_id = t.id AND user_id = u.id AND start_time = v.start_time);

-- Insert user settings
INSERT INTO user_settings (user_id, theme, language, timezone, email_notifications, push_notifications, dashboard_layout, preferences) 
SELECT u.id, v.theme, v.language, v.timezone, v.email_notifications, v.push_notifications, v.dashboard_layout, v.preferences
FROM (VALUES 
('admin', 'dark', 'en', 'UTC', true, true, 
 '{"widgets": ["tasks", "projects", "notifications", "analytics"], "layout": "grid"}',
 '{"autoSave": true, "defaultView": "kanban", "taskGrouping": "status"}'),
('user1', 'light', 'en', 'America/New_York', true, false,
 '{"widgets": ["tasks", "timeTracking", "projects"], "layout": "list"}',
 '{"autoSave": true, "defaultView": "list", "taskGrouping": "project"}'),
('user2', 'light', 'en', 'Europe/London', false, true,
 '{"widgets": ["tasks", "calendar", "notifications"], "layout": "grid"}',
 '{"autoSave": false, "defaultView": "calendar", "taskGrouping": "dueDate"}'),
('manager1', 'dark', 'en', 'Asia/Tokyo', true, true,
 '{"widgets": ["projects", "analytics", "team"], "layout": "dashboard"}',
 '{"autoSave": true, "defaultView": "dashboard", "taskGrouping": "assignee"}')
) AS v(username, theme, language, timezone, email_notifications, push_notifications, dashboard_layout, preferences)
JOIN users u ON u.username = v.username
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample activity logs
INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, ip_address) 
SELECT u.id, v.action, v.entity_type, 
       CASE WHEN v.entity_type = 'PROJECT' THEN p.id 
            WHEN v.entity_type = 'TASK' THEN t.id 
            WHEN v.entity_type = 'USER' THEN u.id 
            ELSE NULL END,
       v.details, v.ip_address
FROM (VALUES 
('admin', 'CREATE_PROJECT', 'PROJECT', 'Website Redesign', '{"projectName": "Website Redesign", "budget": 50000}', '192.168.1.100'),
('admin', 'ASSIGN_TASK', 'TASK', 'Design Homepage Mockup', '{"taskTitle": "Design Homepage Mockup", "assignedTo": "Jane Smith"}', '192.168.1.100'),
('user2', 'UPDATE_TASK', 'TASK', 'Design Homepage Mockup', '{"field": "progress", "oldValue": 50, "newValue": 75}', '192.168.1.101'),
('user1', 'COMPLETE_TASK', 'TASK', 'Content Strategy Planning', '{"taskTitle": "Content Strategy Planning"}', '192.168.1.102'),
('manager1', 'CREATE_PROJECT', 'PROJECT', 'Mobile App Development', '{"projectName": "Mobile App Development", "budget": 120000}', '192.168.1.103'),
('admin', 'LOGIN', 'USER', 'admin', '{"loginMethod": "password", "success": true}', '192.168.1.100'),
('user1', 'LOGIN', 'USER', 'user1', '{"loginMethod": "password", "success": true}', '192.168.1.102')
) AS v(username, action, entity_type, entity_name, details, ip_address)
JOIN users u ON u.username = v.username
LEFT JOIN projects p ON p.name = v.entity_name AND v.entity_type = 'PROJECT'
LEFT JOIN tasks t ON t.title = v.entity_name AND v.entity_type = 'TASK'
WHERE NOT EXISTS (SELECT 1 FROM activity_logs WHERE user_id = u.id AND action = v.action AND created_at::date = CURRENT_DATE);