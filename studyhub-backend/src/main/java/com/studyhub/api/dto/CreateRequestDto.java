package com.studyhub.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateRequestDto {
    private Long parentId; // ID của phụ huynh đăng bài (từ bảng Users)
    private Long subjectId; // ID môn học muốn tìm (ví dụ: 1 cho Toán)
    private String title; // Tiêu đề bài đăng
    private String description; // Mô tả chi tiết yêu cầu
    private String grade; // Lớp học (Ví dụ: Lớp 9, Ôn thi Đại Học)
    private BigDecimal budget; // Học phí dự kiến / giờ
    private String city; // Thành phố
    private String addressDetail;// Địa chỉ cụ thể
    private String teachingMode; // ONLINE hoặc OFFLINE
    private Integer sessionsPerWeek; // Số buổi dạy 1 tuần
    private String scheduleInfo; // Lịch rảnh yêu cầu (Ví dụ: Tối t2, t4)
}