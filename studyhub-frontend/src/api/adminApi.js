/**
 * api/adminApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls dành cho Admin (role: ADMIN).
 * Tất cả endpoints yêu cầu JWT token với role ADMIN.
 *
 * Backend endpoints:
 *   GET  /api/admin/tutors                  → TutorProfile[]
 *   PUT  /api/admin/tutors/approve          → User (updated)
 *   GET  /api/admin/requests                → ParentRequest[]
 *   PUT  /api/admin/requests/status         → ParentRequest (updated)
 *   PUT  /api/admin/users/:userId/ban       → void
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

/**
 * Lấy danh sách tất cả hồ sơ gia sư để duyệt.
 * GET /api/admin/tutors
 */
export async function getAllTutorProfiles() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.GET_TUTORS);
  return data;
}

/**
 * Duyệt hoặc từ chối hồ sơ gia sư.
 * PUT /api/admin/tutors/approve
 * Body: { tutorProfileId, status: "APPROVED"|"REJECTED" }
 */
export async function approveTutorProfile(tutorProfileId, status) {
  const { data } = await apiClient.put(API_ENDPOINTS.ADMIN.APPROVE_TUTOR, {
    tutorProfileId,
    status,
  });
  return data;
}

/**
 * Lấy danh sách tất cả bài đăng tìm gia sư.
 * GET /api/admin/requests
 */
export async function getAllParentRequests() {
  const { data } = await apiClient.get(API_ENDPOINTS.ADMIN.GET_REQUESTS);
  return data;
}

/**
 * Thay đổi trạng thái bài đăng (vd: khóa bài vi phạm).
 * PUT /api/admin/requests/status
 * Body: { requestId, status: "OPEN"|"MATCHED"|"CLOSED"|"BANNED" }
 */
export async function updateRequestStatus(requestId, status) {
  const { data } = await apiClient.put(API_ENDPOINTS.ADMIN.UPDATE_REQUEST_STATUS, {
    requestId,
    status,
  });
  return data;
}

/**
 * Khóa hoặc mở khóa tài khoản người dùng.
 * PUT /api/admin/users/:userId/ban?status=BANNED|ACTIVE
 */
export async function updateUserStatus(userId, status) {
  const { data } = await apiClient.put(
    API_ENDPOINTS.ADMIN.BAN_USER(userId),
    {},
    { params: { status } }
  );
  return data;
}
