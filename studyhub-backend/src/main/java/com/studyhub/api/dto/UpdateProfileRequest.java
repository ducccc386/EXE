package com.studyhub.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class UpdateProfileRequest {
    private Long userId; // ID của User đang đăng nhập
    private String bio;
    private String education;
    private Integer experienceYears;
    private String teachingMethod;
    private BigDecimal hourlyRate;
    private String city;
    private String teachingMode; // BOTH, OFFLINE, ONLINE
}