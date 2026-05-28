package com.studyhub.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.studyhub.api.entity.Subject;
import com.studyhub.api.repository.SubjectRepository;

import java.util.List;

@Service // Đánh dấu đây là Service duy nhất xử lý nghiệp vụ Môn học
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    // Viết trực tiếp logic hàm xử lý lấy danh sách tại đây
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
}