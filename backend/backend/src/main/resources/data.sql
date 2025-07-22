-- ====================================
-- SAMPLE DATA FOR PROJECT DO AN NGANH
-- Decision Support System
-- ====================================

-- Clear existing data (for development)
-- DELETE FROM task_assignments;
-- DELETE FROM tasks;
-- DELETE FROM projects;
-- DELETE FROM team_members;
-- DELETE FROM users;

-- ====================================
-- USERS TABLE
-- ====================================
INSERT INTO users (id, email, password, full_name, role, department, created_at, updated_at) VALUES
(1, 'admin@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin System', 'ADMIN', 'IT', NOW(), NOW()),
(2, 'manager@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Project Manager', 'MANAGER', 'Management', NOW(), NOW()),
(3, 'duc.nguyen@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nguyễn Trọng Đức', 'USER', 'Development', NOW(), NOW()),
(4, 'minh.tran@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Trần Văn Minh', 'USER', 'Development', NOW(), NOW()),
(5, 'linh.pham@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Phạm Thị Linh', 'USER', 'Design', NOW(), NOW()),
(6, 'khang.le@doannganh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lê Minh Khang', 'USER', 'Testing', NOW(), NOW());

-- ====================================
-- TEAM_MEMBERS TABLE
-- ====================================
INSERT INTO team_members (id, user_id, skills, workload_capacity, current_workload, efficiency_score, availability_status, created_at, updated_at) VALUES
(1, 3, 'Java,Spring Boot,React,TypeScript', 100, 65, 88.5, 'AVAILABLE', NOW(), NOW()),
(2, 4, 'Python,Django,Vue.js,PostgreSQL', 100, 45, 92.3, 'AVAILABLE', NOW(), NOW()),
(3, 5, 'UI/UX,Figma,CSS,HTML', 100, 70, 85.7, 'BUSY', NOW(), NOW()),
(4, 6, 'Testing,Selenium,JUnit,Postman', 100, 30, 91.2, 'AVAILABLE', NOW(), NOW());

-- ====================================
-- PROJECTS TABLE  
-- ====================================
INSERT INTO projects (id, name, description, status, priority, start_date, end_date, manager_id, created_at, updated_at) VALUES
(1, 'Decision Support System', 'Hệ thống hỗ trợ ra quyết định phân công nhiệm vụ và cân bằng tải công việc thông minh', 'IN_PROGRESS', 'HIGH', '2024-12-01', '2025-04-30', 2, NOW(), NOW()),
(2, 'E-Commerce Platform', 'Nền tảng thương mại điện tử với AI recommendation', 'PLANNING', 'MEDIUM', '2025-01-15', '2025-06-30', 2, NOW(), NOW()),
(3, 'Mobile Banking App', 'Ứng dụng ngân hàng di động với bảo mật cao', 'COMPLETED', 'HIGH', '2024-06-01', '2024-11-30', 2, NOW(), NOW());

-- ====================================
-- TASKS TABLE
-- ====================================
INSERT INTO tasks (id, title, description, status, priority, estimated_hours, actual_hours, due_date, project_id, created_at, updated_at) VALUES
-- Decision Support System Tasks
(1, 'Frontend React Development', 'Phát triển giao diện người dùng với React + TypeScript', 'IN_PROGRESS', 'HIGH', 80, 45, '2025-02-15', 1, NOW(), NOW()),
(2, 'Backend API Development', 'Xây dựng REST API với Spring Boot', 'IN_PROGRESS', 'HIGH', 60, 35, '2025-02-10', 1, NOW(), NOW()),
(3, 'Database Design', 'Thiết kế cơ sở dữ liệu PostgreSQL', 'COMPLETED', 'MEDIUM', 20, 18, '2025-01-05', 1, NOW(), NOW()),
(4, 'AI Algorithm Implementation', 'Tích hợp thuật toán AI cho decision support', 'TODO', 'HIGH', 40, 0, '2025-03-01', 1, NOW(), NOW()),
(5, 'UI/UX Design', 'Thiết kế giao diện và trải nghiệm người dùng', 'COMPLETED', 'MEDIUM', 30, 28, '2025-01-20', 1, NOW(), NOW()),
(6, 'Testing & QA', 'Kiểm thử hệ thống và đảm bảo chất lượng', 'TODO', 'MEDIUM', 25, 0, '2025-04-01', 1, NOW(), NOW()),

-- E-Commerce Platform Tasks  
(7, 'Market Research', 'Nghiên cứu thị trường và đối thủ cạnh tranh', 'IN_PROGRESS', 'MEDIUM', 15, 8, '2025-02-01', 2, NOW(), NOW()),
(8, 'System Architecture', 'Thiết kế kiến trúc hệ thống', 'TODO', 'HIGH', 25, 0, '2025-02-20', 2, NOW(), NOW()),

-- Mobile Banking App Tasks (Completed project)
(9, 'Security Implementation', 'Triển khai các tính năng bảo mật', 'COMPLETED', 'HIGH', 50, 48, '2024-10-15', 3, NOW(), NOW()),
(10, 'Mobile App Development', 'Phát triển ứng dụng di động', 'COMPLETED', 'HIGH', 100, 95, '2024-11-01', 3, NOW(), NOW());

-- ====================================
-- TASK_ASSIGNMENTS TABLE
-- ====================================
INSERT INTO task_assignments (id, task_id, team_member_id, assigned_date, assigned_by, status, notes, created_at, updated_at) VALUES
(1, 1, 1, '2024-12-15', 2, 'ASSIGNED', 'Frontend lead developer', NOW(), NOW()),
(2, 2, 1, '2024-12-20', 2, 'ASSIGNED', 'Backend development with Spring Boot expertise', NOW(), NOW()),
(3, 3, 2, '2024-12-01', 2, 'COMPLETED', 'Database design completed successfully', NOW(), NOW()),
(4, 5, 3, '2024-12-10', 2, 'COMPLETED', 'UI/UX design for main dashboard', NOW(), NOW()),
(5, 7, 2, '2025-01-05', 2, 'ASSIGNED', 'Market research for e-commerce platform', NOW(), NOW()),
(6, 9, 1, '2024-08-01', 2, 'COMPLETED', 'Security implementation for banking app', NOW(), NOW()),
(7, 10, 1, '2024-09-01', 2, 'COMPLETED', 'Mobile development completed', NOW(), NOW());

-- ====================================
-- DASHBOARD_STATS (View/Calculated Data)
-- This would typically be calculated, but for demo purposes:
-- ====================================

-- ====================================
-- WORKLOAD_PREDICTIONS (AI Generated Data)
-- ====================================
INSERT INTO workload_predictions (id, team_member_id, predicted_workload, confidence_score, prediction_date, factors, created_at) VALUES
(1, 1, 75.5, 92.3, '2025-02-01', 'Based on current tasks and historical performance', NOW()),
(2, 2, 55.2, 88.7, '2025-02-01', 'Considering new project assignments', NOW()),
(3, 3, 80.1, 85.4, '2025-02-01', 'High demand for UI/UX work', NOW()),
(4, 4, 45.8, 91.6, '2025-02-01', 'Testing phase for multiple projects', NOW());

-- ====================================
-- NOTIFICATIONS (Real-time updates)
-- ====================================
INSERT INTO notifications (id, user_id, type, title, message, is_read, created_at) VALUES
(1, 3, 'TASK_ASSIGNED', 'New Task Assigned', 'You have been assigned to "Frontend React Development"', false, NOW()),
(2, 1, 'DEADLINE_REMINDER', 'Deadline Reminder', 'Task "Backend API Development" is due in 3 days', false, NOW() - INTERVAL '1 hour'),
(3, 2, 'PROJECT_UPDATE', 'Project Update', 'Decision Support System project is 65% complete', true, NOW() - INTERVAL '2 hours'),
(4, 4, 'WORKLOAD_ALERT', 'Workload Alert', 'Your current workload is optimal for new assignments', false, NOW() - INTERVAL '30 minutes');

-- ====================================
-- AI_SUGGESTIONS (Decision Support Data)
-- ====================================
INSERT INTO ai_suggestions (id, type, title, description, confidence_score, suggested_assignee_id, task_id, created_at, status) VALUES
(1, 'TASK_ASSIGNMENT', 'Optimal Assignment Suggestion', 'Duc Nguyen is the best fit for AI Algorithm Implementation task based on skills and current workload', 94.2, 1, 4, NOW(), 'PENDING'),
(2, 'WORKLOAD_BALANCE', 'Workload Redistribution', 'Consider reassigning some tasks from Linh Pham to Minh Tran to balance workload', 87.5, 2, NULL, NOW(), 'PENDING'),
(3, 'DEADLINE_RISK', 'Deadline Risk Alert', 'Current pace may cause delay in Frontend development. Consider adding resources', 91.3, NULL, 1, NOW(), 'ACKNOWLEDGED');

-- ====================================
-- SKILL_MATRIX (For AI decision making)
-- ====================================
INSERT INTO skill_matrix (id, team_member_id, skill_name, proficiency_level, years_experience, last_used, created_at) VALUES
(1, 1, 'Java', 'EXPERT', 3, '2025-01-20', NOW()),
(2, 1, 'Spring Boot', 'EXPERT', 2, '2025-01-20', NOW()),
(3, 1, 'React', 'ADVANCED', 2, '2025-01-20', NOW()),
(4, 1, 'TypeScript', 'ADVANCED', 2, '2025-01-20', NOW()),
(5, 2, 'Python', 'EXPERT', 4, '2025-01-18', NOW()),
(6, 2, 'Django', 'ADVANCED', 2, '2024-12-15', NOW()),
(7, 2, 'PostgreSQL', 'ADVANCED', 3, '2025-01-15', NOW()),
(8, 3, 'UI/UX Design', 'EXPERT', 3, '2025-01-20', NOW()),
(9, 3, 'Figma', 'EXPERT', 2, '2025-01-19', NOW()),
(10, 4, 'Testing', 'ADVANCED', 2, '2025-01-10', NOW()),
(11, 4, 'Selenium', 'INTERMEDIATE', 1, '2024-12-20', NOW());

-- ====================================
-- PROJECT_METRICS (For dashboard analytics)
-- ====================================
INSERT INTO project_metrics (id, project_id, metric_name, metric_value, measurement_date, created_at) VALUES
(1, 1, 'COMPLETION_PERCENTAGE', 65.5, '2025-01-20', NOW()),
(2, 1, 'BUDGET_UTILIZATION', 45.2, '2025-01-20', NOW()),
(3, 1, 'TEAM_EFFICIENCY', 88.7, '2025-01-20', NOW()),
(4, 2, 'COMPLETION_PERCENTAGE', 15.3, '2025-01-20', NOW()),
(5, 3, 'COMPLETION_PERCENTAGE', 100.0, '2024-11-30', NOW()),
(6, 3, 'FINAL_BUDGET_UTILIZATION', 92.4, '2024-11-30', NOW());

-- ====================================
-- RESET SEQUENCES (PostgreSQL)
-- ====================================
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('team_members_id_seq', (SELECT MAX(id) FROM team_members));
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));
SELECT setval('task_assignments_id_seq', (SELECT MAX(id) FROM task_assignments));

-- ====================================
-- SAMPLE QUERIES FOR TESTING
-- ====================================
/*
-- Test dashboard stats
SELECT 
    (SELECT COUNT(*) FROM projects WHERE status = 'IN_PROGRESS') AS active_projects,
    (SELECT COUNT(*) FROM tasks WHERE status = 'IN_PROGRESS') AS tasks_in_progress,
    (SELECT COUNT(*) FROM tasks WHERE status = 'TODO' AND due_date < NOW()) AS overdue_tasks,
    (SELECT COUNT(*) FROM tasks WHERE status = 'COMPLETED' AND updated_at >= NOW() - INTERVAL '7 days') AS completed_this_week;

-- Test team workload
SELECT 
    tm.id,
    u.full_name,
    tm.current_workload,
    tm.workload_capacity,
    tm.efficiency_score,
    tm.availability_status
FROM team_members tm
JOIN users u ON tm.user_id = u.id
ORDER BY tm.current_workload DESC;

-- Test task assignments
SELECT 
    t.title,
    t.status,
    t.priority,
    u.full_name AS assigned_to,
    p.name AS project_name
FROM tasks t
JOIN task_assignments ta ON t.id = ta.task_id
JOIN team_members tm ON ta.team_member_id = tm.id
JOIN users u ON tm.user_id = u.id
JOIN projects p ON t.project_id = p.id
WHERE t.status IN ('TODO', 'IN_PROGRESS')
ORDER BY t.priority DESC, t.due_date ASC;
*/