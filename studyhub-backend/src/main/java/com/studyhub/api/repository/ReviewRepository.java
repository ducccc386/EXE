package com.studyhub.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.studyhub.api.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Tìm đánh giá của một hợp đồng (kiểm tra xem lớp này đã được phụ huynh đánh
    // giá chưa)
    Optional<Review> findByBookingId(Long bookingId);

    // Lấy toàn bộ các đánh giá của 1 gia sư (để hiển thị lên hồ sơ và tính điểm
    // trung bình)
    List<Review> findByTutorProfileId(Long tutorProfileId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.tutorProfileId = :tutorProfileId")
    Double getAverageRating(@Param("tutorProfileId") Long tutorProfileId);
}