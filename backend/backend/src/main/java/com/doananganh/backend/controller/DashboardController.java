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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"})
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Integer>> getDashboardStats() {
        logger.info("📊 Dashboard stats requested");
        
        Map<String, Integer> stats = new HashMap<>();
        stats.put("totalTasks", 5);
        stats.put("completedTasks", 2);
        stats.put("inProgressTasks", 2);
        stats.put("totalProjects", 1);
        stats.put("teamMembers", 3);
        
        logger.info("📊 Returning stats: {}", stats);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", System.currentTimeMillis());
        health.put("message", "Backend is running with mock data");
        
        logger.info("🏥 Health check: {}", health);
        return ResponseEntity.ok(health);
    }
}
