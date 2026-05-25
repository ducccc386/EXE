/**
 * mocks/auth.mock.js
 * ─────────────────────────────────────────────────────────────────────────────
 * [MOCK] Tài khoản demo dùng khi CHƯA có backend.
 *
 * ⚠️  XÓA FILE NÀY khi backend /api/auth/login đã hoạt động.
 *     Đồng thời xóa import + khối demoLogin() trong authApi.js.
 *
 * Spring Boot endpoint tương ứng:
 *   POST /api/auth/login  →  { token, id, fullName, email, role }
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ROLES } from "../constants";

export const DEMO_ACCOUNTS = [
  {
    id: "demo-admin-1",
    fullName: "Admin StudyHub",
    email: "admin@studyhub.vn",
    password: "admin123",
    role: ROLES.ADMIN,
    token: "demo-admin-token",
  },
  {
    id: "demo-tutor-1",
    fullName: "Gia sư Demo",
    email: "tutor@studyhub.vn",
    password: "tutor123",
    role: ROLES.TUTOR,
    token: "demo-tutor-token",
  },
  {
    id: "demo-parent-1",
    fullName: "Phụ huynh Demo",
    email: "parent@studyhub.vn",
    password: "parent123",
    role: ROLES.PARENT,
    token: "demo-parent-token",
  },
];
