package com.studyhub.api.controller;

import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Cấp quyền cho Vite ReactJS gọi API
public class TutorController {

    private final MatchingService matchingService;

    // Lấy toàn bộ danh sách gia sư (Dùng cho trang chủ)
    @GetMapping
    public ResponseEntity<List<TutorProfile>> getAllTutors() {
        return ResponseEntity.ok(matchingService.getAllTutors());
    }

    // API Matching: Tìm gia sư theo môn học và khoảng cách
    @GetMapping("/match")
    public ResponseEntity<List<TutorProfile>> matchTutors(
            @RequestParam Integer subjectId,
            @RequestParam Double lat,
            @RequestParam Double lon,
            @RequestParam(defaultValue = "10.0") Double maxKm) {

        List<TutorProfile> matched = matchingService.matchTutors(subjectId, lat, lon, maxKm);
        return ResponseEntity.ok(matched);
    }
}