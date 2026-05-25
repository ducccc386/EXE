/**
 * mocks/admin.mock.js
 * ─────────────────────────────────────────────────────────────────────────────
 * [MOCK] Dữ liệu giả cho dashboard Admin khi CHƯA có backend.
 *
 * ⚠️  XÓA FILE NÀY khi các endpoint sau đã hoạt động:
 *   GET  /api/admin/stats    → tổng quan hệ thống
 *   GET  /api/admin/users    → danh sách người dùng (paginated)
 *   GET  /api/admin/ekyc     → hàng chờ xác minh danh tính
 *   GET  /api/admin/finance  → báo cáo tài chính
 *   GET  /api/admin/matching → log ghép cặp gia sư – học sinh
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_ADMIN_STATS = {
  totalUsers: 1240,
  activeTutors: 87,
  activeParents: 312,
  pendingEkyc: 14,
  totalRevenue: 48500000,
  revenueThisMonth: 8200000,
};

export const MOCK_ADMIN_USERS = [
  { id: "u1", fullName: "Nguyễn Thanh Tùng", email: "tutor1@studyhub.vn", role: "TUTOR",  status: "active",  joinedAt: "2025-11-10" },
  { id: "u2", fullName: "Trần Văn Minh",     email: "parent1@studyhub.vn", role: "PARENT", status: "active",  joinedAt: "2026-01-05" },
  { id: "u3", fullName: "Lê Hữu Phúc",       email: "tutor2@studyhub.vn", role: "TUTOR",  status: "pending", joinedAt: "2026-05-18" },
];

export const MOCK_EKYC_QUEUE = [
  { id: "ekyc-1", tutorName: "Lê Hữu Phúc",    submittedAt: "2026-05-18", documents: ["cccd_front.jpg", "degree.pdf"] },
  { id: "ekyc-2", tutorName: "Hoàng Thị Bình", submittedAt: "2026-05-19", documents: ["cccd_front.jpg", "cccd_back.jpg"] },
];
