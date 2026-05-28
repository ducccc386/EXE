package com.studyhub.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studyhub.api.dto.ApplyJobDto;
import com.studyhub.api.dto.CreateRequestDto;
import com.studyhub.api.entity.Application;
import com.studyhub.api.entity.ParentRequest;
import com.studyhub.api.repository.ApplicationRepository;
import com.studyhub.api.repository.ParentRequestRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TutorJobService {

    @Autowired
    private ParentRequestRepository requestRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    // 1. Phụ huynh đăng tin tìm gia sư
    public ParentRequest createParentRequest(CreateRequestDto dto) {
        ParentRequest request = new ParentRequest();
        request.setParentId(dto.getParentId());
        request.setSubjectId(dto.getSubjectId());
        request.setTitle(dto.getTitle());
        request.setDescription(dto.getDescription());
        request.setGrade(dto.getGrade());
        request.setBudget(dto.getBudget());
        request.setCity(dto.getCity());
        request.setAddressDetail(dto.getAddressDetail());
        request.setTeachingMode(dto.getTeachingMode());
        request.setSessionsPerWeek(dto.getSessionsPerWeek());
        request.setScheduleInfo(dto.getScheduleInfo());
        request.setStatus("OPEN"); // Mặc định mở để gia sư thấy
        request.setCreatedAt(LocalDateTime.now());

        return requestRepository.save(request);
    }

    // 2. Lấy danh sách bài đăng đang OPEN cho gia sư chọn việc
    public List<ParentRequest> getOpenRequests() {
        return requestRepository.findByStatus("OPEN");
    }

    // 3. Gia sư bấm ứng tuyển vào lớp
    public Application applyJob(ApplyJobDto dto) {
        // Kiểm tra xem bài đăng đó có thực sự đang mở không
        ParentRequest pr = requestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài đăng tuyển gia sư này!"));

        if (!"OPEN".equalsIgnoreCase(pr.getStatus())) {
            throw new RuntimeException("Lớp học này hiện đã đóng hoặc đã tìm được gia sư!");
        }

        Application app = new Application();
        app.setRequestId(dto.getRequestId());
        app.setTutorProfileId(dto.getTutorProfileId());
        app.setMessage(dto.getMessage());
        app.setStatus("PENDING"); // Chờ phụ huynh duyệt
        app.setCreatedAt(LocalDateTime.now());

        return applicationRepository.save(app);
    }

    // 4. Phụ huynh chốt duyệt gia sư (Chuyển trạng thái bài đăng & đơn ứng tuyển)
    @Transactional
    public void acceptTutorApplication(Long applicationId) {
        Application currentApp = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển!"));

        // Chuyển trạng thái đơn được chọn thành ACCEPTED
        currentApp.setStatus("ACCEPTED");
        applicationRepository.save(currentApp);

        // Chuyển trạng thái bài đăng gốc từ OPEN -> MATCHED (Đã tìm được người)
        ParentRequest pr = requestRepository.findById(currentApp.getRequestId())
                .orElseThrow(() -> new RuntimeException("Bài đăng liên quan không tồn tại!"));
        pr.setStatus("MATCHED");
        requestRepository.save(pr);

        // [Tùy chọn nâng cao] Tự động từ chối (REJECTED) tất cả các gia sư khác cùng
        // nộp vào lớp này
        List<Application> otherApps = applicationRepository.findByRequestId(pr.getId());
        for (Application app : otherApps) {
            if (!app.getId().equals(applicationId) && "PENDING".equalsIgnoreCase(app.getStatus())) {
                app.setStatus("REJECTED");
                applicationRepository.save(app);
            }
        }
    }
}
