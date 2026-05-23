/**
 * api/authApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến xác thực (Spring Boot: /api/auth/*)
 *
 * Demo accounts vẫn được giữ lại để frontend hoạt động khi chưa có backend.
 * Khi backend sẵn sàng: xóa khối DEMO_ACCOUNTS và hàm demoLogin().
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS, STORAGE_KEYS, ROLES } from "../constants";

// ── [MOCK] Xóa khi backend sẵn sàng ──────────────────────────────────────────
const DEMO_ACCOUNTS = [
  { id: "demo-admin-1",  fullName: "Admin StudyHub",   email: "admin@studyhub.vn",  password: "admin123",  role: ROLES.ADMIN,  token: "demo-admin-token"  },
  { id: "demo-tutor-1",  fullName: "Gia sư Demo",       email: "tutor@studyhub.vn",  password: "tutor123",  role: ROLES.TUTOR,  token: "demo-tutor-token"  },
  { id: "demo-parent-1", fullName: "Phụ huynh Demo",    email: "parent@studyhub.vn", password: "parent123", role: ROLES.PARENT, token: "demo-parent-token" },
];
// ─────────────────────────────────────────────────────────────────────────────

function persistAuth(data) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

/** Đăng nhập — thử demo trước, fallback lên backend */
export async function login(email, password) {
  const demo = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === String(email).toLowerCase() && a.password === password
  );
  if (demo) {
    const { password: _, ...safe } = demo;
    persistAuth(safe);
    return safe;
  }
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  persistAuth(data);
  return data;
}

/** Đăng ký */
export async function register(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  return data;
}

/** Đăng xuất */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/** Lấy user hiện tại từ localStorage */
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  } catch {
    return null;
  }
}
