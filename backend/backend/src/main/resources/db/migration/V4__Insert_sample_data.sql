-- Insert extended sample data for load balancing and analytics
-- Version: V4__Insert_extended_sample_data.sql

-- Update existing users with additional information (avoid conflicts)
UPDATE users SET 
    skills = CASE username
        WHEN 'admin' THEN '["Management", "Leadership", "Strategic Planning"]'::jsonb
        WHEN 'user1' THEN '["Java", "Spring Boot", "Backend Development", "Database"]'::jsonb
        WHEN 'user2' THEN '["React", "TypeScript", "UI/UX Design", "Frontend Development"]'::jsonb
        WHEN 'manager1' THEN '["Project Management", "Team Leadership", "Strategy"]'::jsonb
        ELSE '[]'::jsonb
    END,
    current_workload = CASE username
        WHEN 'admin' THEN 10
        WHEN 'user1' THEN 25
        WHEN 'user2' THEN 20
        WHEN 'manager1' THEN 15
        ELSE 0
    END,
    max_workload = 40,
    hourly_rate = CASE username
        WHEN 'admin' THEN 60.00
        WHEN 'user1' THEN 45.00
        WHEN 'user2' THEN 42.00
        WHEN 'manager1' THEN 50.00
        ELSE 35.00
    END,
    department = CASE username
        WHEN 'admin' THEN 'Management'
        WHEN 'user1' THEN 'Development'
        WHEN 'user2' THEN 'Development'
        WHEN 'manager1' THEN 'Project Management'
        ELSE 'General'
    END,
    position = CASE username
        WHEN 'admin' THEN 'System Administrator'
        WHEN 'user1' THEN 'Backend Developer'
        WHEN 'user2' THEN 'Frontend Developer'
        WHEN 'manager1' THEN 'Project Manager'
        ELSE 'Employee'
    END
WHERE username IN ('admin', 'user1', 'user2', 'manager1');

-- Insert additional users for better testing (with conflict handling)
INSERT INTO users (username, email, password, first_name, last_name, role, skills, current_workload, max_workload, hourly_rate, department, position, status) VALUES
('john.doe', 'john.doe@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe', 'USER', 
 '["Java", "Spring Boot", "Microservices", "API Development"]'::jsonb, 20, 40, 45.00, 'Development', 'Senior Developer', 'ACTIVE'),

('jane.smith', 'jane.smith@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jane', 'Smith', 'USER', 
 '["React", "Vue.js", "UI/UX Design", "Frontend Development"]'::jsonb, 25, 40, 40.00, 'Development', 'Frontend Specialist', 'ACTIVE'),

('mike.wilson', 'mike.wilson@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Mike', 'Wilson', 'USER', 
 '["PostgreSQL", "Database Design", "Backend Development", "API Development"]'::jsonb, 15, 40, 42.00, 'Development', 'Database Developer', 'ACTIVE'),

('sarah.lee', 'sarah.lee@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Sarah', 'Lee', 'USER', 
 '["Testing", "Quality Assurance", "Automation", "Documentation"]'::jsonb, 18, 40, 38.00, 'QA', 'QA Engineer', 'ACTIVE')
ON CONFLICT (username) DO UPDATE SET
    skills = EXCLUDED.skills,
    current_workload = EXCLUDED.current_workload,
    max_workload = EXCLUDED.max_workload,
    hourly_rate = EXCLUDED.hourly_rate,
    department = EXCLUDED.department,
    position = EXCLUDED.position,
    status = EXCLUDED.status;

-- Update existing projects with additional information
UPDATE projects SET 
    actual_cost = CASE name
        WHEN 'Website Redesign' THEN 35000.00
        WHEN 'Mobile App Development' THEN 25000.00
        WHEN 'Database Migration' THEN 15000.00
        WHEN 'Marketing Campaign' THEN 5000.00
        ELSE 0.00
    END,
    client_name = CASE name
        WHEN 'Website Redesign' THEN 'Internal Project'
        WHEN 'Mobile App Development' THEN 'TechCorp Ltd'
        WHEN 'Database Migration' THEN 'Internal Project'
        WHEN 'Marketing Campaign' THEN 'StartupXYZ'
        ELSE 'Unknown'
    END,
    estimated_hours = CASE name
        WHEN 'Website Redesign' THEN 500
        WHEN 'Mobile App Development' THEN 800
        WHEN 'Database Migration' THEN 200
        WHEN 'Marketing Campaign' THEN 300
        ELSE 100
    END,
    manager_id = owner_id
WHERE name IN ('Website Redesign', 'Mobile App Development', 'Database Migration', 'Marketing Campaign');

-- Insert additional project for testing
INSERT INTO projects (name, description, status, priority, start_date, end_date, budget, actual_cost, progress_percentage, manager_id, client_name, estimated_hours, owner_id, color_code) 
SELECT 'E-commerce Platform', 'Modern e-commerce platform with advanced analytics', 'PLANNING', 'HIGH', 
       '2024-03-01', '2024-12-31', 300000.00, 25000.00, 