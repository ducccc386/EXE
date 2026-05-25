/**
 * api/adminApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls dành cho Admin (role: ADMIN).
 * Tất cả endpoints yêu cầu JWT token với role ADMIN.
 *
 * Spring Boot endpoints:
 *   GET  /api/admin/stats           → AdminStatsDTO
 *   GET  /api/admin/users?page=&role= → Page<UserDTO>
 *   PUT  /api/admin/users/:id/status  Body: { status } → UserDTO
 *   GET  /api/admin/ekyc             → EkycRequestDTO[]
 *   PUT  /api/admin/ekyc/:id/approve → EkycRequestDTO
 *   PUT  /api/admin/ekyc/:id/reject  Body: { reason } → EkycRequestDTO
 *   GET  /api/admin/finance          → FinanceReportDTO
 *   GET  /api/admin/matching         → MatchingLogDTO[]
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

/** Lấy thống kê tổng quan hệ thống */
export async function getAdminStats() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.STATS);
  return data;
}

/**
 * Lấy danh sách người dùng (có phân trang và lọc theo role).
 * @param {object} params - { page?, size?, role?, search? }
 */
export async function getUsers(params = {}) {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.USERS, { params });
  return data;
}

/**
 * Thay đổi trạng thái tài khoản user.
 * @param {string} userId
 * @param {"active"|"suspended"|"banned"} status
 */
export async function updateUserStatus(userId, status) {
  const { data } = await apiClient.put(
    `${API_ENDPOINTS.ADMIN.USERS}/${userId}/status`,
    { status }
  );
  return data;
}

/** Lấy danh sách hồ sơ eKYC chờ duyệt */
export async function getEkycQueue() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.EKYC);
  return data;
}

/** Duyệt hồ sơ eKYC */
export async function approveEkyc(ekycId) {
  const { data } = await apiClient.put(`${API_ENDPOINTS.ADMIN.EKYC}/${ekycId}/approve`);
  return data;
}

/**
 * Từ chối hồ sơ eKYC.
 * @param {string} ekycId
 * @param {string} reason - lý do từ chối
 */
export async function rejectEkyc(ekycId, reason) {
  const { data } = await apiClient.put(
    `${API_ENDPOINTS.ADMIN.EKYC}/${ekycId}/reject`,
    { reason }
  );
  return data;
}

/** Lấy báo cáo tài chính */
export async function getFinanceReport() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.FINANCE);
  return data;
}

/** Lấy log ghép cặp gia sư – học sinh */
export async function getMatchingLogs() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.MATCHING);
  return data;
}
