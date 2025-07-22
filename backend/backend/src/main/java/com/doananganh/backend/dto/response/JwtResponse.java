package com.doananganh.backend.dto.response;

import java.util.Objects;

public class JwtResponse {
    private String accessToken;
    private String tokenType;
    private Long id;
    private String email;
    private String fullName;
    private String role;
    
    // Có thể thêm refresh token sau
    private String refreshToken;
    private Long expiresIn; // seconds

    // Constructors
    public JwtResponse() {}

    public JwtResponse(String accessToken, String tokenType, Long id, String email, 
                      String fullName, String role) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }

    public JwtResponse(String accessToken, String tokenType, Long id, String email, 
                      String fullName, String role, String refreshToken, Long expiresIn) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }

    // Builder pattern thủ công
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final JwtResponse response = new JwtResponse();

        public Builder accessToken(String accessToken) {
            response.accessToken = accessToken;
            return this;
        }

        public Builder tokenType(String tokenType) {
            response.tokenType = tokenType;
            return this;
        }

        public Builder id(Long id) {
            response.id = id;
            return this;
        }

        public Builder email(String email) {
            response.email = email;
            return this;
        }

        public Builder fullName(String fullName) {
            response.fullName = fullName;
            return this;
        }

        public Builder role(String role) {
            response.role = role;
            return this;
        }

        public Builder refreshToken(String refreshToken) {
            response.refreshToken = refreshToken;
            return this;
        }

        public Builder expiresIn(Long expiresIn) {
            response.expiresIn = expiresIn;
            return this;
        }

        public JwtResponse build() {
            // Set default values
            if (response.tokenType == null) {
                response.tokenType = "Bearer";
            }
            if (response.expiresIn == null) {
                response.expiresIn = 86400L; // 24 hours default
            }
            return response;
        }
    }

    // Getters
    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getRole() {
        return role;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    // Setters
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    // toString - ẩn sensitive data
    @Override
    public String toString() {
        return "JwtResponse{" +
                "accessToken='[PROTECTED]'" +
                ", tokenType='" + tokenType + '\'' +
                ", id=" + id +
                ", email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", role='" + role + '\'' +
                ", refreshToken='[PROTECTED]'" +
                ", expiresIn=" + expiresIn +
                '}';
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JwtResponse that = (JwtResponse) o;
        return Objects.equals(accessToken, that.accessToken) &&
               Objects.equals(tokenType, that.tokenType) &&
               Objects.equals(id, that.id) &&
               Objects.equals(email, that.email) &&
               Objects.equals(fullName, that.fullName) &&
               Objects.equals(role, that.role) &&
               Objects.equals(refreshToken, that.refreshToken) &&
               Objects.equals(expiresIn, that.expiresIn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accessToken, tokenType, id, email, fullName, role, refreshToken, expiresIn);
    }
}