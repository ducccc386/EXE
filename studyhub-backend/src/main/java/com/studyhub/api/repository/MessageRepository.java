package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    // Lấy toàn bộ lịch sử tin nhắn của một cuộc trò chuyện, sắp xếp theo thời gian
    // tăng dần
    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);

    // Đếm số lượng tin nhắn chưa đọc của một user trong cuộc trò chuyện
    long countByConversationIdAndSenderIdNotAndIsSeen(Long conversationId, Long senderId, Boolean isSeen);
}
