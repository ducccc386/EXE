/**
 * api/parentApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls dành cho Phụ huynh (role: PARENT).
 * Tất cả endpoints yêu cầu JWT token (tự động gắn bởi client.js).
 *
 * Backend endpoints:
 *   POST /api/tutorhub/requests/create  → ParentRequest
 *   GET  /api/tutorhub/requests/open    → ParentRequest[]
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

/**
 * Phụ huynh tạo bài đăng tìm gia sư.
 * POST /api/tutorhub/requests/create
 * Body: { parentId, subjectId, title, description, grade, budget, city, addressDetail, 
 *         teachingMode, sessionsPerWeek, scheduleInfo }
 */
export async function createParentRequest(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.TUTORHUB.REQUESTS_CREATE, payload);
  return data;
}

/**
 * Lấy danh sách bài đăng đang mở (để gia sư tìm việc).
 * GET /api/tutorhub/requests/open
 */
export async function getOpenRequests() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTORHUB.REQUESTS_OPEN);
  return data;
}

/**
 * Nạp tiền vào ký quỹ.
 * @param {number} amount - số tiền VND
 * @returns {Promise<{ balance: number }>}
 */
export async function topUpEscrow(amount) {
  const { data } = await apiClient.post(API_ENDPOINTS.PARENT.TOPUP, { amount });
  return data;
}

/** Lấy kết quả đánh giá học sinh */
export async function getAssessments() {
  const { data } = await apiClient.get(API_ENDPOINTS.PARENT.ASSESSMENTS);
  return data;
}
