package com.doananganh.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@Tag(name = "Dashboard", description = "Analytics and dashboard data endpoints")
public class DashboardController {
    
    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getDashboardStats(Authentication auth) {
        // Mock response for now - replace with real service later
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", 12);
        stats.put("activeProjects", 8);
        stats.put("completedTasks", 45);
        stats.put("pendingTasks", 23);
        stats.put("teamMembers", 15);
        stats.put("workloadPercentage", 78.5);
        stats.put("userEmail", auth.getName());
        stats.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/workload/overview")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getWorkloadOverview() {
        // Mock team workload data
        List<Map<String, Object>> overview = new ArrayList<>();
        
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("email", "nguyenvana@example.com");
        member1.put("workloadPercentage", 85.5);
        member1.put("activeTasks", 8);
        member1.put("status", "BUSY");
        overview.add(member1);
        
        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("email", "tranthib@example.com");
        member2.put("workloadPercentage", 65.2);
        member2.put("activeTasks", 5);
        member2.put("status", "AVAILABLE");
        overview.add(member2);
        
        Map<String, Object> member3 = new HashMap<>();
        member3.put("id", 3L);
        member3.put("name", "Lê Văn C");
        member3.put("email", "levanc@example.com");
        member3.put("workloadPercentage", 92.8);
        member3.put("activeTasks", 12);
        member3.put("status", "OVERLOADED");
        overview.add(member3);
        
        return ResponseEntity.ok(overview);
    }
    
    @GetMapping("/projects/progress")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getProjectsProgress() {
        // Mock project progress data
        List<Map<String, Object>> projects = new ArrayList<>();
        
        Map<String, Object> project1 = new HashMap<>();
        project1.put("id", 1L);
        project1.put("name", "E-commerce Platform");
        project1.put("progress", 75.5);
        project1.put("status", "IN_PROGRESS");
        project1.put("dueDate", "2025-08-15");
        project1.put("teamSize", 8);
        projects.add(project1);
        
        Map<String, Object> project2 = new HashMap<>();
        project2.put("id", 2L);
        project2.put("name", "Mobile App Development");
        project2.put("progress", 45.2);
        project2.put("status", "IN_PROGRESS");
        project2.put("dueDate", "2025-09-30");
        project2.put("teamSize", 6);
        projects.add(project2);
        
        Map<String, Object> project3 = new HashMap<>();
        project3.put("id", 3L);
        project3.put("name", "Data Analytics Dashboard");
        project3.put("progress", 100.0);
        project3.put("status", "COMPLETED");
        project3.put("dueDate", "2025-07-20");
        project3.put("teamSize", 4);
        projects.add(project3);
        
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/analytics/productivity")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> getProductivityAnalytics(
            @RequestParam(required = false) Long teamMemberId,
            @RequestParam(defaultValue = "30") int days) {
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("averageTasksPerDay", 3.2);
        analytics.put("completionRate", 87.5);
        analytics.put("averageTaskDuration", 4.8); // hours
        analytics.put("productivityTrend", "INCREASING");
        analytics.put("teamMemberId", teamMemberId);
        analytics.put("periodDays", days);
        
        // Mock daily productivity data
        List<Map<String, Object>> dailyData = new ArrayList<>();
        for (int i = 0; i < Math.min(days, 7); i++) {
            Map<String, Object> day = new HashMap<>();
            day.put("date", LocalDateTime.now().minusDays(i).toLocalDate().toString());
            day.put("tasksCompleted", (int)(Math.random() * 8) + 1);
            day.put("hoursWorked", Math.round((Math.random() * 4 + 6) * 10.0) / 10.0);
            day.put("productivity", Math.round((Math.random() * 30 + 70) * 10.0) / 10.0);
            dailyData.add(day);
        }
        analytics.put("dailyData", dailyData);
        
        return ResponseEntity.ok(analytics);
    }
    
    @GetMapping("/charts/workload-trends")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> getWorkloadTrends(
            @RequestParam(defaultValue = "30") int days) {
        
        Map<String, Object> trends = new HashMap<>();
        trends.put("periodDays", days);
        trends.put("averageWorkload", 76.3);
        trends.put("peakWorkload", 94.2);
        trends.put("minWorkload", 52.1);
        trends.put("trend", "STABLE");
        
        // Mock trend data
        List<Map<String, Object>> trendData = new ArrayList<>();
        for (int i = 0; i < Math.min(days, 14); i++) {
            Map<String, Object> point = new HashMap<>();
            point.put("date", LocalDateTime.now().minusDays(i).toLocalDate().toString());
            point.put("averageWorkload", Math.round((Math.random() * 40 + 50) * 10.0) / 10.0);
            point.put("teamSize", 15);
            trendData.add(point);
        }
        trends.put("trendData", trendData);
        
        return ResponseEntity.ok(trends);
    }
    
    @GetMapping("/alerts")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Map<String, Object>>> getAlerts(Authentication auth) {
        // Mock alerts data
        List<Map<String, Object>> alerts = new ArrayList<>();
        
        Map<String, Object> alert1 = new HashMap<>();
        alert1.put("id", 1L);
        alert1.put("type", "WORKLOAD_WARNING");
        alert1.put("title", "High Workload Alert");
        alert1.put("message", "Lê Văn C is currently at 92% workload capacity");
        alert1.put("severity", "HIGH");
        alert1.put("timestamp", LocalDateTime.now().minusHours(2));
        alert1.put("isRead", false);
        alerts.add(alert1);
        
        Map<String, Object> alert2 = new HashMap<>();
        alert2.put("id", 2L);
        alert2.put("type", "DEADLINE_WARNING");
        alert2.put("title", "Project Deadline Approaching");
        alert2.put("message", "E-commerce Platform project due in 3 days");
        alert2.put("severity", "MEDIUM");
        alert2.put("timestamp", LocalDateTime.now().minusHours(6));
        alert2.put("isRead", false);
        alerts.add(alert2);
        
        Map<String, Object> alert3 = new HashMap<>();
        alert3.put("id", 3L);
        alert3.put("type", "TASK_COMPLETION");
        alert3.put("title", "Task Completed");
        alert3.put("message", "Database optimization task has been completed");
        alert3.put("severity", "LOW");
        alert3.put("timestamp", LocalDateTime.now().minusHours(12));
        alert3.put("isRead", true);
        alerts.add(alert3);
        
        return ResponseEntity.ok(alerts);
    }
    
    @GetMapping("/notifications/unread-count")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getUnreadNotificationCount(Authentication auth) {
        Map<String, Object> response = new HashMap<>();
        response.put("unreadCount", 5);
        response.put("userEmail", auth.getName());
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/quick-stats")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getQuickStats(Authentication auth) {
        Map<String, Object> quickStats = new HashMap<>();
        quickStats.put("myActiveTasks", 8);
        quickStats.put("myCompletedTasks", 23);
        quickStats.put("myWorkloadPercentage", 78.5);
        quickStats.put("upcomingDeadlines", 3);
        quickStats.put("teamNotifications", 2);
        quickStats.put("lastActivity", LocalDateTime.now().minusMinutes(15));
        
        return ResponseEntity.ok(quickStats);
    }
}
