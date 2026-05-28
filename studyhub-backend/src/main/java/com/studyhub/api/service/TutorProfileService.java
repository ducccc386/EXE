package com.studyhub.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studyhub.api.dto.UpdateProfileRequest;
import com.studyhub.api.dto.UpdateSubjectsRequest;
import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.entity.TutorSubject;
import com.studyhub.api.repository.TutorProfileRepository;
import com.studyhub.api.repository.TutorSubjectRepository;

@Service
public class TutorProfileService {

    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    @Autowired
    private TutorSubjectRepository tutorSubjectRepository;

    // 1. Lấy thông tin hồ sơ theo userId
    public TutorProfile getProfileByUserId(Long userId) {
        return tutorProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ gia sư cho người dùng này!"));
    }

    // 2. Cập nhật hồ sơ cá nhân
    public TutorProfile updateProfile(UpdateProfileRequest request) {
        TutorProfile profile = tutorProfileRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ gia sư!"));

        profile.setBio(request.getBio());
        profile.setEducation(request.getEducation());
        profile.setExperienceYears(request.getExperienceYears());
        profile.setTeachingMethod(request.getTeachingMethod());
        profile.setHourlyRate(request.getHourlyRate());
        profile.setCity(request.getCity());
        profile.setTeachingMode(request.getTeachingMode());

        return tutorProfileRepository.save(profile);
    }

    // 3. Cập nhật danh sách môn học giảng dạy (Xử lý Transactional)
    @Transactional
    public void updateTutorSubjects(UpdateSubjectsRequest request) {
        // Xóa sạch các môn học đã đăng ký trước đó của Gia sư này
        tutorSubjectRepository.deleteByTutorProfileId(request.getTutorProfileId());

        // Thêm mới danh sách môn học đã chọn
        if (request.getSubjectIds() != null) {
            for (Long subjectId : request.getSubjectIds()) {
                TutorSubject tutorSubject = new TutorSubject();
                tutorSubject.setTutorProfileId(request.getTutorProfileId());
                tutorSubject.setSubjectId(subjectId);
                tutorSubjectRepository.save(tutorSubject);
            }
        }
    }

    public List<TutorProfile> getAllTutors() {
        return tutorProfileRepository.findAll();
    }

    public TutorProfile getProfileById(Long id) {
        return tutorProfileRepository.findById(id).orElse(null);
    }
}