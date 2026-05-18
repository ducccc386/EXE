/**
 * services/parentService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến Parent domain.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from "./api";
import { API_ENDPOINTS } from "../constants";
import {
  MOCK_MATCHED_TUTORS,
  MOCK_PARENT_CLASSES,
  MOCK_PARENT_ESCROW,
  MOCK_PARENT_ASSESSMENTS,
} from "../mock/parent.mock";

// ─── Perfect Match ────────────────────────────────────────────────────────────

export async function getMatchedTutors() {
  // TODO: return (await api.get(API_ENDPOINTS.PARENT_MATCH)).data;
  return MOCK_MATCHED_TUTORS;
}

export async function bookTrialSession(tutorId) {
  // TODO: return (await api.post(API_ENDPOINTS.PARENT_BOOK_TRIAL, { tutorId })).data;
  console.log("[mock] bookTrialSession", tutorId);
}

// ─── Classes ──────────────────────────────────────────────────────────────────

export async function getMyClasses() {
  // TODO: return (await api.get(API_ENDPOINTS.PARENT_CLASSES)).data;
  return MOCK_PARENT_CLASSES;
}

export async function confirmSession(classId, sessionNumber) {
  // TODO: return (await api.post(`${API_ENDPOINTS.PARENT_CLASSES}/${classId}/confirm`, { sessionNumber })).data;
  console.log("[mock] confirmSession", classId, sessionNumber);
}

// ─── Escrow / Payment ─────────────────────────────────────────────────────────

export async function getEscrow() {
  // TODO: return (await api.get(API_ENDPOINTS.PARENT_ESCROW)).data;
  return MOCK_PARENT_ESCROW;
}

export async function topUpEscrow(amount, method) {
  // TODO: return (await api.post(API_ENDPOINTS.PARENT_TOPUP, { amount, method })).data;
  console.log("[mock] topUpEscrow", amount, method);
}

// ─── Assessment ───────────────────────────────────────────────────────────────

export async function getAssessments() {
  // TODO: return (await api.get(API_ENDPOINTS.PARENT_ASSESSMENTS)).data;
  return MOCK_PARENT_ASSESSMENTS;
}
