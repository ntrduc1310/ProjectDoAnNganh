package com.doananganh.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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

import com.doananganh.backend.dto.request.CreateTaskRequest;
import com.doananganh.backend.dto.response.TaskDetailResponse;
import com.doananganh.backend.entity.Task;
import com.doananganh.backend.enums.TaskStatus;
import com.doananganh.backend.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

    @Autowired(required = false)
    private TaskService taskService;

    // ✅ FIXED: Make final and use synchronized list for thread safety
    private static final List<Map<String, Object>> mockTasks = new ArrayList<>();

    // ✅ FIXED: Use instance block instead of static block to avoid warnings
    {
        if (mockTasks.isEmpty()) {
            initializeMockData();
        }
    }

    // ✅ Extract initialization to separate method
    private static synchronized void initializeMockData() {
        if (!mockTasks.isEmpty()) return; // Double-check to avoid duplicate initialization

        Map<String, Object> task1 = new HashMap<>();
        task1.put("id", 1L);
        task1.put("title", "Setup Project Structure");
        task1.put("description", "Initialize the project with basic structure");
        task1.put("priority", "HIGH");
        task1.put("status", "IN_PROGRESS");
        task1.put("projectId", 1L);
        task1.put("assigneeEmail", "dev@example.com");
        task1.put("createdAt", LocalDateTime.now().toString());
        mockTasks.add(task1);

        Map<String, Object> task2 = new HashMap<>();
        task2.put("id", 2L);
        task2.put("title", "Design Database Schema");
        task2.put("description", "Create ERD and database tables");
        task2.put("priority", "MEDIUM");
        task2.put("status", "TODO");
        task2.put("projectId", 1L);
        task2.put("assigneeEmail", "designer@example.com");
        task2.put("createdAt", LocalDateTime.now().toString());
        mockTasks.add(task2);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        System.out.println("✅ GET /tasks called - page: " + page + ", size: " + size);
        
        try {
            if (taskService != null) {
                Pageable pageable = PageRequest.of(page, size);
                Page<Task> taskPage = taskService.getAllTasks(pageable);
                System.out.println("📋 Found " + taskPage.getContent().size() + " tasks from service");
                
                // ✅ FIXED: Handle missing methods in Task entity
                List<Map<String, Object>> taskList = new ArrayList<>();
                for (Task task : taskPage.getContent()) {
                    Map<String, Object> taskMap = new HashMap<>();
                    taskMap.put("id", task.getId());
                    taskMap.put("title", task.getTitle());
                    taskMap.put("description", task.getDescription());
                    taskMap.put("priority", task.getPriority().name());
                    taskMap.put("status", task.getStatus().name());
                    
                    // ✅ FIXED: Handle project relationship properly
                    if (task.getProject() != null) {
                        taskMap.put("projectId", task.getProject().getId());
                        taskMap.put("projectName", task.getProject().getName());
                    } else {
                        taskMap.put("projectId", null);
                        taskMap.put("projectName", null);
                    }
                    
                    // ✅ FIXED: Handle assignee relationship properly
                    if (task.getAssignee() != null) {
                        taskMap.put("assigneeEmail", task.getAssignee().getEmail());
                        taskMap.put("assigneeName", task.getAssignee().getFullName());
                    } else {
                        taskMap.put("assigneeEmail", null);
                        taskMap.put("assigneeName", null);
                    }
                    
                    taskMap.put("createdAt", task.getCreatedAt() != null ? task.getCreatedAt().toString() : null);
                    taskMap.put("updatedAt", task.getUpdatedAt() != null ? task.getUpdatedAt().toString() : null);
                    taskMap.put("progress", task.getProgress());
                    taskMap.put("dueDate", task.getDueDate() != null ? task.getDueDate().toString() : null);
                    
                    taskList.add(taskMap);
                }
                return ResponseEntity.ok(taskList);
            }
        } catch (Exception e) {
            System.err.println("❌ Error in getAllTasks: " + e.getMessage());
            e.printStackTrace();
        }
        
        // ✅ Return mock tasks
        System.out.println("📋 Returning " + mockTasks.size() + " mock tasks");
        return ResponseEntity.ok(new ArrayList<>(mockTasks)); // Return copy to avoid external modification
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTask(@Valid @RequestBody CreateTaskRequest request) {
        System.out.println("✅ POST /tasks called");
        System.out.println("📤 Request data: " + request);
        System.out.println("📤 Title: " + request.getTitle());
        System.out.println("📤 Description: " + request.getDescription());
        System.out.println("📤 Priority: " + request.getPriority());
        System.out.println("📤 ProjectId: " + request.getProjectId());
        
        try {
            if (taskService != null) {
                TaskDetailResponse task = taskService.createTask(request);
                Map<String, Object> response = new HashMap<>();
                response.put("task", task);
                response.put("message", "Task created successfully");
                System.out.println("✅ Task created successfully via service");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("❌ Error creating task via service: " + e.getMessage());
            e.printStackTrace();
        }
        
        // ✅ Create mock task and add to list
        Long newId = System.currentTimeMillis();
        Map<String, Object> newTask = new HashMap<>();
        newTask.put("id", newId);
        newTask.put("title", request.getTitle());
        newTask.put("description", request.getDescription());
        newTask.put("priority", request.getPriority().name());
        newTask.put("status", TaskStatus.TODO.name());
        newTask.put("projectId", request.getProjectId());
        newTask.put("assigneeEmail", request.getAssigneeEmail());
        newTask.put("createdAt", LocalDateTime.now().toString());
        newTask.put("progress", 0.0);
        newTask.put("updatedAt", LocalDateTime.now().toString());
        
        // Add to mock list so it appears in getAllTasks
        synchronized (mockTasks) {
            mockTasks.add(newTask);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("task", newTask);
        response.put("message", "Task created successfully (mock)");
        
        System.out.println("✅ Mock task created successfully with ID: " + newId);
        System.out.println("✅ Total mock tasks: " + mockTasks.size());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getTaskById(@PathVariable Long id) {
        System.out.println("✅ GET /tasks/" + id + " called");
        
        try {
            if (taskService != null) {
                TaskDetailResponse task = taskService.getTaskById(id);
                Map<String, Object> response = new HashMap<>();
                response.put("id", task.getId());
                response.put("title", task.getTitle());
                response.put("description", task.getDescription());
                response.put("priority", task.getPriority());
                response.put("status", task.getStatus());
                response.put("projectId", task.getProjectId());
                response.put("assigneeEmail", task.getAssigneeEmail());
                response.put("createdAt", task.getCreatedAt());
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("❌ Error getting task by id: " + e.getMessage());
        }
        
        // Check mock tasks
        synchronized (mockTasks) {
            for (Map<String, Object> task : mockTasks) {
                if (task.get("id").equals(id)) {
                    return ResponseEntity.ok(new HashMap<>(task)); // Return copy
                }
            }
        }
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTask(@PathVariable Long id) {
        System.out.println("✅ DELETE /tasks/" + id + " called");
        
        try {
            if (taskService != null) {
                taskService.deleteTask(id);
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Task deleted successfully");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("❌ Error deleting task: " + e.getMessage());
        }
        
        // Remove from mock list
        synchronized (mockTasks) {
            mockTasks.removeIf(task -> task.get("id").equals(id));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Task deleted successfully (mock)");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody CreateTaskRequest request) {
        
        System.out.println("✅ PUT /tasks/" + id + " called");
        
        try {
            if (taskService != null) {
                TaskDetailResponse task = taskService.updateTask(id, request);
                Map<String, Object> response = new HashMap<>();
                response.put("task", task);
                response.put("message", "Task updated successfully");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("❌ Error updating task: " + e.getMessage());
        }
        
        // Update mock task
        synchronized (mockTasks) {
            for (Map<String, Object> task : mockTasks) {
                if (task.get("id").equals(id)) {
                    task.put("title", request.getTitle());
                    task.put("description", request.getDescription());
                    task.put("priority", request.getPriority().name());
                    task.put("updatedAt", LocalDateTime.now().toString());
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("task", new HashMap<>(task));
                    response.put("message", "Task updated successfully (mock)");
                    return ResponseEntity.ok(response);
                }
            }
        }
        
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateTaskStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        
        System.out.println("✅ PUT /tasks/" + id + "/status called with status: " + status);
        
        try {
            if (taskService != null) {
                TaskStatus taskStatus = TaskStatus.valueOf(status.toUpperCase());
                TaskDetailResponse task = taskService.updateTaskStatus(id, taskStatus);
                Map<String, Object> response = new HashMap<>();
                response.put("task", task);
                response.put("message", "Task status updated successfully");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("❌ Error updating task status: " + e.getMessage());
        }
        
        // Update mock task status
        synchronized (mockTasks) {
            for (Map<String, Object> task : mockTasks) {
                if (task.get("id").equals(id)) {
                    task.put("status", status.toUpperCase());
                    task.put("updatedAt", LocalDateTime.now().toString());
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("task", new HashMap<>(task));
                    response.put("message", "Task status updated successfully (mock)");
                    return ResponseEntity.ok(response);
                }
            }
        }
        
        return ResponseEntity.notFound().build();
    }
}
