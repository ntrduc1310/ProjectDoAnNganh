package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"})
public class TaskController {
    
    private final List<Map<String, Object>> tasks = Collections.synchronizedList(new ArrayList<>());
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public TaskController() {
        // Thêm 3 tasks mẫu
        Map<String, Object> task1 = new HashMap<>();
        task1.put("id", idGenerator.getAndIncrement());
        task1.put("title", "Thiết kế giao diện người dùng");
        task1.put("description", "Tạo mockup và prototype cho ứng dụng");
        task1.put("status", "IN_PROGRESS");
        task1.put("priority", "HIGH");
        task1.put("assigneeId", 1L);
        task1.put("projectId", 1L);
        task1.put("dueDate", "2024-02-15");
        tasks.add(task1);
        
        Map<String, Object> task2 = new HashMap<>();
        task2.put("id", idGenerator.getAndIncrement());
        task2.put("title", "Phát triển API backend");
        task2.put("description", "Tạo REST API cho quản lý tasks");
        task2.put("status", "TODO");
        task2.put("priority", "MEDIUM");
        task2.put("assigneeId", 2L);
        task2.put("projectId", 1L);
        task2.put("dueDate", "2024-02-20");
        tasks.add(task2);
        
        Map<String, Object> task3 = new HashMap<>();
        task3.put("id", idGenerator.getAndIncrement());
        task3.put("title", "Viết test cases");
        task3.put("description", "Tạo unit tests và integration tests");
        task3.put("status", "COMPLETED");
        task3.put("priority", "LOW");
        task3.put("assigneeId", 3L);
        task3.put("projectId", 1L);
        task3.put("dueDate", "2024-02-10");
        tasks.add(task3);
        
        System.out.println("✅ TaskController initialized with " + tasks.size() + " sample tasks");
    }
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllTasks() {
        System.out.println("🔍 GET /api/tasks - Returning " + tasks.size() + " tasks");
        return ResponseEntity.ok(tasks);
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTask(@RequestBody Map<String, Object> taskData) {
        System.out.println("➕ POST /api/tasks - Creating new task: " + taskData);
        
        Map<String, Object> newTask = new HashMap<>();
        newTask.put("id", idGenerator.getAndIncrement());
        newTask.put("title", taskData.get("title"));
        newTask.put("description", taskData.get("description"));
        newTask.put("status", taskData.getOrDefault("status", "TODO"));
        newTask.put("priority", taskData.getOrDefault("priority", "MEDIUM"));
        newTask.put("assigneeId", taskData.get("assigneeId"));
        newTask.put("projectId", taskData.getOrDefault("projectId", 1L));
        newTask.put("dueDate", taskData.get("dueDate"));
        
        tasks.add(newTask);
        
        System.out.println("✅ Task created with ID: " + newTask.get("id"));
        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getTaskById(@PathVariable Long id) {
        System.out.println("🔍 GET /api/tasks/" + id);
        
        return tasks.stream()
                .filter(task -> Objects.equals(task.get("id"), id))
                .findFirst()
                .map(task -> ResponseEntity.ok(task))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateTask(@PathVariable Long id, @RequestBody Map<String, Object> taskData) {
        System.out.println("📝 PUT /api/tasks/" + id + " - Updating task: " + taskData);
        
        for (int i = 0; i < tasks.size(); i++) {
            Map<String, Object> task = tasks.get(i);
            if (Objects.equals(task.get("id"), id)) {
                task.put("title", taskData.getOrDefault("title", task.get("title")));
                task.put("description", taskData.getOrDefault("description", task.get("description")));
                task.put("status", taskData.getOrDefault("status", task.get("status")));
                task.put("priority", taskData.getOrDefault("priority", task.get("priority")));
                task.put("assigneeId", taskData.getOrDefault("assigneeId", task.get("assigneeId")));
                task.put("dueDate", taskData.getOrDefault("dueDate", task.get("dueDate")));
                
                System.out.println("✅ Task updated: " + task);
                return ResponseEntity.ok(task);
            }
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        System.out.println("🗑️ DELETE /api/tasks/" + id);
        
        boolean removed = tasks.removeIf(task -> Objects.equals(task.get("id"), id));
        
        if (removed) {
            System.out.println("✅ Task deleted successfully");
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
