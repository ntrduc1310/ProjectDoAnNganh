package com.doananganh.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "task_dependencies")
public class TaskDependency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prerequisite_task_id", nullable = false)
    private Task prerequisiteTask;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dependent_task_id", nullable = false)
    private Task dependentTask;

    @Column(name = "dependency_type", length = 20)
    @Enumerated(EnumType.STRING)
    private DependencyType dependencyType = DependencyType.FINISH_TO_START;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum DependencyType {
        FINISH_TO_START,
        START_TO_START,
        FINISH_TO_FINISH,
        START_TO_FINISH
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public TaskDependency() {}

    public TaskDependency(Task prerequisiteTask, Task dependentTask, DependencyType dependencyType) {
        this.prerequisiteTask = prerequisiteTask;
        this.dependentTask = dependentTask;
        this.dependencyType = dependencyType;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Task getPrerequisiteTask() { return prerequisiteTask; }
    public void setPrerequisiteTask(Task prerequisiteTask) { this.prerequisiteTask = prerequisiteTask; }

    public Task getDependentTask() { return dependentTask; }
    public void setDependentTask(Task dependentTask) { this.dependentTask = dependentTask; }

    public DependencyType getDependencyType() { return dependencyType; }
    public void setDependencyType(DependencyType dependencyType) { this.dependencyType = dependencyType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @Override
    public String toString() {
        return "TaskDependency{" +
                "id=" + id +
                ", dependencyType=" + dependencyType +
                ", createdAt=" + createdAt +
                '}';
    }
}
