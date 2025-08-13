package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects") // ✅ REMOVE /api PREFIX
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5175", "http://localhost:5176"})
public class ProjectController {

    @GetMapping
    public ResponseEntity<List<Object>> getAllProjects() {
        return ResponseEntity.ok(new ArrayList<>());
    }
}
