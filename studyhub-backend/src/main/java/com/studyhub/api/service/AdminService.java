package com.studyhub.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studyhub.api.dto.ApproveTutorRequest;
import com.studyhub.api.dto.UpdateRequestStatusDto;
import com.studyhub.api.entity.ParentRequest;
import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.entity.User;
import com.studyhub.api.repository.ParentRequestRepository;
import com.studyhub.api.repository.TutorProfileRepository;
import com.studyhub.api.repository.UserRepository;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    @Autowired
    private ParentRequestRepository parentRequestRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. Xem toàn bộ hồ sơ gia sư (Dành cho giao diện quản trị của Admin)
    public List<TutorProfile> getAllTutorProfiles() {
        return tutorProfileRepository.findAll();
    }

    // 2. Admin duyệt hoặc từ chối gia sư (Cập nhật trực tiếp vào trường status của
    // bảng Users gốc)
    @Transactional
    public User approveTutorProfile(ApproveTutorRequest request) {
        // Tìm hồ sơ gia sư theo tutorProfileId gửi từ Postman lên
        TutorProfile profile = tutorProfileRepository.findById(request.getTutorProfileId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ gia sư!"));

        // Tìm tài khoản User sở hữu hồ sơ này dựa trên trường userId liên kết
        User user = userRepository.findById(profile.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản người dùng liên kết với hồ sơ này!"));

        // Cập nhật trạng thái hoạt động dựa trên lệnh duyệt của Admin
        if ("APPROVED".equalsIgnoreCase(request.getStatus())) {
            user.setStatus("ACTIVE"); // Cho phép tài khoản hoạt động bình thường
        } else if ("REJECTED".equalsIgnoreCase(request.getStatus())) {
            user.setStatus("INACTIVE"); // Đổi trạng thái ngừng hoạt động
        } else {
            user.setStatus(request.getStatus().toUpperCase()); // Các trường hợp khác (ví dụ: BANNED)
        }

        return userRepository.save(user);
    }

    // 3. Xem tất cả các bài đăng tìm gia sư của Phụ huynh
    public List<ParentRequest> getAllParentRequests() {
        return parentRequestRepository.findAll();
    }

    // 4. Admin can thiệp thay đổi trạng thái bài đăng (Ví dụ: Đóng bài viết vi
    // phạm, gỡ bài lừa đảo)
    public ParentRequest updateRequestStatus(UpdateRequestStatusDto dto) {
        ParentRequest pr = parentRequestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài đăng yêu cầu!"));

        pr.setStatus(dto.getStatus().toUpperCase());
        return parentRequestRepository.save(pr);
    }

    // 5. Khóa hoặc Mở khóa trực tiếp tài khoản người dùng bất kỳ theo ID (BANNED /
    // ACTIVE)
    @Transactional
    public void updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

        user.setStatus(status.toUpperCase());
        userRepository.save(user);
    }
}
