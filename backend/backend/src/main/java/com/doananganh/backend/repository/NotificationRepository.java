package com.doananganh.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    
    List<Notification> findByUserEmailAndIsRead(String userEmail, Boolean isRead);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.userEmail = :email AND n.isRead = false")
    long countUnreadByUserEmail(@Param("email") String email);
    
    List<Notification> findByType(String type);
}
