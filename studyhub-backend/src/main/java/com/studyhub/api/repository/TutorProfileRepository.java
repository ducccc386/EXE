package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studyhub.api.entity.TutorProfile;

@Repository
public interface TutorProfileRepository extends JpaRepository<TutorProfile, Integer> {
    // Tìm gia sư theo môn học (Query trên bảng trung gian)
    List<TutorProfile> findBySubjects_Id(Integer subjectId);
    // Thêm hàm này để hết lỗi ở Controller

}