/**
 * api/reviewApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tất cả API calls liên quan đến đánh giá & ratings.
 *
 * Backend endpoints:
 *   POST /api/reviews/create                    → Review
 *   GET  /api/reviews/tutor/:tutorProfileId    → Review[]
 *   GET  /api/reviews/tutor/:tutorProfileId/average → double
 * ─────────────────────────────────────────────────────────────────────────────
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "../constants";

/**
 * Phụ huynh gửi đánh giá cho gia sư (sau khi kết thúc lớp học).
 * POST /api/reviews/create
 * Body: { bookingId, parentId, tutorProfileId, rating, comment }
 */
export async function createReview(payload) {
    const { data } = await apiClient.post(API_ENDPOINTS.REVIEWS.CREATE, payload);
    return data;
}

/**
 * Lấy danh sách tất cả đánh giá của một gia sư.
 * GET /api/reviews/tutor/:tutorProfileId
 */
export async function getTutorReviews(tutorProfileId) {
    const { data } = await apiClient.get(API_ENDPOINTS.REVIEWS.GET_TUTOR(tutorProfileId));
    return data;
}

/**
 * Lấy điểm rating trung bình của gia sư.
 * GET /api/reviews/tutor/:tutorProfileId/average
 */
export async function getTutorAverageRating(tutorProfileId) {
    const { data } = await apiClient.get(API_ENDPOINTS.REVIEWS.GET_AVERAGE(tutorProfileId));
    return data;
}
