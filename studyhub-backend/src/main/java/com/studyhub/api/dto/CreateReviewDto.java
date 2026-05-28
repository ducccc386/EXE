package com.studyhub.api.dto;

import lombok.Data;

@Data
public class CreateReviewDto {
    private Long bookingId; // Sửa thành bookingId theo entity của bạn
    private Long parentId;
    private Long tutorProfileId;
    private Integer rating;
    private String comment;
}