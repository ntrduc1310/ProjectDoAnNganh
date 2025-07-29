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

    public static TaskDto fromEntity(Task entity) {
        TaskDto dto = new TaskDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setPriority(entity.getPriority());
        dto.setStatus(entity.getStatus());
        dto.setEstimatedHours(entity.getEstimatedHours());
        dto.setActualHours(entity.getActualHours());
        dto.setCompletionPercentage(null); // hoặc tính toán nếu có
        dto.setAssigneeEmail(entity.getAssigneeEmail());
        dto.setProjectId(entity.getProjectId());
        return dto;
    }
}
