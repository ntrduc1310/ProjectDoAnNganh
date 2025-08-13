package com.doananganh.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.TimeLog;

@Repository
public interface TimeLogRepository extends JpaRepository<TimeLog, Long> {
    
    List<TimeLog> findByTaskId(Long taskId);
    
    List<TimeLog> findByUserId(Long userId);
    
    List<TimeLog> findByTaskIdAndUserId(Long taskId, Long userId);
    
    @Query("SELECT tl FROM TimeLog tl WHERE tl.task.id = :taskId AND tl.endTime IS NULL")
    List<TimeLog> findActiveTimeLogsByTaskId(@Param("taskId") Long taskId);
    
    @Query("SELECT tl FROM TimeLog tl WHERE tl.user.id = :userId AND tl.endTime IS NULL")
    List<TimeLog> findActiveTimeLogsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT SUM(tl.durationMinutes) FROM TimeLog tl WHERE tl.task.id = :taskId")
    Long getTotalMinutesByTaskId(@Param("taskId") Long taskId);
    
    @Query("SELECT SUM(tl.durationMinutes) FROM TimeLog tl WHERE tl.user.id = :userId AND tl.billable = true")
    Long getBillableMinutesByUserId(@Param("userId") Long userId);
}
