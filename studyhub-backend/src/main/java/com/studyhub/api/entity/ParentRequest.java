package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Parent_Requests")
@Data
public class ParentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "subject_id", nullable = false)
    private Long subjectId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "nvarchar(max)")
    private String description;

    @Column(length = 50)
    private String grade;

    private BigDecimal budget;

    @Column(length = 100)
    private String city;

    @Column(name = "address_detail", length = 255)
    private String addressDetail;

    @Column(name = "teaching_mode", length = 20)
    private String teachingMode; // OFFLINE, ONLINE

    @Column(name = "sessions_per_week")
    private Integer sessionsPerWeek;

    @Column(name = "schedule_info", length = 255)
    private String scheduleInfo;

    @Column(length = 20)
    private String status = "OPEN"; // CLOSED, MATCHED, OPEN

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
