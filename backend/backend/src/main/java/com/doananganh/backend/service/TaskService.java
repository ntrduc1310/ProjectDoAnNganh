package com.doananganh.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doananganh.backend.dto.TaskDto;
import com.doananganh.backend.entity.Task;
import com.doananganh.backend.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<TaskDto> getAllTasks() {
        return repo.findAll().stream().map(TaskDto::fromEntity).collect(Collectors.toList());
    }

    public TaskDto createTask(TaskDto dto) {
        Task entity = new Task();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setPriority(dto.getPriority());
        entity.setStatus(dto.getStatus());
        entity.setEstimatedHours(dto.getEstimatedHours());
        entity.setActualHours(dto.getActualHours());
        entity.setAssigneeEmail(dto.getAssigneeEmail());
        entity.setProjectId(dto.getProjectId());
        repo.save(entity);
        return TaskDto.fromEntity(entity);
    }

    public TaskDto getTaskById(Long id) {
        Optional<Task> task = repo.findById(id);
        return task.map(TaskDto::fromEntity).orElse(null);
    }

    public TaskDto updateTask(Long id, TaskDto dto) {
        Optional<Task> optionalTask = repo.findById(id);
        if (optionalTask.isPresent()) {
            Task entity = optionalTask.get();
            entity.setTitle(dto.getTitle());
            entity.setDescription(dto.getDescription());
            entity.setPriority(dto.getPriority());
            entity.setStatus(dto.getStatus());
            entity.setEstimatedHours(dto.getEstimatedHours());
            entity.setActualHours(dto.getActualHours());
            entity.setAssigneeEmail(dto.getAssigneeEmail());
            entity.setProjectId(dto.getProjectId());
            repo.save(entity);
            return TaskDto.fromEntity(entity);
        }
        return null;
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
