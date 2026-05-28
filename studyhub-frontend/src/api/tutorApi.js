/**
 * api/tutorApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến gia sư & công việc tìm kiếm.
 *
 * Backend endpoints:
 *   GET  /api/tutor/all                    → TutorProfile[] (public)
 *   GET  /api/tutor/:id                    → TutorProfile detail
 *   GET  /api/tutor/profile/:userId        → TutorProfile (auth: TUTOR)
 *   PUT  /api/tutor/profile/update         → TutorProfile updated
 *   POST /api/tutor/subjects/update        → void
 *   GET  /api/subjects                     → Subject[]
 *   POST /api/tutorhub/requests/create     → ParentRequest
 *   GET  /api/tutorhub/requests/open       → ParentRequest[]
 *   POST /api/tutorhub/apply               → Application
 *   PUT  /api/tutorhub/applications/:id/accept → void
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

// ─── Public Endpoints (Không cần auth) ─────────────────────────────────────────

/**
 * Lấy danh sách tất cả gia sư.
 * GET /api/tutor/all
 */
export async function getAllTutors() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR_ALL);
  return data;
}

/**
 * Lấy chi tiết gia sư theo ID.
 * GET /api/tutor/:id
 */
export async function getTutorById(id) {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR_BY_ID(id));
  return data;
}

/**
 * Lấy danh sách tất cả môn học.
 * GET /api/subjects
 */
export async function getSubjects() {
  const { data } = await apiClient.get(API_ENDPOINTS.SUBJECTS);
  return data;
}

// ─── Authenticated Endpoints (Auth: TUTOR) ────────────────────────────────────

/**
 * Lấy hồ sơ gia sư của user hiện tại.
 * GET /api/tutor/profile/:userId
 */
export async function getMyProfile(userId) {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.PROFILE_GET(userId));
  return data;
}

/**
 * Cập nhật hồ sơ gia sư.
 * PUT /api/tutor/profile/update
 * Body: { userId, bio, education, experienceYears, teachingMethod, hourlyRate, city, teachingMode }
 */
export async function updateMyProfile(payload) {
  const { data } = await apiClient.put(API_ENDPOINTS.TUTOR.PROFILE_UPDATE, payload);
  return data;
}

/**
 * Cập nhật danh sách môn học của gia sư.
 * POST /api/tutor/subjects/update
 * Body: { tutorProfileId, subjectIds: Long[] }
 */
export async function updateMySubjects(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.TUTOR.SUBJECTS_UPDATE, payload);
  return data;
}

// ─── Job/Request Endpoints (Chung cho cả Tutor & Parent) ──────────────────────

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
 * Lấy danh sách bài đăng đang mở (cho gia sư tìm việc).
 * GET /api/tutorhub/requests/open
 */
export async function getOpenRequests() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTORHUB.REQUESTS_OPEN);
  return data;
}

/**
 * Gia sư nộp đơn ứng tuyển vào một bài đăng.
 * POST /api/tutorhub/apply
 * Body: { requestId, tutorProfileId, message }
 */
export async function applyToJob(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.TUTORHUB.APPLY, payload);
  return data;
}

/**
 * Phụ huynh chấp nhận gia sư (chốt việc).
 * PUT /api/tutorhub/applications/:appId/accept
 */
export async function acceptTutorApplication(appId) {
  const { data } = await apiClient.put(
    API_ENDPOINTS.TUTORHUB.APPLICATIONS_ACCEPT(appId)
  );
  return data;
}
