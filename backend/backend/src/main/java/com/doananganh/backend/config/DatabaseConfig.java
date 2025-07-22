package com.doananganh.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.doananganh.backend.repository")
@EnableJpaAuditing
@EnableTransactionManagement
public class DatabaseConfig {
    
    // JPA configuration is handled by Spring Boot auto-configuration
    // This class is for explicit configuration if needed
    
}
