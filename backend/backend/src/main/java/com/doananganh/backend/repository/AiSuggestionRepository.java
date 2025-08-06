package com.doananganh.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.AiSuggestion;

@Repository
public interface AiSuggestionRepository extends JpaRepository<AiSuggestion, Long> {
    
    List<AiSuggestion> findByStatus(String status);
    
    List<AiSuggestion> findByType(String type);
    
    List<AiSuggestion> findByProjectId(Long projectId);
    
    @Query("SELECT ai FROM AiSuggestion ai WHERE ai.confidenceScore >= :threshold ORDER BY ai.confidenceScore DESC")
    List<AiSuggestion> findHighConfidenceSuggestions(@Param("threshold") Double threshold);
}
