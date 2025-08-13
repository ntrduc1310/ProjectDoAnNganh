package com.doananganh.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.Task;
import com.doananganh.backend.enums.TaskStatus;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Find by project
    Page<Task> findByProjectId(Long projectId, Pageable pageable);
    List<Task> findByProjectId(Long projectId);
    
    // Find by assignee
    Page<Task> findByAssignee_Id(Long assigneeId, Pageable pageable);
    List<Task> findByAssignee_Id(Long assigneeId);
    
    // Find by status
    Page<Task> findByStatus(TaskStatus status, Pageable pageable);
    List<Task> findByStatus(TaskStatus status);
    
    // Find by project and status
    Page<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status, Pageable pageable);
    
    // Find by assignee and status
    Page<Task> findByAssignee_IdAndStatus(Long assigneeId, TaskStatus status, Pageable pageable);
    
    // Custom queries
    @Query("SELECT t FROM Task t WHERE t.dueDate < :currentTime AND t.status != 'COMPLETED'")
    List<Task> findOverdueTasks(@Param("currentTime") LocalDateTime currentTime);
    
    @Query("SELECT t FROM Task t WHERE t.dueDate BETWEEN :startTime AND :endTime AND t.status != 'COMPLETED'")
    List<Task> findTasksDueBetween(@Param("startTime") LocalDateTime startTime, 
                                   @Param("endTime") LocalDateTime endTime);
    
    // Statistics queries
    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId")
    Long countByProjectId(@Param("projectId") Long projectId);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId AND t.status = :status")
    Long countByProjectIdAndStatus(@Param("projectId") Long projectId, @Param("status") TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignee.id = :assigneeId")
    Long countByAssignee_Id(@Param("assigneeId") Long assigneeId);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignee.id = :assigneeId AND t.status = :status")
    Long countByAssignee_IdAndStatus(@Param("assigneeId") Long assigneeId, @Param("status") TaskStatus status);
    
    // Analytics methods
    Long countByStatus(TaskStatus status);
    
    // Additional analytics queries
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.status = :status")
    List<Task> findByProjectIdAndStatus(@Param("projectId") Long projectId, @Param("status") TaskStatus status);
    
    @Query("SELECT AVG(t.progress) FROM Task t WHERE t.project.id = :projectId")
    Double findAverageProgressByProjectId(@Param("projectId") Long projectId);
    
    // Recent tasks
    @Query("SELECT t FROM Task t WHERE t.createdAt >= :since ORDER BY t.createdAt DESC")
    List<Task> findRecentTasks(@Param("since") LocalDateTime since);
    
    // Tasks by priority
    @Query("SELECT COUNT(t) FROM Task t WHERE t.priority = :priority")
    Long countByPriority(@Param("priority") String priority);
    
    // Enhanced methods for Load Balancing
    @Query("SELECT t FROM Task t WHERE t.assignee.id = :assigneeId ORDER BY t.createdAt DESC")
    java.util.Optional<Task> findTopByAssignee_IdOrderByCreatedAtDesc(@Param("assigneeId") Long assigneeId);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignee.id = :assigneeId AND t.dueDate BETWEEN :startDate AND :endDate")
    Long countByAssignee_IdAndDueDateBetween(@Param("assigneeId") Long assigneeId, 
                                           @Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);
}
