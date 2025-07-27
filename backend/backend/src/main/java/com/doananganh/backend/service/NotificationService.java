package com.doananganh.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * NotificationService: Quản lý gửi và lưu thông báo cho user/team.
 * - Gửi notification real-time qua WebSocket
 * - Lưu notification vào database (có thể mở rộng sau)
 * - Hỗ trợ lấy danh sách notification, đếm số chưa đọc, đánh dấu đã đọc
 */
@Service
public class NotificationService {

    // Giả lập lưu notification trong bộ nhớ (có thể thay bằng repository)
    private final Map<String, List<Map<String, Object>>> userNotifications = new ConcurrentHashMap<>();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * Gửi notification real-time tới user qua WebSocket
     */
    public void sendNotificationToUser(String userEmail, String title, String message, String type) {
        Map<String, Object> notification = new HashMap<>();
        notification.put("id", System.currentTimeMillis());
        notification.put("title", title);
        notification.put("message", message);
        notification.put("type", type);
        notification.put("isRead", false);
        notification.put("timestamp", LocalDateTime.now());

        // Lưu vào bộ nhớ (hoặc DB)
        userNotifications.computeIfAbsent(userEmail, k -> new ArrayList<>()).add(notification);

        // Gửi qua WebSocket (frontend subscribe /user/queue/notifications)
        messagingTemplate.convertAndSendToUser(userEmail, "/queue/notifications", notification);
    }

    /**
     * Lấy danh sách notification của user
     */
    public List<Map<String, Object>> getUserNotifications(String userEmail) {
        return userNotifications.getOrDefault(userEmail, new ArrayList<>());
    }

    /**
     * Đếm số notification chưa đọc
     */
    public long countUnread(String userEmail) {
        return getUserNotifications(userEmail).stream()
                .filter(n -> Boolean.FALSE.equals(n.get("isRead")))
                .count();
    }

    /**
     * Đánh dấu notification đã đọc
     */
    public void markAsRead(String userEmail, Long notificationId) {
        List<Map<String, Object>> notifications = userNotifications.get(userEmail);
        if (notifications != null) {
            notifications.stream()
                .filter(n -> Objects.equals(n.get("id"), notificationId))
                .forEach(n -> n.put("isRead", true));
        }
    }

    /**
     * Gửi cảnh báo workload cho manager
     */
    public void sendWorkloadWarning(String managerEmail, String memberName, double workload) {
        String title = "Cảnh báo Workload";
        String message = memberName + " đang có workload " + workload + "%";
        sendNotificationToUser(managerEmail, title, message, "WORKLOAD_WARNING");
    }

    /**
     * Gửi thông báo phân công task cho user
     */
    public void sendTaskAssigned(String userEmail, String taskTitle) {
        String title = "Nhiệm vụ mới";
        String message = "Bạn được giao nhiệm vụ: " + taskTitle;
        sendNotificationToUser(userEmail, title, message, "TASK_ASSIGNED");
    }
}
