package com.doananganh.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.doananganh.backend.dto.request.CreateTaskCommentRequest;
import com.doananganh.backend.dto.response.TaskCommentResponse;
import com.doananganh.backend.entity.Task;
import com.doananganh.backend.entity.TaskComment;
import com.doananganh.backend.entity.User;
import com.doananganh.backend.repository.TaskCommentRepository;
import com.doananganh.backend.repository.TaskRepository;
import com.doananganh.backend.repository.UserRepository;

@Service
@Transactional
public class TaskCommentService {
    
    @Autowired
    private TaskCommentRepository taskCommentRepository;
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<TaskCommentResponse> getCommentsByTask(Long taskId) {
        List<TaskComment> comments = taskCommentRepository.findByTaskIdOrderByCreatedAtDesc(taskId);
        return comments.stream()
                .map(TaskCommentResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    public TaskCommentResponse createComment(CreateTaskCommentRequest request, String userEmail) {
        // Find task
        Task task = taskRepository.findById(request.getTaskId())
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + request.getTaskId()));
        
        // Find user
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));
        
        // Create comment
        TaskComment comment = new TaskComment();
        comment.setTask(task);
        comment.setUser(user);
        comment.setContent(request.getContent());
        
        TaskComment savedComment = taskCommentRepository.save(comment);
        return TaskCommentResponse.fromEntity(savedComment);
    }
    
    public TaskCommentResponse updateComment(Long commentId, String newContent, String userEmail) {
        TaskComment comment = taskCommentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        // Check if user owns the comment
        if (!comment.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You can only edit your own comments");
        }
        
        comment.setContent(newContent);
        TaskComment savedComment = taskCommentRepository.save(comment);
        return TaskCommentResponse.fromEntity(savedComment);
    }
    
    public void deleteComment(Long commentId, String userEmail) {
        TaskComment comment = taskCommentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        // Check if user owns the comment
        if (!comment.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You can only delete your own comments");
        }
        
        taskCommentRepository.delete(comment);
    }
    
    public List<TaskCommentResponse> getRecentComments(int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        List<TaskComment> comments = taskCommentRepository.findRecentComments(since);
        return comments.stream()
                .map(TaskCommentResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    public Long getCommentCount(Long taskId) {
        return taskCommentRepository.countByTaskId(taskId);
    }
}
