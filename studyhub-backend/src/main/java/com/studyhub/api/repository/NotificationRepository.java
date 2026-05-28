package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Lấy toàn bộ thông báo của một người dùng, sắp xếp thông báo mới nhất lên đầu
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Lấy riêng danh sách thông báo chưa đọc
    List<Notification> findByUserIdAndIsReadOrderByCreatedAtDesc(Long userId, Boolean isRead);
}
