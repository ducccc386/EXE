package com.studyhub.api.controller;

import com.studyhub.api.dto.CreateReviewDto;
import com.studyhub.api.entity.Review;
import com.studyhub.api.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // API 1: Phụ huynh gửi đánh giá cho gia sư
    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestBody CreateReviewDto dto) {
        try {
            Review savedReview = reviewService.createReview(dto);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API 2: Lấy toàn bộ nhận xét của một gia sư
    @GetMapping("/tutor/{tutorProfileId}")
    public ResponseEntity<List<Review>> getTutorReviews(@PathVariable Long tutorProfileId) {
        return ResponseEntity.ok(reviewService.getTutorReviews(tutorProfileId));
    }

    // API 3: Lấy điểm rating trung bình của gia sư
    @GetMapping("/tutor/{tutorProfileId}/average")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long tutorProfileId) {
        return ResponseEntity.ok(reviewService.getTutorAverageRating(tutorProfileId));
    }
}
