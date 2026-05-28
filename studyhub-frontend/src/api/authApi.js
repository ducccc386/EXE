/**
 * api/authApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến xác thực.
 *
 * Spring Boot endpoints:
 *   POST /api/auth/login     Body: { email, password }  → { token, id, fullName, email, role }
 *   POST /api/auth/register  Body: { fullName, email, password, role }  → user object
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";

function persistAuth(data) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

/**
 * Đăng nhập.
 * Backend: POST /api/auth/login
 * Response: { id, token, fullName, email, role, ... }
 */
export async function login(email, password) {
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  persistAuth(data);
  return data;
}

/**
 * Đăng ký tài khoản mới.
 * Backend: POST /api/auth/register
 * Body: { fullName, email, password, role: "TUTOR" | "PARENT" }
 * Response: user object với token
 */
export async function register(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  persistAuth(data);
  return data;
}

/**
 * Đăng xuất (xóa local storage).
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/**
 * Lấy thông tin user đang đăng nhập từ localStorage.
 * Không gọi API — chỉ đọc cache local.
 */
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  } catch {
    return null;
  }
}

/**
 * Kiểm tra xem user có được xác thực không.
 */
export function isAuthenticated() {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
}
