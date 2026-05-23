/**
 * api/chatApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * API calls cho tính năng Chat / Messaging
 * WebSocket endpoint: ws://localhost:8080/ws/chat
 * REST fallback endpoint: /api/chat/*
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_BASE_URL } from "../constants";

// ── REST API ──────────────────────────────────────────────────────────────────

/** Lấy danh sách bạn bè / người có thể nhắn tin */
export async function getFriends() {
  const { data } = await apiClient.get("/chat/friends");
  return data;
}

/** Lấy lịch sử tin nhắn với một user */
export async function getMessages(friendId, page = 0, size = 50) {
  const { data } = await apiClient.get(`/chat/messages/${friendId}`, {
    params: { page, size },
  });
  return data;
}

/** Gửi tin nhắn qua REST (fallback khi WebSocket không khả dụng) */
export async function sendMessageRest(receiverId, content) {
  const { data } = await apiClient.post("/chat/messages", {
    receiverId,
    content,
  });
  return data;
}

/** Đánh dấu đã đọc tất cả tin nhắn từ một người */
export async function markAsRead(friendId) {
  await apiClient.put(`/chat/messages/${friendId}/read`);
}

/** Lấy số tin nhắn chưa đọc */
export async function getUnreadCount() {
  const { data } = await apiClient.get("/chat/unread-count");
  return data;
}

// ── WebSocket ─────────────────────────────────────────────────────────────────

/**
 * Tạo WebSocket connection tới server.
 * @param {string} token  - JWT token
 * @param {object} handlers - { onMessage, onOpen, onClose, onError }
 * @returns WebSocket instance
 */
export function createChatSocket(token, handlers = {}) {
  const wsBase = API_BASE_URL.replace(/^http/, "ws").replace("/api", "");
  const ws = new WebSocket(`${wsBase}/ws/chat?token=${token}`);

  ws.onopen = () => handlers.onOpen?.();
  ws.onclose = (e) => handlers.onClose?.(e);
  ws.onerror = (e) => handlers.onError?.(e);
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

// ── Mock data (xóa khi backend sẵn sàng) ─────────────────────────────────────

export const MOCK_FRIENDS = [
  {
    id: "f1",
    fullName: "Nguyễn Thị Lan",
    role: "TUTOR",
    avatar: null,
    lastMessage: "Hẹn gặp lại em nhé!",
    lastMessageTime: "10:32",
    unread: 2,
    online: true,
  },
  {
    id: "f2",
    fullName: "Trần Văn Minh",
    role: "PARENT",
    avatar: null,
    lastMessage: "Cảm ơn thầy nhiều ạ",
    lastMessageTime: "Hôm qua",
    unread: 0,
    online: false,
  },
  {
    id: "f3",
    fullName: "Phạm Thu Hương",
    role: "TUTOR",
    avatar: null,
    lastMessage: "Buổi học hôm nay thế nào?",
    lastMessageTime: "T2",
    unread: 1,
    online: true,
  },
  {
    id: "f4",
    fullName: "Lê Đức Anh",
    role: "PARENT",
    avatar: null,
    lastMessage: "OK ạ, em hiểu rồi",
    lastMessageTime: "T6",
    unread: 0,
    online: false,
  },
];

export const MOCK_MESSAGES = {
  f1: [
    { id: "m1", senderId: "f1", content: "Chào em, hôm nay em có câu hỏi gì không?", time: "10:20", type: "text" },
    { id: "m2", senderId: "me", content: "Dạ thầy ơi, em vẫn chưa hiểu phần tích phân", time: "10:22", type: "text" },
    { id: "m3", senderId: "f1", content: "Ổn thôi, thầy sẽ giải thích lại nhé. Phần nào em thấy khó nhất?", time: "10:25", type: "text" },
    { id: "m4", senderId: "me", content: "Dạ phần tích phân từng phần ạ", time: "10:27", type: "text" },
    { id: "m5", senderId: "f1", content: "Được rồi, thầy sẽ gửi tài liệu cho em. Hôm nay rảnh lúc 3h không?", time: "10:29", type: "text" },
    { id: "m6", senderId: "f1", content: "Hẹn gặp lại em nhé!", time: "10:32", type: "text" },
  ],
  f2: [
    { id: "m1", senderId: "me", content: "Xin chào, tôi muốn hỏi về lịch học của bé nhà mình", time: "Hôm qua", type: "text" },
    { id: "m2", senderId: "f2", content: "Cảm ơn thầy nhiều ạ", time: "Hôm qua", type: "text" },
  ],
  f3: [
    { id: "m1", senderId: "f3", content: "Buổi học hôm nay thế nào?", time: "T2", type: "text" },
  ],
};