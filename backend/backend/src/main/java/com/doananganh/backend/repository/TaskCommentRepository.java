package com.doananganh.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.TaskComment;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, Long> {
    
    // Find comments by task
    List<TaskComment> findByTaskIdOrderByCreatedAtDesc(Long taskId);
    Page<TaskComment> findByTaskIdOrderByCreatedAtDesc(Long taskId, Pageable pageable);
    
    // Find comments by user
    List<TaskComment> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    // Count comments for task
    Long countByTaskId(Long taskId);
    
    // Find recent comments
    @Query("SELECT tc FROM TaskComment tc WHERE tc.createdAt >= :since ORDER BY tc.createdAt DESC")
    List<TaskComment> findRecentComments(@Param("since") LocalDateTime since);
    
    // Find comments by task and user
    List<TaskComment> findByTaskIdAndUserIdOrderByCreatedAtDesc(Long taskId, Long userId);
}
