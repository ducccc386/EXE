package com.studyhub.api.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TutorSubjectId implements Serializable {
    private Long tutorProfileId;
    private Long subjectId;
}
