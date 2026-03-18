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
@Table(name = "Certificates")
@Data
@NoArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private TutorProfile tutorProfile;

    private String certificateType; // CCCD, Student_Card, IELTS...
    private String identityNumber;
    private String imageFrontUrl;
    private String imageBackUrl;
    private Float faceMatchPercentage;

    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private LocalDateTime verifiedAt;
}
