/**
 * services/tutorService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến Tutor domain.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from "./api";
import { API_ENDPOINTS } from "../constants";
import {
  MOCK_TUTOR_PROFILE,
  MOCK_TUTOR_STATS,
  MOCK_TUTOR_CLASSES,
  MOCK_TUTOR_SCHEDULE,
  MOCK_TUTOR_EARNINGS,
  MOCK_PENDING_REPORT,
} from "../mock/tutor.mock";
// Listing page dùng riêng
import { tutors as MOCK_TUTOR_LIST, getTutorById as getMockById } from "../data/tutors";

// ─── Listing (public) ─────────────────────────────────────────────────────────

export async function getTutors(filters = {}) {
  // TODO: return (await api.get(API_ENDPOINTS.TUTORS, { params: filters })).data;
  let result = [...MOCK_TUTOR_LIST];
  if (filters.subject && filters.subject !== "Tất cả") result = result.filter(t => t.subject === filters.subject);
  if (filters.verifiedOnly) result = result.filter(t => t.verified);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(t => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.tags?.some(tag => tag.toLowerCase().includes(q)));
  }
  return result;
}

export async function getTutorById(id) {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_BY_ID(id))).data;
  return getMockById(id);
}

// ─── Dashboard (authenticated) ───────────────────────────────────────────────

export async function getMyProfile() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_PROFILE)).data;
  return MOCK_TUTOR_PROFILE;
}

export async function updateMyProfile(payload) {
  // TODO: return (await api.put(API_ENDPOINTS.TUTOR_PROFILE, payload)).data;
  console.log("[mock] updateMyProfile", payload);
}

export async function getMyStats() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_STATS)).data;
  return MOCK_TUTOR_STATS;
}

export async function getMyClasses() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_CLASSES)).data;
  return MOCK_TUTOR_CLASSES;
}

export async function getMySchedule() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_SCHEDULE)).data;
  return MOCK_TUTOR_SCHEDULE;
}

export async function getMyEarnings() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_EARNINGS)).data;
  return MOCK_TUTOR_EARNINGS;
}

export async function getPendingReport() {
  // TODO: return (await api.get(API_ENDPOINTS.TUTOR_PENDING_REPORT)).data;
  return MOCK_PENDING_REPORT;
}

export async function reportSessionComplete(classId, sessionNumber) {
  // TODO: return (await api.post(`${API_ENDPOINTS.TUTOR_CLASSES}/${classId}/report`, { sessionNumber })).data;
  console.log("[mock] reportSessionComplete", classId, sessionNumber);
}
