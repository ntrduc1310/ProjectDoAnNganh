package com.doananganh.backend.service;

import com.doananganh.backend.entity.Task;
import com.doananganh.backend.entity.User;
import com.doananganh.backend.enums.TaskPriority;
import com.doananganh.backend.enums.TaskStatus;
import com.doananganh.backend.repository.TaskRepository;
import com.doananganh.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Enhanced Load Balancing Service for Capstone Project
 * Implements multiple sophisticated load balancing algorithms
 * for optimal task assignment and workload distribution
 */
@Service
@Transactional
public class LoadBalancingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    // Load Balancing Algorithm Types
    public enum LoadBalancingAlgorithm {
        ROUND_ROBIN,
        LEAST_LOADED,
        SKILL_BASED,
        WORKLOAD_BASED,
        PRIORITY_BASED,
        HYBRID_INTELLIGENT
    }

    /**
     * Main method to assign task using specified algorithm
     */
    public User assignTaskWithLoadBalancing(Task task, LoadBalancingAlgorithm algorithm) {
        List<User> availableUsers = getAvailableUsers();
        
        if (availableUsers.isEmpty()) {
            throw new RuntimeException("No available users for task assignment");
        }

        User assignedUser = switch (algorithm) {
            case ROUND_ROBIN -> assignUsingRoundRobin(availableUsers);
            case LEAST_LOADED -> assignUsingLeastLoaded(availableUsers);
            case SKILL_BASED -> assignUsingSkillBased(task, availableUsers);
            case WORKLOAD_BASED -> assignUsingWorkloadBased(task, availableUsers);
            case PRIORITY_BASED -> assignUsingPriorityBased(task, availableUsers);
            case HYBRID_INTELLIGENT -> assignUsingHybridIntelligent(task, availableUsers);
        };

        // Update user workload and task assignment
        updateUserWorkload(assignedUser, task);
        task.setAssigneeId(assignedUser.getId());
        task.setAssignmentAlgorithm(algorithm.name());
        
        return assignedUser;
    }

    /**
     * Round Robin Algorithm - Simple sequential assignment
     */
    private User assignUsingRoundRobin(List<User> users) {
        // Simple implementation: find user with least recent assignment
        return users.stream()
                .min(Comparator.comparing(user -> 
                    getLastAssignmentTime(user).orElse(LocalDateTime.MIN)))
                .orElse(users.get(0));
    }

    /**
     * Least Loaded Algorithm - Assign to user with minimum current workload
     */
    private User assignUsingLeastLoaded(List<User> users) {
        return users.stream()
                .min(Comparator.comparing(User::getCurrentWorkload))
                .orElse(users.get(0));
    }

    /**
     * Skill-Based Algorithm - Match task requirements with user skills
     */
    private User assignUsingSkillBased(Task task, List<User> users) {
        List<String> requiredSkills = task.getSkillRequirements();
        
        if (requiredSkills == null || requiredSkills.isEmpty()) {
            return assignUsingLeastLoaded(users);
        }

        // Calculate skill match score for each user
        Map<User, Double> skillScores = users.stream()
                .collect(Collectors.toMap(
                    user -> user,
                    user -> calculateSkillMatchScore(user.getSkills(), requiredSkills)
                ));

        // Find users with highest skill match
        double maxScore = skillScores.values().stream()
                .mapToDouble(Double::doubleValue)
                .max().orElse(0.0);

        List<User> topSkillUsers = skillScores.entrySet().stream()
                .filter(entry -> entry.getValue() == maxScore)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // If multiple users have same skill score, use least loaded
        return topSkillUsers.stream()
                .min(Comparator.comparing(User::getCurrentWorkload))
                .orElse(users.get(0));
    }

    /**
     * Workload-Based Algorithm - Consider task complexity and user capacity
     */
    private User assignUsingWorkloadBased(Task task, List<User> users) {
        int taskComplexity = task.getComplexityScore();
        int estimatedHours = task.getEstimatedHours();

        return users.stream()
                .filter(user -> user.getCurrentWorkload() + estimatedHours <= user.getMaxWorkload())
                .min(Comparator.comparing(user -> 
                    calculateWorkloadEfficiencyScore(user, taskComplexity, estimatedHours)))
                .orElse(assignUsingLeastLoaded(users));
    }

    /**
     * Priority-Based Algorithm - Consider task priority and user experience
     */
    private User assignUsingPriorityBased(Task task, List<User> users) {
        TaskPriority taskPriority = task.getPriority();
        
        // High priority tasks go to experienced users with capacity
        if (TaskPriority.HIGH.equals(taskPriority)) {
            return users.stream()
                    .filter(user -> user.getCurrentWorkload() < user.getMaxWorkload() * 0.8)
                    .max(Comparator.comparing(this::calculateUserExperienceScore))
                    .orElse(assignUsingLeastLoaded(users));
        }

        // Medium and low priority tasks use workload-based assignment
        return assignUsingWorkloadBased(task, users);
    }

    /**
     * Hybrid Intelligent Algorithm - Combines multiple factors
     */
    private User assignUsingHybridIntelligent(Task task, List<User> users) {
        Map<User, Double> overallScores = new HashMap<>();

        for (User user : users) {
            double skillScore = calculateSkillMatchScore(user.getSkills(), task.getSkillRequirements());
            double workloadScore = calculateWorkloadScore(user);
            double experienceScore = calculateUserExperienceScore(user);
            double availabilityScore = calculateAvailabilityScore(user, task);

            // Weighted combination of factors
            double overallScore = (skillScore * 0.4) + 
                                (workloadScore * 0.3) + 
                                (experienceScore * 0.2) + 
                                (availabilityScore * 0.1);

            overallScores.put(user, overallScore);
        }

        return overallScores.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(users.get(0));
    }

    /**
     * Calculate skill match score between user skills and required skills
     */
    private double calculateSkillMatchScore(List<String> userSkills, List<String> requiredSkills) {
        if (requiredSkills == null || requiredSkills.isEmpty()) {
            return 1.0;
        }
        
        if (userSkills == null || userSkills.isEmpty()) {
            return 0.0;
        }

        long matchCount = requiredSkills.stream()
                .mapToLong(skill -> userSkills.contains(skill) ? 1 : 0)
                .sum();

        return (double) matchCount / requiredSkills.size();
    }

    /**
     * Calculate workload efficiency score
     */
    private double calculateWorkloadEfficiencyScore(User user, int taskComplexity, int estimatedHours) {
        double currentLoad = (double) user.getCurrentWorkload() / user.getMaxWorkload();
        double complexityFactor = Math.max(1.0, taskComplexity / 5.0);
        
        return currentLoad + (estimatedHours * complexityFactor / user.getMaxWorkload());
    }

    /**
     * Calculate workload score (lower workload = higher score)
     */
    private double calculateWorkloadScore(User user) {
        double loadPercentage = (double) user.getCurrentWorkload() / user.getMaxWorkload();
        return Math.max(0, 1.0 - loadPercentage);
    }

    /**
     * Calculate user experience score based on completed tasks and ratings
     */
    private double calculateUserExperienceScore(User user) {
        // This could be enhanced with actual performance metrics
        long completedTasks = taskRepository.countByAssignee_IdAndStatus(user.getId(), TaskStatus.COMPLETED);
        return Math.min(1.0, completedTasks / 10.0); // Normalize to 0-1 scale
    }

    /**
     * Calculate availability score based on due dates and current commitments
     */
    private double calculateAvailabilityScore(User user, Task task) {
        if (task.getDueDate() == null) {
            return 1.0;
        }

        // Count tasks due around the same time
        long conflictingTasks = taskRepository.countByAssignee_IdAndDueDateBetween(
            user.getId(), 
            task.getDueDate().minusDays(3), 
            task.getDueDate().plusDays(3)
        );

        return Math.max(0.1, 1.0 - (conflictingTasks * 0.2));
    }

    /**
     * Get available users for task assignment
     */
    private List<User> getAvailableUsers() {
        return userRepository.findByStatusAndRole("ACTIVE", User.Role.USER)
                .stream()
                .filter(user -> user.getCurrentWorkload() < user.getMaxWorkload())
                .collect(Collectors.toList());
    }

    /**
     * Update user workload after task assignment
     */
    private void updateUserWorkload(User user, Task task) {
        int newWorkload = user.getCurrentWorkload() + task.getEstimatedHours();
        user.setCurrentWorkload(Math.min(newWorkload, user.getMaxWorkload()));
        userRepository.save(user);
    }

    /**
     * Get last assignment time for a user
     */
    private Optional<LocalDateTime> getLastAssignmentTime(User user) {
        return taskRepository.findTopByAssignee_IdOrderByCreatedAtDesc(user.getId())
                .map(Task::getCreatedAt);
    }

    /**
     * Get load balancing statistics for analytics
     */
    public Map<String, Object> getLoadBalancingStats() {
        Map<String, Object> stats = new HashMap<>();
        
        List<User> allUsers = userRepository.findByStatus("ACTIVE");
        
        // Calculate workload distribution
        double avgWorkload = allUsers.stream()
                .mapToInt(User::getCurrentWorkload)
                .average().orElse(0.0);
        
        int maxWorkload = allUsers.stream()
                .mapToInt(User::getCurrentWorkload)
                .max().orElse(0);
        
        int minWorkload = allUsers.stream()
                .mapToInt(User::getCurrentWorkload)
                .min().orElse(0);

        stats.put("averageWorkload", avgWorkload);
        stats.put("maxWorkload", maxWorkload);
        stats.put("minWorkload", minWorkload);
        stats.put("workloadVariance", maxWorkload - minWorkload);
        stats.put("totalActiveUsers", allUsers.size());
        
        // Algorithm usage statistics
        Map<String, Long> algorithmUsage = taskRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                    task -> task.getAssignmentAlgorithm() != null ? task.getAssignmentAlgorithm() : "MANUAL",
                    Collectors.counting()
                ));
        
        stats.put("algorithmUsage", algorithmUsage);
        
        return stats;
    }

    /**
     * Suggest optimal algorithm for a given task
     */
    public LoadBalancingAlgorithm suggestOptimalAlgorithm(Task task) {
        // High complexity tasks benefit from skill-based assignment
        if (task.getComplexityScore() >= 8) {
            return LoadBalancingAlgorithm.SKILL_BASED;
        }
        
        // High priority tasks use priority-based algorithm
        if (TaskPriority.HIGH.equals(task.getPriority())) {
            return LoadBalancingAlgorithm.PRIORITY_BASED;
        }
        
        // Tasks with specific skill requirements
        if (task.getSkillRequirements() != null && !task.getSkillRequirements().isEmpty()) {
            return LoadBalancingAlgorithm.SKILL_BASED;
        }
        
        // Large tasks use workload-based algorithm
        if (task.getEstimatedHours() >= 16) {
            return LoadBalancingAlgorithm.WORKLOAD_BASED;
        }
        
        // Default to hybrid intelligent for balanced approach
        return LoadBalancingAlgorithm.HYBRID_INTELLIGENT;
    }
}
