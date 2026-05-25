/**
 * api/parentApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls dành cho Phụ huynh (role: PARENT).
 * Tất cả endpoints yêu cầu JWT token (tự động gắn bởi client.js).
 *
 * Spring Boot endpoints:
 *   POST /api/parent/match         Body: MatchRequestDTO  → TutorDTO[]
 *   POST /api/parent/book-trial    Body: BookTrialDTO     → BookingDTO
 *   GET  /api/parent/classes       → ClassDTO[]
 *   GET  /api/parent/escrow        → { balance, currency, lastTopup }
 *   POST /api/parent/topup         Body: { amount }       → { balance }
 *   GET  /api/parent/assessments   → AssessmentDTO[]
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

/**
 * Gợi ý gia sư phù hợp theo tiêu chí.
 * @param {object} criteria - { subject, location, priceMax, schedule? }
 * @returns {Promise<TutorDTO[]>}
 */
export async function matchTutors(criteria) {
  const { data } = await apiClient.post(API_ENDPOINTS.PARENT.MATCH, criteria);
  return data;
}

/**
 * Đặt lịch học thử với gia sư.
 * @param {object} payload - { tutorId, date, timeSlot, subject, studentName }
 * @returns {Promise<BookingDTO>}
 */
export async function bookTrial(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.PARENT.BOOK_TRIAL, payload);
  return data;
}

/** Lấy danh sách lớp học đang có */
export async function getMyClasses() {
  const { data } = await apiClient.get(API_ENDPOINTS.PARENT.CLASSES);
  return data;
}

/** Lấy thông tin ký quỹ (escrow) → { balance, currency, lastTopup } */
export async function getEscrow() {
  const { data } = await apiClient.get(API_ENDPOINTS.PARENT.ESCROW);
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
