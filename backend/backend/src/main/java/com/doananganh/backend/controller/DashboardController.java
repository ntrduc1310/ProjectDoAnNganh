package com.doananganh.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:5175", 
    "http://localhost:5176"
})
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        logger.info("📊 Dashboard stats requested");
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTasks", 12);
        stats.put("completedTasks", 8);
        stats.put("inProgressTasks", 3);
        stats.put("pendingTasks", 1);
        stats.put("totalProjects", 4);
        stats.put("teamMembers", 5);
        stats.put("overdueItems", 2);
        stats.put("completionRate", 67);
        stats.put("lastUpdated", System.currentTimeMillis());
        
        logger.info("✅ Dashboard stats retrieved successfully");
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealthCheck() {
        logger.info("🏥 Health check requested");
        
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", System.currentTimeMillis());
        health.put("service", "dashboard-controller");
        health.put("version", "1.0.0");
        health.put("message", "Task Management Backend is running");
        
        logger.info("🏥 Health check: {}", health);
        return ResponseEntity.ok(health);
    }
}
