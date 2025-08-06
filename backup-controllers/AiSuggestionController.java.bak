package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiSuggestionController {

    @GetMapping("/suggestions")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getPendingSuggestions(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Map<String, Object>> suggestions = new ArrayList<>();
        Map<String, Object> suggestion1 = new HashMap<>();
        suggestion1.put("id", 1L);
        suggestion1.put("type", type != null ? type : "TASK_ASSIGNMENT");
        suggestion1.put("confidenceScore", 0.92);
        suggestion1.put("description", "Gán task 'Thiết kế DB' cho Nguyễn Văn A");
        suggestion1.put("status", "PENDING");
        suggestion1.put("createdAt", new Date());
        suggestions.add(suggestion1);

        Map<String, Object> suggestion2 = new HashMap<>();
        suggestion2.put("id", 2L);
        suggestion2.put("type", type != null ? type : "WORKLOAD_BALANCE");
        suggestion2.put("confidenceScore", 0.85);
        suggestion2.put("description", "Phân bổ lại workload cho Trần Thị B");
        suggestion2.put("status", "PENDING");
        suggestion2.put("createdAt", new Date());
        suggestions.add(suggestion2);

        return ResponseEntity.ok(suggestions);
    }

    @PostMapping("/suggestions/{suggestionId}/accept")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> acceptSuggestion(
            @PathVariable Long suggestionId,
            Authentication auth) {
        Map<String, Object> response = new HashMap<>();
        response.put("suggestionId", suggestionId);
        response.put("status", "ACCEPTED");
        response.put("acceptedBy", auth.getName());
        response.put("timestamp", new Date());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/suggestions/{suggestionId}/reject")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> rejectSuggestion(
            @PathVariable Long suggestionId,
            @RequestBody(required = false) String reason,
            Authentication auth) {
        Map<String, Object> response = new HashMap<>();
        response.put("suggestionId", suggestionId);
        response.put("status", "REJECTED");
        response.put("rejectedBy", auth.getName());
        response.put("reason", reason);
        response.put("timestamp", new Date());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze/task-assignment")
    @PreAuthorize("hasAuthority('TEAM_LEAD')")
    public ResponseEntity<Map<String, Object>> analyzeTaskAssignment(
            @Valid @RequestBody Map<String, Object> request) {
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("optimalAssignee", "Nguyễn Văn A");
        analysis.put("confidenceScore", 0.93);
        analysis.put("recommendation", "Assign task to Nguyễn Văn A for best efficiency.");
        analysis.put("details", request);
        return ResponseEntity.ok(analysis);
    }

    @PostMapping("/analyze/workload-balance")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> analyzeWorkloadBalance(
            @RequestParam(required = false) Long projectId) {
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("projectId", projectId);
        analysis.put("recommendation", "Phân bổ lại workload cho các thành viên để cân bằng.");
        analysis.put("workloadDistribution", Arrays.asList(
                Map.of("member", "Nguyễn Văn A", "workload", 80),
                Map.of("member", "Trần Thị B", "workload", 60)
        ));
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/predictions/workload")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getWorkloadPredictions(
            @RequestParam(required = false) Long teamMemberId,
            @RequestParam(defaultValue = "30") int days) {
        List<Map<String, Object>> predictions = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            Map<String, Object> prediction = new HashMap<>();
            prediction.put("date", new Date(System.currentTimeMillis() + i * 86400000L));
            prediction.put("predictedWorkload", 60 + Math.random() * 30);
            prediction.put("teamMemberId", teamMemberId != null ? teamMemberId : 1L);
            predictions.add(prediction);
        }
        return ResponseEntity.ok(predictions);
    }
}
