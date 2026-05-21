/**
 * services/tutorService.js
 */

import api from "./api";
import { API_ENDPOINTS } from "../constants";

// ─── Listing (public) ─────────────────────────────────────────────────────────

export async function getTutors(filters = {}) {
  return (await api.get(API_ENDPOINTS.TUTORS, { params: filters })).data;
}

export async function getTutorById(id) {
  return (await api.get(API_ENDPOINTS.TUTOR_BY_ID(id))).data;
}

// ─── Dashboard (authenticated) ───────────────────────────────────────────────

export async function getMyProfile() {
  return (await api.get(API_ENDPOINTS.TUTOR_PROFILE)).data;
}

export async function updateMyProfile(payload) {
  return (await api.put(API_ENDPOINTS.TUTOR_PROFILE, payload)).data;
}

export async function getMyStats() {
  return (await api.get(API_ENDPOINTS.TUTOR_STATS)).data;
}

export async function getMyClasses() {
  return (await api.get(API_ENDPOINTS.TUTOR_CLASSES)).data;
}

export async function getMySchedule() {
  return (await api.get(API_ENDPOINTS.TUTOR_SCHEDULE)).data;
}

export async function getMyEarnings() {
  return (await api.get(API_ENDPOINTS.TUTOR_EARNINGS)).data;
}

export async function getPendingReport() {
  return (await api.get(API_ENDPOINTS.TUTOR_PENDING_REPORT)).data;
}

export async function reportSessionComplete(classId, sessionNumber) {
  return (await api.post(`${API_ENDPOINTS.TUTOR_CLASSES}/${classId}/report`, { sessionNumber })).data;
}
