package com.studyhub.api.dto;

import lombok.Data;

@Data
public class ApproveTutorRequest {
    private Long tutorProfileId;
    private String status; // Thường là "APPROVED" hoặc "REJECTED"
}
