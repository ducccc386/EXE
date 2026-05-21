/**
 * services/authService.js
 */

import api from "./api";
import { API_ENDPOINTS, STORAGE_KEYS, ROLES } from "../constants";

const DEMO_ACCOUNTS = [
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
    fullName: "Gia su Demo",
    email: "tutor@studyhub.vn",
    password: "tutor123",
    role: ROLES.TUTOR,
    token: "demo-tutor-token",
  },
  {
    id: "demo-parent-1",
    fullName: "Phu huynh Demo",
    email: "parent@studyhub.vn",
    password: "parent123",
    role: ROLES.PARENT,
    token: "demo-parent-token",
  },
];

function saveAuth(data) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

/**
 * Đăng nhập
 */
export async function login(email, password) {
  const demoUser = DEMO_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === String(email).toLowerCase() && acc.password === password
  );

  if (demoUser) {
    const { password: _ignored, ...safeData } = demoUser;
    saveAuth(safeData);
    return safeData;
  }

  const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
  const data = response.data;

  saveAuth(data);
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
