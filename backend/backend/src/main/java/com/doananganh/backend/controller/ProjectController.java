package com.doananganh.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
@Tag(name = "Project Management", description = "Project and task management endpoints")
public class ProjectController {
    
    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            Authentication auth) {
        
        // Mock paginated projects response
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> projects = new ArrayList<>();
        
        // Project 1
        Map<String, Object> project1 = new HashMap<>();
        project1.put("id", 1L);
        project1.put("name", "E-commerce Platform Development");
        project1.put("description", "Build modern e-commerce platform with microservices");
        project1.put("status", "IN_PROGRESS");
        project1.put("progress", 75.5);
        project1.put("startDate", "2025-06-01");
        project1.put("endDate", "2025-08-15");
        project1.put("teamSize", 8);
        project1.put("manager", "Nguyễn Văn Manager");
        project1.put("priority", "HIGH");
        project1.put("updatedAt", LocalDateTime.now().minusDays(1));
        projects.add(project1);
        
        // Project 2
        Map<String, Object> project2 = new HashMap<>();
        project2.put("id", 2L);
        project2.put("name", "Mobile App Development");
        project2.put("description", "Cross-platform mobile application using React Native");
        project2.put("status", "IN_PROGRESS");
        project2.put("progress", 45.2);
        project2.put("startDate", "2025-07-01");
        project2.put("endDate", "2025-09-30");
        project2.put("teamSize", 6);
        project2.put("manager", "Trần Thị Leader");
        project2.put("priority", "MEDIUM");
        project2.put("updatedAt", LocalDateTime.now().minusHours(5));
        projects.add(project2);
        
        // Project 3
        Map<String, Object> project3 = new HashMap<>();
        project3.put("id", 3L);
        project3.put("name", "Data Analytics Dashboard");
        project3.put("description", "Real-time analytics dashboard for business intelligence");
        project3.put("status", "COMPLETED");
        project3.put("progress", 100.0);
        project3.put("startDate", "2025-05-01");
        project3.put("endDate", "2025-07-20");
        project3.put("teamSize", 4);
        project3.put("manager", "Lê Văn Analyst");
        project3.put("priority", "HIGH");
        project3.put("updatedAt", LocalDateTime.now().minusDays(7));
        projects.add(project3);
        
        // Filter by status if provided
        if (status != null && !status.isEmpty()) {
            projects = projects.stream()
                .filter(p -> status.equals(p.get("status")))
                .toList();
        }
        
        // Filter by search if provided
        if (search != null && !search.isEmpty()) {
            projects = projects.stream()
                .filter(p -> ((String) p.get("name")).toLowerCase().contains(search.toLowerCase()))
                .toList();
        }
        
        response.put("content", projects);
        response.put("totalElements", projects.size());
        response.put("totalPages", 1);
        response.put("currentPage", page);
        response.put("pageSize", size);
        response.put("userEmail", auth.getName());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> createProject(
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        
        // Mock project creation
        Map<String, Object> project = new HashMap<>();
        project.put("id", System.currentTimeMillis()); // Mock ID
        project.put("name", request.get("name"));
        project.put("description", request.get("description"));
        project.put("status", "PLANNING");
        project.put("progress", 0.0);
        project.put("startDate", request.get("startDate"));
        project.put("endDate", request.get("endDate"));
        project.put("teamSize", 0);
        project.put("manager", auth.getName());
        project.put("priority", request.getOrDefault("priority", "MEDIUM"));
        project.put("createdAt", LocalDateTime.now());
        project.put("updatedAt", LocalDateTime.now());
        project.put("createdBy", auth.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }
    
    @GetMapping("/{projectId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getProjectDetail(
            @PathVariable Long projectId,
            Authentication auth) {
        
        // Mock project detail
        Map<String, Object> detail = new HashMap<>();
        detail.put("id", projectId);
        detail.put("name", "E-commerce Platform Development");
        detail.put("description", "Build modern e-commerce platform with microservices architecture");
        detail.put("status", "IN_PROGRESS");
        detail.put("progress", 75.5);
        detail.put("startDate", "2025-06-01");
        detail.put("endDate", "2025-08-15");
        detail.put("priority", "HIGH");
        detail.put("manager", "Nguyễn Văn Manager");
        detail.put("createdAt", LocalDateTime.now().minusMonths(2));
        detail.put("updatedAt", LocalDateTime.now().minusDays(1));
        
        // Team members
        List<Map<String, Object>> teamMembers = new ArrayList<>();
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("email", "a@example.com");
        member1.put("role", "DEVELOPER");
        member1.put("workload", 85.5);
        teamMembers.add(member1);
        
        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("email", "b@example.com");
        member2.put("role", "DESIGNER");
        member2.put("workload", 65.2);
        teamMembers.add(member2);
        
        detail.put("teamMembers", teamMembers);
        detail.put("teamSize", teamMembers.size());
        
        // Project statistics
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTasks", 45);
        stats.put("completedTasks", 34);
        stats.put("inProgressTasks", 8);
        stats.put("pendingTasks", 3);
        stats.put("completionRate", 75.5);
        detail.put("statistics", stats);
        
        return ResponseEntity.ok(detail);
    }
    
    @GetMapping("/{projectId}/tasks")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Map<String, Object>>> getProjectTasks(
            @PathVariable Long projectId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            Authentication auth) {
        
        List<Map<String, Object>> tasks = new ArrayList<>();
        
        // Task 1
        Map<String, Object> task1 = new HashMap<>();
        task1.put("id", 1L);
        task1.put("title", "Setup Database Schema");
        task1.put("description", "Design and implement database schema for user management");
        task1.put("status", "COMPLETED");
        task1.put("priority", "HIGH");
        task1.put("assignedTo", "Nguyễn Văn A");
        task1.put("assigneeEmail", "a@example.com");
        task1.put("estimatedHours", 16);
        task1.put("actualHours", 18);
        task1.put("progress", 100.0);
        task1.put("dueDate", "2025-07-25");
        task1.put("createdAt", LocalDateTime.now().minusWeeks(2));
        task1.put("updatedAt", LocalDateTime.now().minusDays(3));
        tasks.add(task1);
        
        // Task 2
        Map<String, Object> task2 = new HashMap<>();
        task2.put("id", 2L);
        task2.put("title", "Implement User Authentication");
        task2.put("description", "JWT-based authentication system with Spring Security");
        task2.put("status", "IN_PROGRESS");
        task2.put("priority", "HIGH");
        task2.put("assignedTo", "Trần Thị B");
        task2.put("assigneeEmail", "b@example.com");
        task2.put("estimatedHours", 24);
        task2.put("actualHours", 15);
        task2.put("progress", 65.0);
        task2.put("dueDate", "2025-07-30");
        task2.put("createdAt", LocalDateTime.now().minusWeeks(1));
        task2.put("updatedAt", LocalDateTime.now().minusHours(2));
        tasks.add(task2);
        
        // Task 3
        Map<String, Object> task3 = new HashMap<>();
        task3.put("id", 3L);
        task3.put("title", "Create API Documentation");
        task3.put("description", "Complete Swagger/OpenAPI documentation for all endpoints");
        task3.put("status", "TODO");
        task3.put("priority", "MEDIUM");
        task3.put("assignedTo", null);
        task3.put("assigneeEmail", null);
        task3.put("estimatedHours", 8);
        task3.put("actualHours", 0);
        task3.put("progress", 0.0);
        task3.put("dueDate", "2025-08-05");
        task3.put("createdAt", LocalDateTime.now().minusDays(3));
        task3.put("updatedAt", LocalDateTime.now().minusDays(3));
        tasks.add(task3);
        
        // Filter by status
        if (status != null && !status.isEmpty()) {
            tasks = tasks.stream()
                .filter(t -> status.equals(t.get("status")))
                .toList();
        }
        
        // Filter by priority
        if (priority != null && !priority.isEmpty()) {
            tasks = tasks.stream()
                .filter(t -> priority.equals(t.get("priority")))
                .toList();
        }
        
        return ResponseEntity.ok(tasks);
    }
    
    @PostMapping("/{projectId}/tasks")
    @PreAuthorize("hasAuthority('TEAM_LEAD')")
    public ResponseEntity<Map<String, Object>> createTask(
            @PathVariable Long projectId,
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        
        // Mock task creation
        Map<String, Object> task = new HashMap<>();
        task.put("id", System.currentTimeMillis()); // Mock ID
        task.put("projectId", projectId);
        task.put("title", request.get("title"));
        task.put("description", request.get("description"));
        task.put("status", "TODO");
        task.put("priority", request.getOrDefault("priority", "MEDIUM"));
        task.put("assignedTo", null);
        task.put("assigneeEmail", null);
        task.put("estimatedHours", request.get("estimatedHours"));
        task.put("actualHours", 0);
        task.put("progress", 0.0);
        task.put("dueDate", request.get("dueDate"));
        task.put("createdAt", LocalDateTime.now());
        task.put("updatedAt", LocalDateTime.now());
        task.put("createdBy", auth.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
    
    @PutMapping("/{projectId}/tasks/{taskId}/assign")
    @PreAuthorize("hasAuthority('TEAM_LEAD')")
    public ResponseEntity<Map<String, Object>> assignTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        
        // Mock task assignment
        Map<String, Object> assignment = new HashMap<>();
        assignment.put("taskId", taskId);
        assignment.put("projectId", projectId);
        assignment.put("assignedTo", request.get("assigneeId"));
        assignment.put("assigneeEmail", request.get("assigneeEmail"));
        assignment.put("assigneeName", request.get("assigneeName"));
        assignment.put("assignedAt", LocalDateTime.now());
        assignment.put("assignedBy", auth.getName());
        assignment.put("status", "ASSIGNED");
        assignment.put("message", "Task successfully assigned");
        
        // Mock notification
        Map<String, Object> notification = new HashMap<>();
        notification.put("type", "TASK_ASSIGNED");
        notification.put("title", "New Task Assigned");
        notification.put("message", "You have been assigned a new task: " + request.get("taskTitle"));
        notification.put("recipientEmail", request.get("assigneeEmail"));
        assignment.put("notification", notification);
        
        return ResponseEntity.ok(assignment);
    }
    
    @PutMapping("/{projectId}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        
        // Mock project update
        Map<String, Object> project = new HashMap<>();
        project.put("id", projectId);
        project.put("name", request.get("name"));
        project.put("description", request.get("description"));
        project.put("status", request.get("status"));
        project.put("priority", request.get("priority"));
        project.put("startDate", request.get("startDate"));
        project.put("endDate", request.get("endDate"));
        project.put("updatedAt", LocalDateTime.now());
        project.put("updatedBy", auth.getName());
        project.put("message", "Project updated successfully");
        
        return ResponseEntity.ok(project);
    }
    
    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> deleteProject(
            @PathVariable Long projectId,
            Authentication auth) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("projectId", projectId);
        response.put("status", "DELETED");
        response.put("message", "Project deleted successfully");
        response.put("deletedAt", LocalDateTime.now());
        response.put("deletedBy", auth.getName());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{projectId}/members")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Map<String, Object>>> getProjectMembers(
            @PathVariable Long projectId,
            Authentication auth) {
        
        List<Map<String, Object>> members = new ArrayList<>();
        
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("email", "a@example.com");
        member1.put("role", "DEVELOPER");
        member1.put("joinedAt", LocalDateTime.now().minusMonths(2));
        member1.put("workloadPercentage", 85.5);
        member1.put("activeTasks", 8);
        member1.put("completedTasks", 23);
        members.add(member1);
        
        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("email", "b@example.com");
        member2.put("role", "DESIGNER");
        member2.put("joinedAt", LocalDateTime.now().minusMonths(1));
        member2.put("workloadPercentage", 65.2);
        member2.put("activeTasks", 5);
        member2.put("completedTasks", 12);
        members.add(member2);
        
        return ResponseEntity.ok(members);
    }
    
    @PostMapping("/{projectId}/members")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> addProjectMember(
            @PathVariable Long projectId,
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("projectId", projectId);
        response.put("memberId", request.get("userId"));
        response.put("memberEmail", request.get("userEmail"));
        response.put("role", request.get("role"));
        response.put("addedAt", LocalDateTime.now());
        response.put("addedBy", auth.getName());
        response.put("status", "ADDED");
        response.put("message", "Member added to project successfully");
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
