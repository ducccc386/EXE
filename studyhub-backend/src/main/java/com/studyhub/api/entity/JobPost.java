package com.studyhub.api.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "JobPosts")
@Data
@NoArgsConstructor
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    private String grade;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;

    private String address;
    private Double latitude;
    private Double longitude;

    private BigDecimal salaryPerSession;
    private Integer sessionsPerWeek;

    private String status = "OPEN"; // OPEN, IN_PROGRESS, CLOSED
    private LocalDateTime createdAt = LocalDateTime.now();
}
