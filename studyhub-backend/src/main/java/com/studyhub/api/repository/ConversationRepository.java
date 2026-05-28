package com.studyhub.api.repository;

import com.studyhub.api.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    // Quản lý các cuộc hội thoại chat
    // Kiểm tra xem Phụ huynh và Gia sư này đã từng tạo phòng chat với nhau chưa
    Optional<Conversation> findByParentIdAndTutorProfileId(Long parentId, Long tutorProfileId);

    // Lấy tất cả các phòng chat của một người dùng bất kỳ (dù họ đóng vai trò là
    // Phụ huynh hay Gia sư)
    List<Conversation> findByParentIdOrTutorProfileId(Long parentId, Long tutorProfileId);
}
