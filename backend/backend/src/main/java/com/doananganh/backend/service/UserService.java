package com.doananganh.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doananganh.backend.dto.request.LoginRequest;
import com.doananganh.backend.dto.response.JwtResponse;
import com.doananganh.backend.entity.User;
import com.doananganh.backend.exception.CustomException;
import com.doananganh.backend.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new CustomException("Email đã tồn tại trong hệ thống");
        }
        
        if (user.getUsername() != null && userRepository.existsByUsername(user.getUsername())) {
            throw new CustomException("Username đã tồn tại trong hệ thống");
        }
        
        // user.setPassword(passwordEncoder.encode(user.getPassword()));  ← COMMENT
        user.setPassword(user.getPassword()); // ← TEMPORARY - NO ENCODING
        
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new CustomException("Không tìm thấy user với ID: " + id));
        
        // Update user fields with new structure
        if (userDetails.getFirstName() != null) {
            user.setFirstName(userDetails.getFirstName());
        }
        if (userDetails.getLastName() != null) {
            user.setLastName(userDetails.getLastName());
        }
        if (userDetails.getRole() != null) {
            user.setRole(userDetails.getRole());
        }
        if (userDetails.getDepartment() != null) {
            user.setDepartment(userDetails.getDepartment());
        }
        if (userDetails.getPosition() != null) {
            user.setPosition(userDetails.getPosition());
        }
        if (userDetails.getPhoneNumber() != null) {
            user.setPhoneNumber(userDetails.getPhoneNumber());
        }
        
        // Chỉ update password nếu có giá trị mới
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(userDetails.getPassword());
        }
        
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new CustomException("Không tìm thấy user với ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new CustomException("Email hoặc mật khẩu không đúng"));
        
        if (!loginRequest.getPassword().equals(user.getPassword())) {
            throw new CustomException("Email hoặc mật khẩu không đúng");
        }
        
        // Tạo JWT token (mock cho hiện tại)
        String token = "jwt-token-" + user.getId() + "-" + System.currentTimeMillis();
        
        return JwtResponse.builder()
            .accessToken(token)
            .tokenType("Bearer")
            .id(user.getId())
            .email(user.getEmail())
            .fullName(user.getFullName()) // getFullName() method exists in User entity
            .role(user.getRole().name()) // Convert enum to String
            .expiresIn(86400L) // 24 hours
            .build();
    }

    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }

    public long countUsersByRole(User.Role role) {
        return userRepository.countByRole(role);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public List<User> getActiveUsers() {
        return userRepository.findActiveUsers();
    }
}
