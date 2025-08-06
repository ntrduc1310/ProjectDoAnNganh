package com.doananganh.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskCommentRequest {
    @NotNull(message = "Task ID is required")
    private Long taskId;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    // Constructors
    public CreateTaskCommentRequest() {}
    
    // Getters and Setters
    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
