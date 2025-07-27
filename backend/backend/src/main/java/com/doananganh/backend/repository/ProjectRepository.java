package com.doananganh.backend.repository;

import com.doananganh.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByManagerEmail(String email);
    List<Project> findByStatus(String status);
}
