package com.doananganh.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserEmailAndIsReadFalseOrderByCreatedAtDesc(String email);
    Long countByUserEmailAndIsReadFalse(String email);
}
