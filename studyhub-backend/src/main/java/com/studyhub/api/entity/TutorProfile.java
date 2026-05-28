package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Tutor_Profiles")
@Data // Lombok sẽ tự động sinh Getter/Setter cho cả trường subjects mới thêm
public class TutorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(columnDefinition = "nvarchar(max)")
    private String bio;

    @Column(length = 255)
    private String education;

    @Column(name = "experience_years")
    private Integer experienceYears = 0;

    @Column(name = "teaching_method", columnDefinition = "nvarchar(max)")
    private String teachingMethod;

    @Column(name = "hourly_rate")
    private BigDecimal hourlyRate;

    @Column(length = 100)
    private String city;

    @Column(name = "teaching_mode", length = 20)
    private String teachingMode; // BOTH, OFFLINE, ONLINE

    private Boolean verified = false;

    @Column(name = "average_rating")
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // 🔥 THÊM MỐI QUAN HỆ NÀY: Kết nối trực tiếp sang bảng trung gian
    // Tutor_Subjects dưới DB
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "Tutor_Subjects", // Tên bảng trung gian trong SQL Server của bạn
            joinColumns = @JoinColumn(name = "tutor_profile_id"), // Khóa ngoại trỏ tới bảng này
            inverseJoinColumns = @JoinColumn(name = "subject_id") // Khóa ngoại trỏ tới bảng Subjects
    )
    private List<Subject> subjects;
}