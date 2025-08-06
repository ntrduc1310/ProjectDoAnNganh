package com.doananganh.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @GetMapping
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<Map<String, Object>>> getAllTeams() {
        // Mock data
        List<Map<String, Object>> teams = new ArrayList<>();
        Map<String, Object> team1 = new HashMap<>();
        team1.put("id", 1L);
        team1.put("name", "Backend Team");
        team1.put("description", "Phát triển API và hệ thống backend");
        team1.put("memberCount", 5);
        teams.add(team1);

        Map<String, Object> team2 = new HashMap<>();
        team2.put("id", 2L);
        team2.put("name", "Frontend Team");
        team2.put("description", "Phát triển giao diện người dùng");
        team2.put("memberCount", 4);
        teams.add(team2);

        return ResponseEntity.ok(teams);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> createTeam(@Valid @RequestBody Map<String, Object> request, Authentication auth) {
        Map<String, Object> team = new HashMap<>();
        team.put("id", System.currentTimeMillis());
        team.put("name", request.get("name"));
        team.put("description", request.get("description"));
        team.put("createdBy", auth.getName());
        team.put("createdAt", new Date());
        team.put("memberCount", 0);
        return ResponseEntity.ok(team);
    }

    @GetMapping("/{teamId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, Object>> getTeamDetail(@PathVariable Long teamId) {
        Map<String, Object> team = new HashMap<>();
        team.put("id", teamId);
        team.put("name", "Backend Team");
        team.put("description", "Phát triển API và hệ thống backend");
        team.put("memberCount", 5);

        List<Map<String, Object>> members = new ArrayList<>();
        Map<String, Object> member1 = new HashMap<>();
        member1.put("id", 1L);
        member1.put("name", "Nguyễn Văn A");
        member1.put("email", "a@example.com");
        member1.put("role", "DEVELOPER");
        members.add(member1);

        Map<String, Object> member2 = new HashMap<>();
        member2.put("id", 2L);
        member2.put("name", "Trần Thị B");
        member2.put("email", "b@example.com");
        member2.put("role", "DESIGNER");
        members.add(member2);

        team.put("members", members);
        return ResponseEntity.ok(team);
    }

    @PostMapping("/{teamId}/members")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> addMemberToTeam(
            @PathVariable Long teamId,
            @Valid @RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("teamId", teamId);
        response.put("userId", request.get("userId"));
        response.put("role", request.get("role"));
        response.put("addedAt", new Date());
        response.put("message", "Thêm thành viên vào team thành công");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{teamId}/members/{userId}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Map<String, Object>> removeMemberFromTeam(
            @PathVariable Long teamId,
            @PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        response.put("teamId", teamId);
        response.put("userId", userId);
        response.put("message", "Xóa thành viên khỏi team thành công");
        return ResponseEntity.ok(response);
    }
}
