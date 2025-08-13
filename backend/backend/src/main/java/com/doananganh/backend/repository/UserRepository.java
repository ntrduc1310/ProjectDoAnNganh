package com.doananganh.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
    
    List<User> findByRole(User.Role role);
    
    List<User> findByDepartment(String department);
    
    @Query("SELECT u FROM User u WHERE u.role IN :roles")
    List<User> findByRoles(@Param("roles") List<User.Role> roles);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.enabled = true")
    List<User> findActiveUsers();
    
    // Enhanced methods for Load Balancing
    List<User> findByStatus(String status);
    
    List<User> findByStatusAndRole(String status, User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.status = :status AND u.role = 'USER'")
    List<User> findAvailableUsers(@Param("status") String status);
}
