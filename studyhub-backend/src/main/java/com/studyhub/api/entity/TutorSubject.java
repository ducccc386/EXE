package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Tutor_Subjects")
@IdClass(TutorSubjectId.class)
@Data
public class TutorSubject {
    @Id
    @Column(name = "tutor_profile_id")
    private Long tutorProfileId;

    @Id
    @Column(name = "subject_id")
    private Long subjectId;
}
