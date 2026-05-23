/**
 * utils/format.js — Các hàm tiện ích format dữ liệu
 */

/** 250000 → "250.000đ" */
export function formatPrice(amount) {
  if (!amount && amount !== 0) return "–";
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

/** "2025-03-19" → "19/03/2025" */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

/** "Nguyễn Thanh Tùng" → "NT" */
export function getInitials(name = "") {
  return name.split(" ").filter(Boolean).slice(-2).map((w) => w[0].toUpperCase()).join("");
}

/** 90 → "1 giờ 30 phút" */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  if (m === 0) return `${h} giờ`;
  return `${h} giờ ${m} phút`;
}
