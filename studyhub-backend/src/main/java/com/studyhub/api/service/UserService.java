package com.studyhub.api.service;

import org.springframework.stereotype.Service;

import com.studyhub.api.entity.User;
import com.studyhub.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Spring sẽ tự lấy BCryptPasswordEncoder bạn đã Bean

    public User login(String email, String rawPassword) {
        // 1. Tìm user theo email
        email = email.trim(); // Chuẩn hóa email trước khi tìm
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));

        // 2. Kiểm tra trạng thái tài khoản (Status trong SQL của bạn)
        if ("BANNED".equals(user.getStatus())) {
            throw new RuntimeException("Tài khoản của bạn đã bị khóa!");
        }

        // 3. So sánh mật khẩu (Quan trọng nhất)
        // rawPassword là mật khẩu người dùng gõ, user.getPassword() là chuỗi đã mã hóa
        // trong DB
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu không chính xác!");
        }
        if ("BANNED".equals(user.getStatus())) {
            throw new RuntimeException("Tài khoản này đã bị khóa!");
        }
        return user;
    }

    public User register(User user) {
        // Không cần gọi .encode() nữa nếu bạn muốn lưu thẳng
        // Hoặc giữ nguyên code cũ thì NoOpPasswordEncoder cũng sẽ lưu dạng thô
        return userRepository.save(user);
    }
}
