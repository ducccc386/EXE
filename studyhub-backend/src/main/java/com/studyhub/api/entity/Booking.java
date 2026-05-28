package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "tutor_profile_id", nullable = false)
    private Long tutorProfileId;

    @Column(name = "request_id", nullable = false)
    private Long requestId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(length = 20)
    private String status = "ACTIVE"; // CANCELLED, COMPLETED, ACTIVE

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
