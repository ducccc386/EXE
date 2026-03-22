package com.studyhub.api.controller;

import com.studyhub.api.entity.User;
import com.studyhub.api.dto.LoginRequest; // Thêm DTO
import com.studyhub.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Khớp với port Vite/React của bạn
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) { // Dùng @RequestBody để nhận JSON từ React
        try {
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

            // Chỉ trả về những thông tin cần thiết để React xử lý
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("fullName", user.getFullName());
            response.put("email", user.getEmail());

            // Lấy Role Name từ bảng Roles để React navigate chuẩn
            // Giả sử trong User Entity bạn đã Map @ManyToOne với Role
            response.put("role", user.getRole().getRoleName());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Trả về lỗi 401 nếu sai pass/email hoặc tài khoản bị BANNED
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}