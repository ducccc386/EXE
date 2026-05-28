package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reviews")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_id", nullable = false, unique = true)
    private Long bookingId;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "tutor_profile_id", nullable = false)
    private Long tutorProfileId;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "nvarchar(max)")
    private String comment;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
