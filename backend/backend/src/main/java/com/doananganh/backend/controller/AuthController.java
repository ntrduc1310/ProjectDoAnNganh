package com.doananganh.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "User authentication endpoints")
public class AuthController {

    @PostMapping("/login")
    @Operation(summary = "User login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody Map<String, Object> request) {
        // Mock login: always success if email and password present
        if (!request.containsKey("email") || !request.containsKey("password")) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", "mock-access-token");
        response.put("refreshToken", "mock-refresh-token");
        response.put("user", Map.of(
                "id", 1L,
                "email", request.get("email"),
                "fullName", "Nguyễn Văn A",
                "role", "USER"
        ));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody Map<String, Object> request) {
        // Mock register: always success
        Map<String, Object> response = new HashMap<>();
        response.put("id", 2L);
        response.put("email", request.get("email"));
        response.put("fullName", request.get("fullName"));
        response.put("role", request.getOrDefault("role", "USER"));
        response.put("message", "Đăng ký thành công");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(@Valid @RequestBody Map<String, Object> request) {
        // Mock refresh: always success
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", "mock-new-access-token");
        response.put("refreshToken", "mock-new-refresh-token");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        // Mock logout: do nothing
        return ResponseEntity.ok().build();
    }
}
