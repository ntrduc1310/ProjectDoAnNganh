package com.doananganh.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_members")
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email")
    private String userEmail;

    private String name;

    private String role; // DEVELOPER, DESIGNER, TESTER, MANAGER, etc.

    @Column(name = "workload_capacity")
    private Integer workloadCapacity;

    @Column(name = "current_workload")
    private Integer currentWorkload;

    @Column(name = "workload_percentage")
    private Double workloadPercentage;

    @Column(name = "efficiency_score")
    private Double efficiencyScore;

    @Column(name = "availability_status")
    private String availabilityStatus; // AVAILABLE, BUSY, UNAVAILABLE

    private String skills;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @PrePersist
    protected void onCreate() {
        if (joinedAt == null) joinedAt = LocalDateTime.now();
        if (workloadCapacity == null) workloadCapacity = 40;
        if (currentWorkload == null) currentWorkload = 0;
        if (workloadPercentage == null) workloadPercentage = 0.0;
        if (efficiencyScore == null) efficiencyScore = 75.0;
        if (availabilityStatus == null) availabilityStatus = "AVAILABLE";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Integer getWorkloadCapacity() { return workloadCapacity; }
    public void setWorkloadCapacity(Integer workloadCapacity) { this.workloadCapacity = workloadCapacity; }

    public Integer getCurrentWorkload() { return currentWorkload; }
    public void setCurrentWorkload(Integer currentWorkload) { this.currentWorkload = currentWorkload; }

    public Double getWorkloadPercentage() { return workloadPercentage; }
    public void setWorkloadPercentage(Double workloadPercentage) { this.workloadPercentage = workloadPercentage; }

    public Double getEfficiencyScore() { return efficiencyScore; }
    public void setEfficiencyScore(Double efficiencyScore) { this.efficiencyScore = efficiencyScore; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
}
