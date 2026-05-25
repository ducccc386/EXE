/**
 * mocks/chat.mock.js
 * ─────────────────────────────────────────────────────────────────────────────
 * [MOCK] Dữ liệu giả cho trang Chat khi CHƯA có backend.
 *
 * ⚠️  XÓA FILE NÀY khi các endpoint sau đã hoạt động:
 *   GET  /api/chat/friends              → danh sách bạn bè
 *   GET  /api/chat/messages/:friendId   → lịch sử tin nhắn
 *   WS   ws://host/ws/chat?token=...    → real-time messaging
 *
 * ChatPage.jsx hiện đang dùng MOCK_FRIENDS, MOCK_MESSAGES từ file này.
 * Khi backend sẵn sàng: thay bằng getFriends() và getMessages() từ chatApi.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

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
