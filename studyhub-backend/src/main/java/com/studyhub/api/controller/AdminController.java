package com.studyhub.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.studyhub.api.dto.ApproveTutorRequest;
import com.studyhub.api.dto.UpdateRequestStatusDto;
import com.studyhub.api.entity.ParentRequest;
import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.entity.User;
import com.studyhub.api.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminService adminService;

    // API 1: Lấy danh sách tất cả hồ sơ gia sư để hiển thị lên bảng quản trị
    @GetMapping("/tutors")
    public ResponseEntity<List<TutorProfile>> getAllTutors() {
        return ResponseEntity.ok(adminService.getAllTutorProfiles());
    }

    // API 2: Phê duyệt trạng thái gia sư (Trả về thông tin User gốc sau khi đã
    // update status)
    @PutMapping("/tutors/approve")
    public ResponseEntity<?> approveTutor(@RequestBody ApproveTutorRequest request) {
        try {
            User updatedUser = adminService.approveTutorProfile(request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API 3: Lấy toàn bộ danh sách bài đăng tìm gia sư của phụ huynh
    @GetMapping("/requests")
    public ResponseEntity<List<ParentRequest>> getAllRequests() {
        return ResponseEntity.ok(adminService.getAllParentRequests());
    }

    // API 4: Thay đổi trạng thái bài đăng bất kỳ bằng Request Body (Ví dụ: CLOSED,
    // BANNED)
    @PutMapping("/requests/status")
    public ResponseEntity<?> updateRequestStatus(@RequestBody UpdateRequestStatusDto dto) {
        try {
            ParentRequest updated = adminService.updateRequestStatus(dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API 5: Khóa hoặc mở khóa tài khoản người dùng bất kỳ qua Path Variable và
    // Request Param
    @PutMapping("/users/{userId}/ban")
    public ResponseEntity<?> banUser(@PathVariable Long userId, @RequestParam String status) {
        try {
            adminService.updateUserStatus(userId, status);
            return ResponseEntity.ok("Cập nhật trạng thái tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
