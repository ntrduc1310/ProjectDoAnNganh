package com.doananganh.backend.dto.response;

import java.time.LocalDateTime;

import com.doananganh.backend.entity.TaskComment;

public class TaskCommentResponse {
    private Long id;
    private Long taskId;
    private String taskTitle;
    private Long userId;
    private String userFullName;
    private String userEmail;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public TaskCommentResponse() {}
    
    // Static factory method
    public static TaskCommentResponse fromEntity(TaskComment comment) {
        TaskCommentResponse response = new TaskCommentResponse();
        response.setId(comment.getId());
        response.setContent(comment.getContent());
        response.setCreatedAt(comment.getCreatedAt());
        response.setUpdatedAt(comment.getUpdatedAt());
        
        // Task info
        if (comment.getTask() != null) {
            response.setTaskId(comment.getTask().getId());
            response.setTaskTitle(comment.getTask().getTitle());
        }
        
        // User info
        if (comment.getUser() != null) {
            response.setUserId(comment.getUser().getId());
            response.setUserFullName(comment.getUser().getFullName());
            response.setUserEmail(comment.getUser().getEmail());
        }
        
        return response;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }
    
    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
