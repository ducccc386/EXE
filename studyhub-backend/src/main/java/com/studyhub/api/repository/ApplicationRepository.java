package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // Lấy danh sách gia sư đã ứng tuyển vào 1 bài đăng cụ thể (để phụ huynh duyệt)
    List<Application> findByRequestId(Long requestId);

    // Lấy danh sách lịch sử đi ứng tuyển lớp của 1 gia sư
    List<Application> findByTutorProfileId(Long tutorProfileId);
}