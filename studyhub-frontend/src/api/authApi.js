/**
 * api/authApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến xác thực.
 *
 * Spring Boot endpoints:
 *   POST /api/auth/login     Body: { email, password }  → { token, id, fullName, email, role }
 *   POST /api/auth/register  Body: { fullName, email, password, role }  → { token, ... }
 *   GET  /api/auth/me        Header: Authorization: Bearer <token>  → user object
 *
 * [MOCK] Hiện tại login() thử demo accounts trước khi gọi backend.
 *        Khi backend sẵn sàng: xóa import DEMO_ACCOUNTS và khối demoLogin bên dưới.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";
// [MOCK] Xóa dòng import này khi backend /api/auth/login hoạt động
import { DEMO_ACCOUNTS } from "../mocks/auth.mock";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function persistAuth(data) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

/**
 * Đăng nhập.
 * [MOCK] Thử demo accounts trước → fallback gọi backend.
 * TODO (backend): Xóa khối demoLogin khi POST /api/auth/login sẵn sàng.
 */
export async function login(email, password) {
  // [MOCK] ── Xóa từ đây ──────────────────────────────────────────────────────
  const demo = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === String(email).toLowerCase() && a.password === password
  );
  if (demo) {
    const { password: _, ...safe } = demo;
    persistAuth(safe);
    return safe;
  }
  // [MOCK] ── Đến đây ───────────────────────────────────────────────────────

  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  persistAuth(data);
  return data;
}

/**
 * Đăng ký tài khoản mới.
 * Spring Boot: POST /api/auth/register
 * Body: { fullName, email, password, role: "TUTOR" | "PARENT" }
 */
export async function register(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  return data;
}

/**
 * Đăng xuất (xóa local storage, không cần gọi backend).
 * Optional: gọi POST /api/auth/logout nếu backend cần revoke token.
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/**
 * Lấy thông tin user đang đăng nhập từ localStorage.
 * Không gọi API — chỉ đọc cache local.
 * Để lấy dữ liệu mới nhất từ server: dùng GET /api/auth/me.
 */
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  } catch {
    return null;
  }
}
