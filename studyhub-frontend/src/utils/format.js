/**
 * utils/format.js
 * ─── Các hàm tiện ích format dữ liệu ────────────────────────────────────────
 */

/** Format tiền VND: 250000 → "250.000đ" */
export function formatPrice(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

/** Format ngày: "2025-03-19" → "19/03/2025" */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Rút ngắn văn bản: "Nguyễn Thanh Tùng" → "NT" */
export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Giây → "1 giờ 30 phút" */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  if (m === 0) return `${h} giờ`;
  return `${h} giờ ${m} phút`;
}
