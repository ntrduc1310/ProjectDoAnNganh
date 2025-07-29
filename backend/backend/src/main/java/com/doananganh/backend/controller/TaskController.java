package com.doananganh.backend.controller;

import com.doananganh.backend.dto.TaskDto;
import com.doananganh.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService service;

    @GetMapping
    public List<TaskDto> getAllTasks() {
        return service.getAllTasks();
    }

    @PostMapping
    public TaskDto createTask(@RequestBody TaskDto dto) {
        return service.createTask(dto);
    }

    @GetMapping("/{id}")
    public TaskDto getTask(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @PutMapping("/{id}")
    public TaskDto updateTask(@PathVariable Long id, @RequestBody TaskDto dto) {
        return service.updateTask(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
