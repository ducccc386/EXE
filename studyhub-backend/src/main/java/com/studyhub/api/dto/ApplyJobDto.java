package com.studyhub.api.dto;

import lombok.Data;

@Data
public class ApplyJobDto {
    private Long requestId; // ID bài đăng của phụ huynh
    private Long tutorProfileId; // ID hồ sơ của gia sư đi ứng tuyển
    private String message; // Lời nhắn gửi tới phụ huynh
}