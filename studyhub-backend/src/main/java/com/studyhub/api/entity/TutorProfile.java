package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "TutorProfiles")
@Data
@NoArgsConstructor
public class TutorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String bio;

    private String education;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String experienceSummary;

    private BigDecimal hourlyRateMin;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "average_rating")
    private Double averageRating = 0.0;

    // --- Dữ liệu để tính Personality Score (Matching Algorithm) ---
    private Integer patienceLevel = 5; // Thang điểm 1-10
    private Integer communicationStyle = 5; // 1: Nghiêm khắc, 10: Vui vẻ
    private Integer teachingSpeed = 5; // 1: Chậm, 10: Nhanh

    // --- Dữ liệu bổ trợ Matching ---
    private Integer totalReviews = 0;
    private String identityCardNumber;

    // QUAN TRỌNG: Sử dụng đúng Class Subject của dự án
    @ManyToMany
    @JoinTable(name = "Tutor_Subjects", joinColumns = @JoinColumn(name = "tutor_id"), inverseJoinColumns = @JoinColumn(name = "subject_id"))
    private Set<Subject> subjects = new HashSet<>();
}