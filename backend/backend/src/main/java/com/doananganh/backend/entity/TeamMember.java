package com.doananganh.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_members")
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private String name;
    private String role; // DEVELOPER, DESIGNER, TESTER, ...

    private Integer workloadCapacity;
    private Double workloadPercentage;
    private String skills; // Có thể lưu dạng CSV hoặc chuyển sang bảng riêng nếu cần

    private LocalDateTime joinedAt;

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Integer getWorkloadCapacity() { return workloadCapacity; }
    public void setWorkloadCapacity(Integer workloadCapacity) { this.workloadCapacity = workloadCapacity; }

    public Double getWorkloadPercentage() { return workloadPercentage; }
    public void setWorkloadPercentage(Double workloadPercentage) { this.workloadPercentage = workloadPercentage; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
}
