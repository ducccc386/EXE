package com.studyhub.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.studyhub.api.dto.UpdateProfileRequest;
import com.studyhub.api.dto.UpdateSubjectsRequest;
import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.service.TutorProfileService;

@RestController
@RequestMapping("/api/tutor")
@CrossOrigin(origins = "*")
public class TutorProfileController {

    @Autowired
    private TutorProfileService tutorProfileService;

    // API: Lấy thông tin hồ sơ gia sư của User hiện tại để hiển thị lên Form chỉnh
    // sửa
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            TutorProfile profile = tutorProfileService.getProfileByUserId(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API: Lưu cập nhật thông tin hồ sơ cá nhân
    @PutMapping("/profile/update")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request) {
        try {
            TutorProfile updatedProfile = tutorProfileService.updateProfile(request);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API: Đăng ký các môn học sẽ dạy
    @PostMapping("/subjects/update")
    public ResponseEntity<?> updateSubjects(@RequestBody UpdateSubjectsRequest request) {
        try {
            tutorProfileService.updateTutorSubjects(request);
            return ResponseEntity.ok("Cập nhật danh sách môn học giảng dạy thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTutors() {
        try {
            // Gọi xuống Service/Repository lấy toàn bộ danh sách Gia sư
            // Nếu Service của bạn chưa có hàm này, bạn có thể gọi tạm trực tiếp qua
            // Repository: tutorProfileRepository.findAll()
            return ResponseEntity.ok(tutorProfileService.getAllTutors());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}