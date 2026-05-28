package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.ParentRequest;

public interface ParentRequestRepository extends JpaRepository<ParentRequest, Long> {
    // Tìm tất cả bài đăng theo trạng thái (ví dụ: lấy danh sách lớp 'OPEN' cho gia
    // sư xem)
    List<ParentRequest> findByStatus(String status);

    // Lấy danh sách lịch sử đăng tin của một phụ huynh cụ thể
    List<ParentRequest> findByParentId(Long parentId);
}
