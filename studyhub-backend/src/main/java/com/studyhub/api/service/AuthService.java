package com.studyhub.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.entity.User;
import com.studyhub.api.repository.TutorProfileRepository;
import com.studyhub.api.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    // 1. LOGIC ĐĂNG KÝ
    @Transactional
    public User register(User user) {
        // Kiểm tra trùng lặp email
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email này đã được đăng ký trong hệ thống!");
        }

        // Cài đặt các giá trị mặc định cho User mới
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Lưu User vào database
        User savedUser = userRepository.save(user);

        // NẾU LÀ GIA SƯ (TUTOR): Tự động tạo bản ghi Profile rỗng liên kết với User này
        if ("TUTOR".equalsIgnoreCase(savedUser.getRole())) {
            TutorProfile profile = new TutorProfile();
            profile.setUserId(savedUser.getId()); // Khóa ngoại kết nối sang bảng Users
            tutorProfileRepository.save(profile);
        }

        return savedUser;
    }

    // 2. LOGIC ĐĂNG NHẬP
    public User login(String email, String password) {
        // Tìm user theo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không chính xác!"));

        // Kiểm tra mật khẩu (Tạm thời so sánh chuỗi thô theo cấu hình permitAll hiện
        // tại của bạn)
        if (!user.getPasswordHash().equals(password)) {
            throw new RuntimeException("Email hoặc mật khẩu không chính xác!");
        }

        // Kiểm tra xem tài khoản có bị Admin khóa (BANNED) không
        if ("BANNED".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Tài khoản của bạn đã bị khóa do vi phạm điều khoản!");
        }

        return user;
    }
}