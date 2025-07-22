package com.doananganh.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.Objects;

public class AssignTaskRequest {
    
    @NotNull(message = "Task ID không được để trống")
    @Positive(message = "Task ID phải là số dương")
    private Long taskId;
    
    @NotNull(message = "Team Member ID không được để trống")
    @Positive(message = "Team Member ID phải là số dương")
    private Long teamMemberId;
    
    private String assignmentNote;
    private Integer priority; // 1-5
    private String dueDate; // ISO format

    // Constructors
    public AssignTaskRequest() {}

    public AssignTaskRequest(Long taskId, Long teamMemberId, String assignmentNote, Integer priority, String dueDate) {
        this.taskId = taskId;
        this.teamMemberId = teamMemberId;
        this.assignmentNote = assignmentNote;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    // Builder pattern thủ công
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final AssignTaskRequest request = new AssignTaskRequest(); // FIX: Added final

        public Builder taskId(Long taskId) {
            request.taskId = taskId;
            return this;
        }

        public Builder teamMemberId(Long teamMemberId) {
            request.teamMemberId = teamMemberId;
            return this;
        }

        public Builder assignmentNote(String assignmentNote) {
            request.assignmentNote = assignmentNote;
            return this;
        }

        public Builder priority(Integer priority) {
            request.priority = priority;
            return this;
        }

        public Builder dueDate(String dueDate) {
            request.dueDate = dueDate;
            return this;
        }

        public AssignTaskRequest build() {
            // Validation logic
            if (request.priority != null && (request.priority < 1 || request.priority > 5)) {
                throw new IllegalArgumentException("Priority phải từ 1-5");
            }
            return request;
        }
    }

    // Getters
    public Long getTaskId() {
        return taskId;
    }

    public Long getTeamMemberId() {
        return teamMemberId;
    }

    public String getAssignmentNote() {
        return assignmentNote;
    }

    public Integer getPriority() {
        return priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    // Setters
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public void setTeamMemberId(Long teamMemberId) {
        this.teamMemberId = teamMemberId;
    }

    public void setAssignmentNote(String assignmentNote) {
        this.assignmentNote = assignmentNote;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    // toString
    @Override
    public String toString() {
        return "AssignTaskRequest{" +
                "taskId=" + taskId +
                ", teamMemberId=" + teamMemberId +
                ", assignmentNote='" + assignmentNote + '\'' +
                ", priority=" + priority +
                ", dueDate='" + dueDate + '\'' +
                '}';
    }

    // equals and hashCode - FIX: Sử dụng Objects.equals() thay vì null checks thủ công
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        AssignTaskRequest that = (AssignTaskRequest) o;
        
        return Objects.equals(taskId, that.taskId) &&
               Objects.equals(teamMemberId, that.teamMemberId) &&
               Objects.equals(assignmentNote, that.assignmentNote) &&
               Objects.equals(priority, that.priority) &&
               Objects.equals(dueDate, that.dueDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId, teamMemberId, assignmentNote, priority, dueDate);
    }
}
