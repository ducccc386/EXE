/**
 * services/adminService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến Admin domain.
 *
 * Khi Spring Boot sẵn sàng:
 *   1. Xóa import mock bên dưới
 *   2. Bỏ comment dòng api.xxx() tương ứng trong mỗi function
 *   3. Component KHÔNG cần đổi gì cả
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from "./api";
import { API_ENDPOINTS } from "../constants";
import {
  MOCK_ADMIN_STATS,
  MOCK_USERS,
  MOCK_EKYC_PENDING,
  MOCK_TRANSACTIONS,
  MOCK_PENDING_JOBS,
} from "../mock/admin.mock";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getAdminStats() {
  // TODO: return (await api.get(API_ENDPOINTS.ADMIN_STATS)).data;
  return MOCK_ADMIN_STATS;
}

// ─── User Management ──────────────────────────────────────────────────────────

export async function getUsers() {
  // TODO: return (await api.get(API_ENDPOINTS.ADMIN_USERS)).data;
  return MOCK_USERS;
}

export async function updateUserStatus(userId, status) {
  // TODO: return (await api.patch(`${API_ENDPOINTS.ADMIN_USERS}/${userId}`, { status })).data;
  console.log("[mock] updateUserStatus", userId, status);
}

export async function deleteUser(userId) {
  // TODO: return (await api.delete(`${API_ENDPOINTS.ADMIN_USERS}/${userId}`)).data;
  console.log("[mock] deleteUser", userId);
}

// ─── eKYC ─────────────────────────────────────────────────────────────────────

export async function getPendingEkyc() {
  // TODO: return (await api.get(API_ENDPOINTS.ADMIN_EKYC)).data;
  return MOCK_EKYC_PENDING;
}

export async function approveEkyc(tutorId) {
  // TODO: return (await api.post(`${API_ENDPOINTS.ADMIN_EKYC}/${tutorId}/approve`)).data;
  console.log("[mock] approveEkyc", tutorId);
}

export async function rejectEkyc(tutorId, reason) {
  // TODO: return (await api.post(`${API_ENDPOINTS.ADMIN_EKYC}/${tutorId}/reject`, { reason })).data;
  console.log("[mock] rejectEkyc", tutorId, reason);
}

// ─── Finance / Escrow ─────────────────────────────────────────────────────────

export async function getTransactions() {
  // TODO: return (await api.get(API_ENDPOINTS.ADMIN_FINANCE)).data;
  return MOCK_TRANSACTIONS;
}

export async function releasePayment(transactionId) {
  // TODO: return (await api.post(`${API_ENDPOINTS.ADMIN_FINANCE}/${transactionId}/release`)).data;
  console.log("[mock] releasePayment", transactionId);
}

export async function resolveDispute(transactionId) {
  // TODO: return (await api.post(`${API_ENDPOINTS.ADMIN_FINANCE}/${transactionId}/resolve`)).data;
  console.log("[mock] resolveDispute", transactionId);
}

// ─── Job Matching ─────────────────────────────────────────────────────────────

export async function getPendingJobs() {
  // TODO: return (await api.get(API_ENDPOINTS.ADMIN_MATCHING)).data;
  return MOCK_PENDING_JOBS;
}

export async function matchJob(jobId, tutorId) {
  // TODO: return (await api.post(`${API_ENDPOINTS.ADMIN_MATCHING}/${jobId}/match`, { tutorId })).data;
  console.log("[mock] matchJob", jobId, tutorId);
}
