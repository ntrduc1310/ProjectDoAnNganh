package com.doananganh.backend.dto;

import com.doananganh.backend.entity.Task;

public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private String priority;
    private String status;
    private Integer estimatedHours;
    private Integer actualHours;
    private Integer completionPercentage;
    private String assigneeEmail;
    private Long projectId;

    // Constructors
    public TaskDto() {}

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Integer getEstimatedHours() { return estimatedHours; }
    public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }
    
    public Integer getActualHours() { return actualHours; }
    public void setActualHours(Integer actualHours) { this.actualHours = actualHours; }
    
    public Integer getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(Integer completionPercentage) { this.completionPercentage = completionPercentage; }
    
    public String getAssigneeEmail() { return assigneeEmail; }
    public void setAssigneeEmail(String assigneeEmail) { this.assigneeEmail = assigneeEmail; }
    
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    // Static factory method - FIXED VERSION
    public static TaskDto fromEntity(Task entity) {
        TaskDto dto = new TaskDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        
        // ✅ FIX: Convert enum to string
        dto.setPriority(entity.getPriority() != null ? entity.getPriority().name() : null);
        dto.setStatus(entity.getStatus() != null ? entity.getStatus().name() : null);
        
        dto.setEstimatedHours(entity.getEstimatedHours());
        dto.setActualHours(entity.getActualHours());
        
        // ✅ FIX: Calculate completion percentage from progress
        if (entity.getProgress() != null) {
            dto.setCompletionPercentage(entity.getProgress().intValue());
        } else {
            dto.setCompletionPercentage(0);
        }
        
        // ✅ FIX: Get assignee email through relationship
        if (entity.getAssignee() != null) {
            dto.setAssigneeEmail(entity.getAssignee().getEmail());
        }
        
        // ✅ FIX: Get project ID through relationship
        if (entity.getProject() != null) {
            dto.setProjectId(entity.getProject().getId());
        }
        
        return dto;
    }
    
    // Helper method to get display values
    public String getPriorityDisplay() {
        if (priority == null) return "MEDIUM";
        try {
            return com.doananganh.backend.enums.TaskPriority.valueOf(priority).getDisplayName();
        } catch (Exception e) {
            return priority;
        }
    }
    
    public String getStatusDisplay() {
        if (status == null) return "TODO";
        try {
            return com.doananganh.backend.enums.TaskStatus.valueOf(status).getDisplayName();
        } catch (Exception e) {
            return status;
        }
    }
}
