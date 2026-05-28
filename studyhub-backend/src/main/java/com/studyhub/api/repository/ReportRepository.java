package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
    // Tìm các đơn tố cáo theo trạng thái (để Admin vào xem và xử lý các đơn
    // 'PENDING')
    List<Report> findByStatus(String status);
}