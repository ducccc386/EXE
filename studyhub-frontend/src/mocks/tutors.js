/**
 * mocks/tutors.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Dữ liệu mock dùng khi chưa có Spring Boot backend.
 *
 * Khi backend sẵn sàng:
 *  1. Xóa file này.
 *  2. Trong TutorListingPage và HomePage, thay import từ mocks/tutors
 *     bằng gọi api/tutorApi.getTutors() / getTutorById().
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SUBJECTS = ["English", "IELTS", "Math", "Chemistry", "Literature", "SAT"];

export const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0,      max: Infinity },
  { label: "< 100.000đ",     min: 0,      max: 100000   },
  { label: "100k – 200k",    min: 100000, max: 200000   },
  { label: "200k – 400k",    min: 200000, max: 400000   },
  { label: "> 400.000đ",     min: 400000, max: Infinity },
];

export const tutors = [
  {
    id: 1,
    name: "Nguyễn Thanh Tùng",
    initials: "TT",
    avatarBg: "bg-blue-500",
    title: "Cử nhân Toán — ĐH Khoa học Tự nhiên",
    university: "ĐH Khoa học Tự nhiên HCM",
    subject: "Math",
    subjectColor: "text-blue-600 bg-blue-50",
    location: "Hà Nội",
    rating: 4.8,
    reviewCount: 32,
    pricePerHour: 250000,
    bio: "Gia sư toán 5 năm kinh nghiệm, chuyên luyện thi THPT Quốc gia và Đại học.",
    tags: ["Toán đại số", "Giải tích", "Luyện thi ĐH"],
    verified: true,
    gender: "male",
    reviews: [
      { name: "Minh Anh", rating: 5, text: "Thầy dạy rất dễ hiểu, con tôi tiến bộ rõ rệt!", date: "15/03/2025" },
      { name: "Hoàng Linh", rating: 5, text: "Phương pháp giảng hay, nhiệt tình.", date: "02/04/2025" },
    ],
    certificates: [
      { name: "Bằng Cử nhân Toán học — ĐH KHTN HCM", year: 2020, verified: true },
      { name: "Chứng chỉ Sư phạm", year: 2021, verified: true },
    ],
  },
  {
    id: 2,
    name: "Trần Minh Châu",
    initials: "MC",
    avatarBg: "bg-purple-400",
    title: "Thạc sĩ Ngôn ngữ Anh — ĐH Hà Nội",
    university: "ĐH Hà Nội",
    subject: "Tiếng Anh",
    subjectColor: "text-purple-600 bg-purple-50",
    location: "Hà Nội",
    rating: 5.0,
    reviewCount: 18,
    pricePerHour: 300000,
    bio: "Chuyên luyện IELTS, TOEIC và tiếng Anh giao tiếp. Cam kết đầu ra rõ ràng.",
    tags: ["IELTS", "TOEIC", "Giao tiếp", "Ngữ pháp"],
    verified: true,
    gender: "female",
    reviews: [
      { name: "Thu Hà", rating: 5, text: "Cô dạy cực kỳ bài bản, IELTS của mình lên 7.0!", date: "20/02/2025" },
    ],
    certificates: [
      { name: "IELTS 8.5", year: 2022, verified: true },
      { name: "Thạc sĩ Ngôn ngữ Anh — ĐH Hà Nội", year: 2023, verified: true },
    ],
  },
  {
    id: 3,
    name: "Lê Hữu Phúc",
    initials: "HP",
    avatarBg: "bg-green-500",
    title: "Kỹ sư Hóa học — ĐH Bách Khoa HCM",
    university: "ĐH Bách Khoa HCM",
    subject: "Chemistry",
    subjectColor: "text-green-600 bg-green-50",
    location: "TP. Hồ Chí Minh",
    rating: 4.6,
    reviewCount: 11,
    pricePerHour: 220000,
    bio: "Dạy Hóa phổ thông và luyện thi đại học khối A, B. Đặc biệt giỏi Hóa hữu cơ.",
    tags: ["Hóa hữu cơ", "Hóa vô cơ", "Luyện thi ĐH"],
    verified: false,
    gender: "male",
    reviews: [],
    certificates: [
      { name: "Kỹ sư Hóa học — ĐH Bách Khoa HCM", year: 2021, verified: false },
    ],
  },
  {
    id: 4,
    name: "Vũ Hồng Hạnh",
    initials: "HH",
    avatarBg: "bg-teal-500",
    title: "Cử nhân Sư phạm Toán — ĐH Sư phạm Hà Nội",
    university: "ĐH Sư phạm Hà Nội",
    subject: "Math",
    subjectColor: "text-blue-600 bg-blue-50",
    location: "Hà Nội",
    rating: 5.0,
    reviewCount: 7,
    pricePerHour: 90000,
    bio: "Gia sư toán tận tâm, phù hợp học sinh THCS và THPT. Giải ba HSG toán lớp 12.",
    tags: ["Toán THCS", "Toán THPT", "HSG"],
    verified: true,
    gender: "female",
    reviews: [
      { name: "vanhaia1", rating: 4, text: "tốt", date: "3/23/2026" },
    ],
    certificates: [
      { name: "Cựu học sinh Chuyên Toán Tin. Giải Ba HSG toán lớp 12", year: 2021, verified: true },
    ],
  },
];

/** Lấy tutor theo id (dùng khi chưa có backend) */
export function getTutorById(id) {
  return tutors.find((t) => String(t.id) === String(id)) || null;
}
