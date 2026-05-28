package com.studyhub.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.studyhub.api.dto.ApplyJobDto;
import com.studyhub.api.dto.CreateRequestDto;
import com.studyhub.api.entity.Application;
import com.studyhub.api.entity.ParentRequest;
import com.studyhub.api.service.TutorJobService;

import java.util.List;

@RestController
@RequestMapping("/api/tutorhub")
@CrossOrigin(origins = "*")
public class TutorJobController {
    @Autowired
    private TutorJobService jobService;

    // API 1: Phụ huynh đăng bài tìm gia sư
    @PostMapping("/requests/create")
    public ResponseEntity<?> createRequest(@RequestBody CreateRequestDto dto) {
        try {
            ParentRequest created = jobService.createParentRequest(dto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API 2: Lấy tất cả lớp đang cần gia sư (Hiển thị trang chủ Tìm Việc)
    @GetMapping("/requests/open")
    public ResponseEntity<List<ParentRequest>> getAllOpenRequests() {
        return ResponseEntity.ok(jobService.getOpenRequests());
    }

    // API 3: Gia sư nộp đơn ứng tuyển
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestBody ApplyJobDto dto) {
        try {
            Application app = jobService.applyJob(dto);
            return ResponseEntity.ok(app);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API 4: Phụ huynh bấm "Chốt chọn gia sư này"
    @PutMapping("/applications/{appId}/accept")
    public ResponseEntity<?> acceptTutor(@PathVariable Long appId) {
        try {
            jobService.acceptTutorApplication(appId);
            return ResponseEntity.ok("Đã duyệt gia sư thành công! Trạng thái lớp chuyển sang MATCHED.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
