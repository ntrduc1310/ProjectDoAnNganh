package com.doananganh.backend.repository;
import java.util.List;
import com.doananganh.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Tự động tạo câu lệnh SQL để tìm tất cả Task theo projectId
    List<Task> findByProjectId(Long projectId);
}