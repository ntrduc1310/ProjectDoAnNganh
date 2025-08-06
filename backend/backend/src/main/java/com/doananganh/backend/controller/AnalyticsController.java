package com.doananganh.backend.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doananganh.backend.enums.TaskStatus;
import com.doananganh.backend.repository.ProjectRepository;
import com.doananganh.backend.repository.TaskRepository;
import com.doananganh.backend.repository.UserRepository;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8080"})
public class AnalyticsController {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        try {
            Map<String, Object> analytics = new HashMap<>();
            
            // Basic counts
            analytics.put("totalTasks", taskRepository.count());
            analytics.put("totalProjects", projectRepository.count());
            analytics.put("totalUsers", userRepository.count());
            
            // Task status breakdown
            Map<String, Long> taskStatusCount = new HashMap<>();
            for (TaskStatus status : TaskStatus.values()) {
                Long count = taskRepository.countByStatus(status);
                taskStatusCount.put(status.name(), count != null ? count : 0L);
            }
            analytics.put("tasksByStatus", taskStatusCount);
            
            // Overdue tasks
            Long overdueCount = (long) taskRepository.findOverdueTasks(LocalDateTime.now()).size();
            analytics.put("overdueTasks", overdueCount);
            
            // Tasks due soon (next 7 days)
            LocalDateTime weekFromNow = LocalDateTime.now().plusDays(7);
            Long dueSoonCount = (long) taskRepository.findTasksDueBetween(LocalDateTime.now(), weekFromNow).size();
            analytics.put("tasksDueSoon", dueSoonCount);
            
            // Completion rate
            Long completedTasks = taskStatusCount.get(TaskStatus.COMPLETED.name());
            Long totalTasks = taskRepository.count();
            Double completionRate = totalTasks > 0 ? (completedTasks.doubleValue() / totalTasks) * 100 : 0.0;
            analytics.put("completionRate", Math.round(completionRate * 100.0) / 100.0);
            
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            System.err.println("❌ Error getting analytics: " + e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to load analytics");
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<Map<String, Object>> getProjectAnalytics(@PathVariable Long projectId) {
        try {
            Map<String, Object> analytics = new HashMap<>();
            
            // Project task counts by status
            Map<String, Long> taskStatusCount = new HashMap<>();
            for (TaskStatus status : TaskStatus.values()) {
                Long count = taskRepository.countByProjectIdAndStatus(projectId, status);
                taskStatusCount.put(status.name(), count != null ? count : 0L);
            }
            analytics.put("tasksByStatus", taskStatusCount);
            
            // Total tasks for project
            Long totalTasks = taskRepository.countByProjectId(projectId);
            analytics.put("totalTasks", totalTasks);
            
            // Project completion rate
            Long completedTasks = taskStatusCount.get(TaskStatus.COMPLETED.name());
            Double completionRate = totalTasks > 0 ? (completedTasks.doubleValue() / totalTasks) * 100 : 0.0;
            analytics.put("completionRate", Math.round(completionRate * 100.0) / 100.0);
            
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            System.err.println("❌ Error getting project analytics: " + e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to load project analytics");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserAnalytics(@PathVariable Long userId) {
        try {
            Map<String, Object> analytics = new HashMap<>();
            
            // User task counts by status
            Map<String, Long> taskStatusCount = new HashMap<>();
            for (TaskStatus status : TaskStatus.values()) {
                Long count = taskRepository.countByAssigneeIdAndStatus(userId, status);
                taskStatusCount.put(status.name(), count != null ? count : 0L);
            }
            analytics.put("tasksByStatus", taskStatusCount);
            
            // Total tasks assigned to user
            Long totalTasks = taskRepository.countByAssigneeId(userId);
            analytics.put("totalTasks", totalTasks);
            
            // User completion rate
            Long completedTasks = taskStatusCount.get(TaskStatus.COMPLETED.name());
            Double completionRate = totalTasks > 0 ? (completedTasks.doubleValue() / totalTasks) * 100 : 0.0;
            analytics.put("completionRate", Math.round(completionRate * 100.0) / 100.0);
            
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            System.err.println("❌ Error getting user analytics: " + e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to load user analytics");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<Map<String, Object>> getRecentActivity(
            @RequestParam(defaultValue = "24") int hours) {
        try {
            LocalDateTime since = LocalDateTime.now().minusHours(hours);
            
            Map<String, Object> activity = new HashMap<>();
            activity.put("recentTasks", taskRepository.findRecentTasks(since));
            activity.put("hours", hours);
            activity.put("count", taskRepository.findRecentTasks(since).size());
            
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            System.err.println("❌ Error getting recent activity: " + e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to load recent activity");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
