/**
 * mocks/parent.mock.js
 * ─────────────────────────────────────────────────────────────────────────────
 * [MOCK] Dữ liệu giả cho dashboard Phụ huynh khi CHƯA có backend.
 *
 * ⚠️  XÓA FILE NÀY khi các endpoint sau đã hoạt động:
 *   GET  /api/parent/classes     → danh sách lớp học đang có
 *   GET  /api/parent/assessments → kết quả đánh giá học sinh
 *   GET  /api/parent/escrow      → số dư ký quỹ
 *   POST /api/parent/match       → gợi ý gia sư phù hợp
 *   POST /api/parent/book-trial  → đặt lịch học thử
 *   POST /api/parent/topup       → nạp tiền vào ký quỹ
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_PARENT_CLASSES = [
  {
    id: "cls-1",
    tutorName: "Nguyễn Thanh Tùng",
    subject: "Toán",
    studentName: "Nguyễn Văn An",
    schedule: "T2, T4, T6 — 18:00",
    sessionsCompleted: 8,
    sessionsTotal: 20,
    status: "active",
  },
  {
    id: "cls-2",
    tutorName: "Trần Minh Châu",
    subject: "Tiếng Anh",
    studentName: "Nguyễn Văn An",
    schedule: "T3, T7 — 09:00",
    sessionsCompleted: 3,
    sessionsTotal: 10,
    status: "active",
  },
];

export const MOCK_PARENT_ESCROW = {
  balance: 1500000,
  currency: "VND",
  lastTopup: "2026-05-01",
};

export const MOCK_PARENT_ASSESSMENTS = [
  {
    id: "asmnt-1",
    subject: "Toán",
    date: "2026-05-20",
    score: 8.5,
    note: "Tiến bộ rõ rệt ở phần hình học",
  },
];
