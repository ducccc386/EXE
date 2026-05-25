/**
 * api/chatApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * API calls cho tính năng Chat / Messaging.
 *
 * Spring Boot endpoints:
 *   GET  /api/chat/friends                      → FriendDTO[]
 *   GET  /api/chat/messages/:friendId?page=&size= → MessageDTO[] (paginated)
 *   POST /api/chat/messages                     → gửi tin nhắn (REST fallback)
 *   PUT  /api/chat/messages/:friendId/read      → đánh dấu đã đọc
 *   GET  /api/chat/unread-count                 → { count: number }
 *   WS   /ws/chat?token=<jwt>                   → STOMP over WebSocket
 *
 * FriendDTO  : { id, fullName, role, avatar, lastMessage, lastMessageTime, unread, online }
 * MessageDTO : { id, senderId, receiverId, content, time, type: "text"|"image"|"file" }
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

// ── REST API ──────────────────────────────────────────────────────────────────

/** Lấy danh sách bạn bè / người có thể nhắn tin */
export async function getFriends() {
  const { data } = await apiClient.get(API_ENDPOINTS.CHAT.FRIENDS);
  return data;
}

/**
 * Lấy lịch sử tin nhắn với một user (paginated).
 * @param {string} friendId
 * @param {number} page  - 0-indexed
 * @param {number} size  - số tin nhắn mỗi trang
 */
export async function getMessages(friendId, page = 0, size = 50) {
  const { data } = await apiClient.get(API_ENDPOINTS.CHAT.MESSAGES(friendId), {
    params: { page, size },
  });
  return data;
}

/**
 * Gửi tin nhắn qua REST (fallback khi WebSocket không khả dụng).
 * Body: { receiverId, content }  →  MessageDTO
 */
export async function sendMessageRest(receiverId, content) {
  const { data } = await apiClient.post(API_ENDPOINTS.CHAT.SEND, {
    receiverId,
    content,
  });
  return data;
}

/** Đánh dấu đã đọc tất cả tin nhắn từ một người */
export async function markAsRead(friendId) {
  await apiClient.put(API_ENDPOINTS.CHAT.MARK_READ(friendId));
}

/** Lấy số tin nhắn chưa đọc → { count: number } */
export async function getUnreadCount() {
  const { data } = await apiClient.get(API_ENDPOINTS.CHAT.UNREAD_COUNT);
  return data;
}

// ── WebSocket ─────────────────────────────────────────────────────────────────

/**
 * Tạo WebSocket connection tới Spring Boot.
 *
 * Spring Boot cần cấu hình:
 *   @EnableWebSocket hoặc STOMP via @EnableWebSocketMessageBroker
 *   Endpoint: /ws/chat (ws://localhost:8080/ws/chat?token=<jwt>)
 *   Backend validate JWT từ query param `token`.
 *
 * @param {string} token    - JWT token
 * @param {object} handlers - { onMessage, onOpen, onClose, onError }
 * @returns WebSocket instance
 */
export function createChatSocket(token, handlers = {}) {
  const wsBase = API_BASE_URL.replace(/^http/, "ws").replace("/api", "");
  const ws = new WebSocket(`${wsBase}${API_ENDPOINTS.CHAT.WS}?token=${token}`);

  ws.onopen    = () => handlers.onOpen?.();
  ws.onclose   = (e) => handlers.onClose?.(e);
  ws.onerror   = (e) => handlers.onError?.(e);
  ws.onmessage = (e) => {
    try {
      const payload = JSON.parse(e.data);
      handlers.onMessage?.(payload);
    } catch {
      handlers.onMessage?.({ content: e.data });
    }
  };

  return ws;
}
