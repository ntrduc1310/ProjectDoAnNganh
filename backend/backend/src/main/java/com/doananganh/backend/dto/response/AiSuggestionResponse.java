package com.doananganh.backend.dto.response;

import java.time.LocalDateTime;

public class AiSuggestionResponse {
    private Long id;
    private String type;
    private String description;
    private Double confidenceScore;
    private String status;
    private LocalDateTime createdAt;

    public AiSuggestionResponse() {}

    public AiSuggestionResponse(Long id, String type, String description, Double confidenceScore, String status, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.confidenceScore = confidenceScore;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}