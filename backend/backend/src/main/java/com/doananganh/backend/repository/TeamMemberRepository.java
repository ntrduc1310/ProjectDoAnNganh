package com.doananganh.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.TeamMember;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    
    Optional<TeamMember> findByUserEmail(String userEmail);
    
    List<TeamMember> findByRole(String role);
    
    List<TeamMember> findByAvailabilityStatus(String status);
    
    @Query("SELECT tm FROM TeamMember tm WHERE tm.workloadPercentage < :threshold")
    List<TeamMember> findAvailableMembers(@Param("threshold") Double threshold);
    
    @Query("SELECT AVG(tm.workloadPercentage) FROM TeamMember tm")
    Double getAverageWorkload();
}