package com.doananganh.backend.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {
    
    private List<String> allowedOrigins;
    private Long maxAge;
    
    // Constructors
    public CorsProperties() {}
    
    // Getters
    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }
    
    public Long getMaxAge() {
        return maxAge;
    }
    
    // Setters
    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }
    
    public void setMaxAge(Long maxAge) {
        this.maxAge = maxAge;
    }
}