package com.doananganh.backend.service;

import org.springframework.stereotype.Service;

import com.doananganh.backend.entity.Task;
import com.doananganh.backend.entity.User;
import com.doananganh.backend.enums.TaskStatus;

@Service
public class NotificationService {
    
    public void sendTaskAssignedNotification(User assignee, Task task) {
        // For now, just log the notification
        System.out.println("📧 Notification: Task '" + task.getTitle() + 
                          "' assigned to " + assignee.getEmail());
    }
    
    public void sendTaskStatusChangeNotification(User assignee, Task task, 
                                               TaskStatus oldStatus, TaskStatus newStatus) {
        System.out.println("📧 Notification: Task '" + task.getTitle() + 
                          "' status changed from " + oldStatus + " to " + newStatus +
                          " for " + assignee.getEmail());
    }
    
    public void sendTaskDueNotification(User assignee, Task task) {
        System.out.println("📧 Notification: Task '" + task.getTitle() + 
                          "' is due soon for " + assignee.getEmail());
    }
    
    public void sendTaskOverdueNotification(User assignee, Task task) {
        System.out.println("📧 Notification: Task '" + task.getTitle() + 
                          "' is overdue for " + assignee.getEmail());
    }
}
