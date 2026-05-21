/**
 * services/authService.js
 */

import api from "./api";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";

/**
 * Đăng nhập
 */
export async function login(email, password) {
  const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
  const data = response.data;

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

/** Đăng ký */
export async function register(payload) {
  const response = await api.post(API_ENDPOINTS.REGISTER, payload);
  return response.data;
}
