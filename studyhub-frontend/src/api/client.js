/**
 * api/client.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Axios instance đã cấu hình sẵn cho Spring Boot backend.
 *
 * Tính năng:
 *  - Base URL từ constants (http://localhost:8080/api)
 *  - Tự động gắn JWT Bearer token vào mọi request
 *  - Interceptor response: tự redirect /login khi token hết hạn (401)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "../constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ── Request: gắn JWT token ────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response: xử lý 401 (token hết hạn) ──────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
