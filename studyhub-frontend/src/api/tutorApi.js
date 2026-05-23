/**
 * api/tutorApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến gia sư (Spring Boot: /api/tutors/*, /api/tutor/*)
 *
 * Public endpoints:  getTutors(), getTutorById()
 * Auth endpoints:    getMyProfile(), updateMyProfile(), getMyStats(), ...
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

// ─── Public ───────────────────────────────────────────────────────────────────

export async function getTutors(filters = {}) {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTORS.LIST, { params: filters });
  return data;
}

export async function getTutorById(id) {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTORS.BY_ID(id));
  return data;
}

// ─── Authenticated (Tutor) ────────────────────────────────────────────────────

export async function getMyProfile() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.PROFILE);
  return data;
}

export async function updateMyProfile(payload) {
  const { data } = await apiClient.put(API_ENDPOINTS.TUTOR.PROFILE, payload);
  return data;
}

export async function getMyStats() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.STATS);
  return data;
}

export async function getMyClasses() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.CLASSES);
  return data;
}

export async function getMySchedule() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.SCHEDULE);
  return data;
}

export async function getMyEarnings() {
  const { data } = await apiClient.get(API_ENDPOINTS.TUTOR.EARNINGS);
  return data;
}

export async function reportSessionComplete(classId, sessionNumber) {
  const { data } = await apiClient.post(
    `${API_ENDPOINTS.TUTOR.CLASSES}/${classId}/report`,
    { sessionNumber }
  );
  return data;
}
