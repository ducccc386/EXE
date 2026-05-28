package com.studyhub.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm kiếm user bằng email để phục vụ luồng Đăng nhập
    Optional<User> findByEmail(String email);

    // Kiểm tra email đã tồn tại khi Đăng ký chưa
    boolean existsByEmail(String email);
}