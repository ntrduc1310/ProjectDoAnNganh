package com.doananganh.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doananganh.backend.dto.request.CreateTaskCommentRequest;
import com.doananganh.backend.dto.response.TaskCommentResponse;
import com.doananganh.backend.service.TaskCommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/task-comments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "http://localhost:5175", "http://localhost:5176"})
public class TaskCommentController {
    
    @Autowired
    private TaskCommentService taskCommentService;
    
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskCommentResponse>> getCommentsByTask(@PathVariable Long taskId) {
        try {
            List<TaskCommentResponse> comments = taskCommentService.getCommentsByTask(taskId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            System.err.println("❌ Error getting comments: " + e.getMessage());
            return ResponseEntity.ok(List.of()); // Return empty list on error
        }
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createComment(
            @Valid @RequestBody CreateTaskCommentRequest request,
            @RequestHeader(value = "User-Email", defaultValue = "admin@example.com") String userEmail) {
        try {
            TaskCommentResponse comment = taskCommentService.createComment(request, userEmail);
            Map<String, Object> response = new HashMap<>();
            response.put("comment", comment);
            response.put("message", "Comment created successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to create comment: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{commentId}")
    public ResponseEntity<Map<String, Object>> updateComment(
            @PathVariable Long commentId,
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "User-Email", defaultValue = "admin@example.com") String userEmail) {
        try {
            String newContent = request.get("content");
            if (newContent == null || newContent.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Content is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            TaskCommentResponse comment = taskCommentService.updateComment(commentId, newContent, userEmail);
            Map<String, Object> response = new HashMap<>();
            response.put("comment", comment);
            response.put("message", "Comment updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to update comment: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Map<String, Object>> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader(value = "User-Email", defaultValue = "admin@example.com") String userEmail) {
        try {
            taskCommentService.deleteComment(commentId, userEmail);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Comment deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to delete comment: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<TaskCommentResponse>> getRecentComments(
            @RequestParam(defaultValue = "24") int hours) {
        try {
            List<TaskCommentResponse> comments = taskCommentService.getRecentComments(hours);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            System.err.println("❌ Error getting recent comments: " + e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }
    
    @GetMapping("/count/{taskId}")
    public ResponseEntity<Map<String, Object>> getCommentCount(@PathVariable Long taskId) {
        try {
            Long count = taskCommentService.getCommentCount(taskId);
            Map<String, Object> response = new HashMap<>();
            response.put("taskId", taskId);
            response.put("commentCount", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to get comment count: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
