package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Map<String, Object>>> getUserNotifications(Authentication auth) {
        // Mock data
        List<Map<String, Object>> notifications = new ArrayList<>();
        Map<String, Object> n1 = new HashMap<>();
        n1.put("id", 1L);
        n1.put("title", "Task Assigned");
        n1.put("message", "Bạn vừa được giao nhiệm vụ mới");
        n1.put("type", "TASK_ASSIGNED");
        n1.put("isRead", false);
        n1.put("createdAt", new Date());
        notifications.add(n1);

        Map<String, Object> n2 = new HashMap<>();
        n2.put("id", 2L);
        n2.put("title", "Workload Warning");
        n2.put("message", "Workload của bạn đang cao");
        n2.put("type", "WORKLOAD_WARNING");
        n2.put("isRead", true);
        n2.put("createdAt", new Date());
        notifications.add(n2);

        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{notificationId}/read")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> markAsRead(
            @PathVariable Long notificationId,
            Authentication auth) {
        Map<String, Object> response = new HashMap<>();
        response.put("notificationId", notificationId);
        response.put("isRead", true);
        response.put("message", "Đã đánh dấu là đã đọc");
        return ResponseEntity.ok(response);
    }
}