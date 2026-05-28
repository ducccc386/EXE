package com.studyhub.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studyhub.api.dto.CreateReviewDto;
import com.studyhub.api.entity.Review;
import com.studyhub.api.repository.ReviewRepository;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    // 1. Lưu bài đánh giá mới của Phụ huynh
    public Review createReview(CreateReviewDto dto) {
        // Kiểm tra xem Booking này đã được đánh giá trước đó chưa
        if (reviewRepository.findByBookingId(dto.getBookingId()).isPresent()) {
            throw new RuntimeException("Lịch dạy này đã được đánh giá rồi, không thể đánh giá thêm!");
        }

        // Kiểm tra số sao hợp lệ
        if (dto.getRating() < 1 || dto.getRating() > 5) {
            throw new RuntimeException("Số sao đánh giá phải từ 1 đến 5!");
        }

        Review review = new Review();
        review.setBookingId(dto.getBookingId()); // Map chuẩn theo entity của bạn
        review.setParentId(dto.getParentId());
        review.setTutorProfileId(dto.getTutorProfileId());
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        return reviewRepository.save(review);
    }

    // 2. Xem danh sách đánh giá của một Gia sư
    public List<Review> getTutorReviews(Long tutorProfileId) {
        return reviewRepository.findByTutorProfileId(tutorProfileId);
    }

    // 3. Lấy điểm trung bình số sao của Gia sư
    public Double getTutorAverageRating(Long tutorProfileId) {
        Double avg = reviewRepository.getAverageRating(tutorProfileId);
        return avg != null ? avg : 0.0;
    }
}
