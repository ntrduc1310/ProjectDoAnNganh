package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getCurrentUserProfile(Authentication auth) {
        Map<String, Object> profile = new HashMap<>();
        profile.put("id", 1L);
        profile.put("username", "nguyenvana");
        profile.put("email", auth.getName());
        profile.put("fullName", "Nguyễn Văn A");
        profile.put("role", "USER");
        profile.put("skills", Arrays.asList("Java", "Spring Boot", "SQL"));
        profile.put("workloadCapacity", 100);
        profile.put("bio", "Backend developer");
        profile.put("yearsExperience", 3);
        profile.put("hourlyRate", 10.5);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @Valid @RequestBody Map<String, Object> request,
            Authentication auth) {
        Map<String, Object> updated = new HashMap<>(request);
        updated.put("email", auth.getName());
        updated.put("message", "Cập nhật thông tin thành công");
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/team")
    @PreAuthorize("hasAuthority('TEAM_LEAD')")
    public ResponseEntity<List<Map<String, Object>>> getTeamMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search) {
        List<Map<String, Object>> team = new ArrayList<>();
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("email", "a@example.com");
        member1.put("role", "DEVELOPER");
        member1.put("workload", 85.5);
        team.add(member1);

        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("email", "b@example.com");
        member2.put("role", "DESIGNER");
        member2.put("workload", 65.2);
        team.add(member2);

        return ResponseEntity.ok(team);
    }

    @GetMapping("/team/workload")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getTeamWorkload() {
        List<Map<String, Object>> workload = new ArrayList<>();
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("workloadPercentage", 85.5);
        member1.put("activeTasks", 8);
        member1.put("status", "BUSY");
        workload.add(member1);

        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("workloadPercentage", 65.2);
        member2.put("activeTasks", 5);
        member2.put("status", "AVAILABLE");
        workload.add(member2);

        return ResponseEntity.ok(workload);
    }

    @PutMapping("/team/{userId}/workload")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> updateMemberWorkload(
            @PathVariable Long userId,
            @Valid @RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("newWorkload", request.get("workload"));
        response.put("message", "Cập nhật workload thành công");
        return ResponseEntity.ok(response);
    }
}
