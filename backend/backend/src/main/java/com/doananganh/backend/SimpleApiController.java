package com.doananganh.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

// ❌ COMMENT OUT @RestController TO DISABLE
// @RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SimpleApiController {

    // Keep methods for reference but not active as REST endpoints
    // @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }

    // @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test endpoint works!");
    }

    // @GetMapping("/tasks")
    public ResponseEntity<String> getTasks() {
        return ResponseEntity.ok("[{\"id\":1,\"title\":\"Test Task\",\"status\":\"TODO\"}]");
    }

    // @GetMapping("/projects")
    public ResponseEntity<String> getProjects() {
        return ResponseEntity.ok("[{\"id\":1,\"name\":\"Test Project\",\"status\":\"ACTIVE\"}]");
    }
}