package com.studyhub.api.service;

import org.springframework.stereotype.Service;

import com.studyhub.api.entity.User;
import com.studyhub.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User register(User user) {
        // Sau này sẽ thêm mã hóa Password ở đây (Giai đoạn 3)
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Sai email hoặc mật khẩu!"));
    }
}
