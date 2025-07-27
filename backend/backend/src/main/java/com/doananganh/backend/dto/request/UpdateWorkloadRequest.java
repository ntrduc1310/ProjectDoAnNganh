package com.doananganh.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateWorkloadRequest {

    @NotNull(message = "User ID không được để trống")
    private Long userId;

    @NotNull(message = "Workload không được để trống")
    @Min(value = 0, message = "Workload tối thiểu là 0%")
    @Max(value = 100, message = "Workload tối đa là 100%")
    private Integer workload;

    // Getter & Setter
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getWorkload() {
        return workload;
    }

    public void setWorkload(Integer workload) {
        this.workload = workload;
    }
}
