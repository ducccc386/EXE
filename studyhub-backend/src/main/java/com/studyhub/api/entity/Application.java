package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Applications")
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_id", nullable = false)
    private Long requestId;

    @Column(name = "tutor_profile_id", nullable = false)
    private Long tutorProfileId;

    @Column(columnDefinition = "nvarchar(max)")
    private String message;

    @Column(length = 20)
    private String status = "PENDING"; // REJECTED, ACCEPTED, PENDING

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
