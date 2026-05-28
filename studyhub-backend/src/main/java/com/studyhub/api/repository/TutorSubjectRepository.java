package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.TutorSubject;
import com.studyhub.api.entity.TutorSubjectId;

public interface TutorSubjectRepository extends JpaRepository<TutorSubject, TutorSubjectId> {
    // Tìm danh sách ID môn học mà một gia sư có thể dạy
    List<TutorSubject> findByTutorProfileId(Long tutorProfileId);

    // Xóa liên kết môn học cũ khi gia sư cập nhật lại hồ sơ
    void deleteByTutorProfileId(Long tutorProfileId);
}