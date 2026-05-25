/**
 * constants/tutor.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Các hằng số liên quan đến tìm kiếm và lọc gia sư.
 * Trước đây nằm trong mocks/tutors.js — đã tách ra vì đây là config,
 * KHÔNG phải mock data (vẫn dùng khi backend hoạt động).
 *
 * Nếu danh sách môn học cần lấy từ backend:
 *   GET /api/subjects → string[]
 *   Khi đó thay SUBJECTS bằng một API call và xóa file này.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Danh sách môn học hiển thị trên filter */
export const SUBJECTS = ["English", "IELTS", "Math", "Chemistry", "Literature", "SAT"];

/** Các mức giá dùng trong filter tìm gia sư */
export const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0,      max: Infinity },
  { label: "< 100.000đ",     min: 0,      max: 100000   },
  { label: "100k – 200k",    min: 100000, max: 200000   },
  { label: "200k – 400k",    min: 200000, max: 400000   },
  { label: "> 400.000đ",     min: 400000, max: Infinity },
];
