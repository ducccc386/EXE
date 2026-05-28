package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Subjects")
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;
}
