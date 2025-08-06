package com.doananganh.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)  // ✅ Explicit CORS
public class DashboardController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        System.out.println("✅ GET /dashboard/stats called");
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTasks", 5);
        stats.put("completedTasks", 2);
        stats.put("inProgressTasks", 2);
        stats.put("totalProjects", 3);
        stats.put("teamMembers", 8);
        
        System.out.println("📊 Returning dashboard stats: " + stats);
        return ResponseEntity.ok(stats);
    }
}
