package com.studyhub.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class UpdateSubjectsRequest {
    private Long tutorProfileId; // ID của Profile gia sư
    private List<Long> subjectIds; // Danh sách ID các môn học chọn dạy (ví dụ: [1, 2, 5])
}