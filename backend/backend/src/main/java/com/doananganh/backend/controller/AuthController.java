package com.doananganh.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth") // ✅ REMOVE /api PREFIX
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5175", "http://localhost:5176"})
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Mock response for now
        return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "*")
            .body("{\"token\":\"mock-token\",\"user\":{\"id\":1,\"email\":\"" + request.getEmail() + "\",\"name\":\"Test User\"}}");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "*")
            .body("{\"message\":\"User registered successfully\"}");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "*")
            .body("{\"message\":\"Logged out successfully\"}");
    }

    // ✅ HANDLE OPTIONS REQUESTS
    @RequestMapping(method = RequestMethod.OPTIONS, value = "/**")
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            .header("Access-Control-Allow-Headers", "*")
            .build();
    }

    // ✅ REQUEST CLASSES
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String fullName;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
    }
}