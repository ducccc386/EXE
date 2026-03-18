package com.studyhub.api.entity;

import java.time.LocalDateTime;

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
@Table(name = "Applications")
@Data
@NoArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private JobPost job;

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private User tutor; // User có role TUTOR

    private LocalDateTime appliedAt = LocalDateTime.now();
    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED
}
