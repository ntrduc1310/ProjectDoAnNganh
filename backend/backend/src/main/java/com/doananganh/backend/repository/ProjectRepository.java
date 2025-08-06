package com.doananganh.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByStatus(String status);
    
    List<Project> findByManagerEmail(String managerEmail);
    
    List<Project> findByPriority(String priority);
    
    @Query("SELECT p FROM Project p WHERE p.status = :status AND p.priority = :priority")
    List<Project> findByStatusAndPriority(@Param("status") String status, @Param("priority") String priority);
    
    @Query("SELECT p FROM Project p WHERE p.progress < :threshold")
    List<Project> findProjectsBelowProgress(@Param("threshold") Double threshold);
}
