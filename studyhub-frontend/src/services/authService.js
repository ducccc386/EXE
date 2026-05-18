/**
 * services/authService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Chế độ MOCK: login với tài khoản demo mà không cần backend.
 * Khi Spring Boot sẵn sàng: xóa MOCK_ACCOUNTS và phần mock trong login(),
 * bỏ comment dòng api.post() là xong.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from "./api";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";

// ─── Mock accounts (xóa khi có backend thật) ─────────────────────────────────
const MOCK_ACCOUNTS = {
  "admin@studyhub.vn": {
    password: "admin123",
    user: {
      id: "ADMIN-001",
      fullName: "Nguyễn Admin",
      email: "admin@studyhub.vn",
      role: "ADMIN",
      token: "mock-token-admin",
    },
  },
  "tutor@studyhub.vn": {
    password: "tutor123",
    user: {
      id: "GS-001",
      fullName: "Lê Hoàng Phúc",
      email: "tutor@studyhub.vn",
      role: "TUTOR",
      token: "mock-token-tutor",
    },
  },
  "parent@studyhub.vn": {
    password: "parent123",
    user: {
      id: "PH-001",
      fullName: "Trần Thị Phụ Huynh",
      email: "parent@studyhub.vn",
      role: "PARENT",
      token: "mock-token-parent",
    },
  },
};

/**
 * Đăng nhập
 * Hiện dùng mock. Khi có backend: xóa mock, bỏ comment api.post()
 */
export async function login(email, password) {
  // ── TODO: bỏ comment khi có Spring Boot ──
  // const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
  // const data = response.data;

  // ── MOCK LOGIN ────────────────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 600)); // giả lập network delay

  const account = MOCK_ACCOUNTS[email.toLowerCase()];
  if (!account || account.password !== password) {
    throw { response: { data: { message: "Email hoặc mật khẩu không đúng!" } } };
  }
  const data = account.user;
  // ─────────────────────────────────────────────────────────────────────────

  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
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

/** Đăng ký — TODO khi có backend */
export async function register(payload) {
  const response = await api.post(API_ENDPOINTS.REGISTER, payload);
  return response.data;
}
