package com.studyhub.api.controller;

import com.studyhub.api.dto.GetOrCreateConversationDto;
import com.studyhub.api.entity.Conversation;
import com.studyhub.api.entity.Message;
import com.studyhub.api.repository.ConversationRepository;
import com.studyhub.api.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    // ================= 1. CHAT REAL-TIME (WEBSOCKET) =================
    @MessageMapping("/chat.send")
    public void sendMessage(Message message) {
        message.setCreatedAt(LocalDateTime.now());
        message.setIsSeen(false);

        // Lưu tin nhắn mới vào bảng Messages
        Message savedMessage = messageRepository.save(message);

        // Phát tán tin nhắn thời gian thực vào đúng phòng chat qua WebSocket
        messagingTemplate.convertAndSend(
                "/topic/conversation/" + message.getConversationId(),
                savedMessage);
    }

    // ================= 2. QUẢN LÝ CUỘC HỘI THOẠI (HTTP API) =================

    // API: Lấy phòng chat cũ nếu đã tồn tại, hoặc tự tạo phòng mới nếu nhắn lần đầu
    @PostMapping("/api/chat/conversations/get-or-create")
    public ResponseEntity<?> getOrCreateConversation(@RequestBody GetOrCreateConversationDto dto) {
        try {
            Optional<Conversation> existing = conversationRepository.findByParentIdAndTutorProfileId(
                    dto.getParentId(), dto.getTutorProfileId());

            if (existing.isPresent()) {
                return ResponseEntity.ok(existing.get());
            }

            Conversation newConversation = new Conversation();
            newConversation.setParentId(dto.getParentId());
            newConversation.setTutorProfileId(dto.getTutorProfileId());

            return ResponseEntity.ok(conversationRepository.save(newConversation));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API: Lấy danh sách toàn bộ các phòng chat của một User để hiện lên danh sách
    // tin nhắn
    @GetMapping("/api/chat/conversations/user/{userId}")
    public ResponseEntity<List<Conversation>> getUserConversations(@PathVariable Long userId) {
        return ResponseEntity.ok(conversationRepository.findByParentIdOrTutorProfileId(userId, userId));
    }

    // API: Lấy lịch sử chat của một phòng chat cụ thể
    @GetMapping("/api/chat/history/{conversationId}")
    public ResponseEntity<List<Message>> getChatHistory(@PathVariable Long conversationId) {
        return ResponseEntity.ok(messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId));
    }
}