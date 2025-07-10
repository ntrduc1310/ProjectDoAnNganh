// Sửa lỗi: Đảm bảo tên package khớp với cấu trúc thư mục (doananganh)
package com.doananganh.backend.service;

// Sửa lỗi: Đảm bảo các đường dẫn import là chính xác (doananganh)
import com.doananganh.backend.model.Task;
import com.doananganh.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Hàm để tạo một công việc mới
    public Task createTask(Task task) {
        // TODO: Thêm logic kiểm tra người dùng có thuộc dự án không trước khi tạo task
        return taskRepository.save(task);
    }
     public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

}
