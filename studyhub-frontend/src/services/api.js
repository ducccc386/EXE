/**
 * services/api.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Axios instance đã được cấu hình sẵn cho Spring Boot backend.
 *
 * Tính năng:
 *  - Base URL từ constants
 *  - Tự động gắn JWT Bearer token vào mọi request
 *  - Interceptor response: tự redirect về /login khi token hết hạn (401)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "../constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 giây
});

// ── Request interceptor: gắn JWT token ───────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: xử lý lỗi 401 (token hết hạn) ─────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn → clear localStorage và redirect về login
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
