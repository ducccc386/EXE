package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reports")
@Data
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reporter_id", nullable = false)
    private Long reporterId;

    @Column(name = "target_user_id", nullable = false)
    private Long targetUserId;

    @Column(columnDefinition = "nvarchar(max)")
    private String reason;

    @Column(length = 20)
    private String status = "PENDING"; // REJECTED, RESOLVED, PENDING

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
