package com.doananganh.backend.dto.request;

import java.time.LocalDateTime;

import com.doananganh.backend.enums.TaskPriority;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskRequest {
    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;

    private String description;

    @NotNull(message = "Độ ưu tiên không được để trống")
    private TaskPriority priority;

    @NotNull(message = "Project ID không được để trống")
    private Long projectId;

    private String assigneeEmail; // Sử dụng email thay vì ID

    @Min(value = 1, message = "Số giờ ước tính phải là số dương")
    private Integer estimatedHours;

    private LocalDateTime dueDate;

    // Constructors
    public CreateTaskRequest() {}

    // Getter & Setter
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskPriority getPriority() { return priority; }
    public void setPriority(TaskPriority priority) { this.priority = priority; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getAssigneeEmail() { return assigneeEmail; }
    public void setAssigneeEmail(String assigneeEmail) { this.assigneeEmail = assigneeEmail; }

    public Integer getEstimatedHours() { return estimatedHours; }
    public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
}
