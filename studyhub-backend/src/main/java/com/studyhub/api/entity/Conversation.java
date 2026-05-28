package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Conversations")
@Data
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId; // ID của phụ huynh tham gia chat

    @Column(name = "tutor_profile_id", nullable = false)
    private Long tutorProfileId; // ID của gia sư tham gia chat

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
