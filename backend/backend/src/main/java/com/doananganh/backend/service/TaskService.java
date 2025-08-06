package com.doananganh.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.doananganh.backend.dto.request.CreateTaskRequest;
import com.doananganh.backend.dto.response.TaskDetailResponse;
import com.doananganh.backend.entity.Project;
import com.doananganh.backend.entity.Task;
import com.doananganh.backend.entity.User;
import com.doananganh.backend.enums.TaskStatus;
import com.doananganh.backend.repository.ProjectRepository;
import com.doananganh.backend.repository.TaskRepository;
import com.doananganh.backend.repository.UserRepository;

@Service
@Transactional
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private NotificationService notificationService;
    
    public Page<Task> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }
    
    public Page<Task> getTasksByProject(Long projectId, Pageable pageable) {
        return taskRepository.findByProjectId(projectId, pageable);
    }
    
    public Page<Task> getTasksByAssignee(Long assigneeId, Pageable pageable) {
        return taskRepository.findByAssigneeId(assigneeId, pageable);
    }
    
    public TaskDetailResponse createTask(CreateTaskRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
            .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User assignee = null;
        if (request.getAssigneeEmail() != null && !request.getAssigneeEmail().trim().isEmpty()) {
            assignee = userRepository.findByEmail(request.getAssigneeEmail())
                .orElseThrow(() -> new RuntimeException("Assignee not found with email: " + request.getAssigneeEmail()));
        }
        
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(TaskStatus.TODO);
        task.setProject(project);
        task.setAssignee(assignee);
        task.setEstimatedHours(request.getEstimatedHours());
        task.setDueDate(request.getDueDate());
        task.setProgress(0.0);
        
        Task savedTask = taskRepository.save(task);
        
        // Send notification to assignee
        if (assignee != null && notificationService != null) {
            notificationService.sendTaskAssignedNotification(assignee, savedTask);
        }
        
        // Update project progress
        updateProjectProgress(project.getId());
        
        return TaskDetailResponse.fromEntity(savedTask);
    }
    
    public TaskDetailResponse updateTaskStatus(Long taskId, TaskStatus newStatus) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        TaskStatus oldStatus = task.getStatus();
        task.setStatus(newStatus);
        
        if (newStatus == TaskStatus.COMPLETED) {
            task.setProgress(100.0);
            task.setCompletedAt(LocalDateTime.now());
        }
        
        Task savedTask = taskRepository.save(task);
        
        // Send notification about status change
        if (task.getAssignee() != null && notificationService != null) {
            notificationService.sendTaskStatusChangeNotification(
                task.getAssignee(), savedTask, oldStatus, newStatus);
        }
        
        // Update project progress
        updateProjectProgress(task.getProject().getId());
        
        return TaskDetailResponse.fromEntity(savedTask);
    }
    
    public TaskDetailResponse getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        return TaskDetailResponse.fromEntity(task);
    }
    
    public TaskDetailResponse updateTask(Long taskId, CreateTaskRequest request) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        // Update task properties
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setEstimatedHours(request.getEstimatedHours());
        task.setDueDate(request.getDueDate());
        
        // Update assignee if provided
        if (request.getAssigneeEmail() != null && !request.getAssigneeEmail().trim().isEmpty()) {
            User assignee = userRepository.findByEmail(request.getAssigneeEmail())
                .orElseThrow(() -> new RuntimeException("Assignee not found with email: " + request.getAssigneeEmail()));
            task.setAssignee(assignee);
        }
        
        Task savedTask = taskRepository.save(task);
        return TaskDetailResponse.fromEntity(savedTask);
    }
    
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        taskRepository.delete(task);
    }
    
    public void updateProjectProgress(Long projectId) {
        List<Task> projectTasks = taskRepository.findByProjectId(projectId);
        
        if (projectTasks.isEmpty()) return;
        
        double totalProgress = projectTasks.stream()
            .mapToDouble(task -> task.getProgress() != null ? task.getProgress() : 0.0)
            .sum();
        
        double averageProgress = totalProgress / projectTasks.size();
        
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            project.setProgress(averageProgress);
            projectRepository.save(project);
        }
    }
    
    public List<Task> getOverdueTasks() {
        return taskRepository.findOverdueTasks(LocalDateTime.now());
    }
    
    public List<Task> getTasksDueSoon(int days) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusDays(days);
        return taskRepository.findTasksDueBetween(now, future);
    }
}
