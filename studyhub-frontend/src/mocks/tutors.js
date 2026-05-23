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
    avatarBg: "from-blue-400 to-blue-600",
    coverGradient: "from-blue-400 to-indigo-600",
    coverImage: "https://i.pravatar.cc/600?img=11",
    title: "Cử nhân Toán — ĐH Khoa học Tự nhiên",
    university: "ĐH Khoa học Tự nhiên HCM",
    subject: "Math",
    location: "Hà Nội",
    rating: 4.8, reviewCount: 32,
    pricePerHour: 250000, priceMin: 250000, priceMax: 400000, rateType: "hour",
    bio: "Gia sư toán 5 năm kinh nghiệm, chuyên luyện thi THPT Quốc gia và Đại học.",
    tags: ["Toán đại số", "Giải tích", "Luyện thi ĐH"],
    verified: true,
    reviews: [
      { name: "Minh Anh", rating: 5, text: "Thầy dạy rất dễ hiểu!", date: "15/03/2025" },
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
    avatarBg: "from-purple-400 to-purple-600",
    coverGradient: "from-purple-400 to-pink-500",
    coverImage: "https://i.pravatar.cc/600?img=5",
    title: "Thạc sĩ Ngôn ngữ Anh — ĐH Hà Nội",
    university: "ĐH Hà Nội",
    subject: "English",
    location: "Hà Nội",
    rating: 5.0, reviewCount: 18,
    pricePerHour: 300000, priceMin: 200000, priceMax: 350000, rateType: "session",
    bio: "Chuyên luyện IELTS, TOEIC và tiếng Anh giao tiếp. Cam kết đầu ra rõ ràng.",
    tags: ["IELTS", "TOEIC", "Giao tiếp"],
    verified: true,
    reviews: [
      { name: "Thu Hà", rating: 5, text: "IELTS của mình lên 7.0!", date: "20/02/2025" },
    ],
    certificates: [
      { name: "IELTS 8.5", year: 2022, verified: true },
    ],
  },
  {
    id: 3,
    name: "Lê Hữu Phúc",
    initials: "HP",
    avatarBg: "from-green-400 to-green-600",
    coverGradient: "from-green-400 to-teal-500",
    coverImage: "https://i.pravatar.cc/600?img=15",
    title: "Kỹ sư Hóa học — ĐH Bách Khoa HCM",
    university: "ĐH Bách Khoa HCM",
    subject: "Chemistry",
    location: "TP. Hồ Chí Minh",
    rating: 4.6, reviewCount: 11,
    pricePerHour: 220000, priceMin: 150000, priceMax: 250000, rateType: "hour",
    bio: "Dạy Hóa phổ thông và luyện thi đại học khối A, B.",
    tags: ["Hóa hữu cơ", "Hóa vô cơ", "Luyện thi ĐH"],
    verified: false,
    reviews: [],
    certificates: [
      { name: "Kỹ sư Hóa học — ĐH Bách Khoa HCM", year: 2021, verified: false },
    ],
  },
  {
    id: 4,
    name: "Vũ Hồng Hạnh",
    initials: "HH",
    avatarBg: "from-teal-400 to-teal-600",
    coverGradient: "from-teal-400 to-cyan-500",
    coverImage: "https://i.pravatar.cc/600?img=47",
    title: "Cử nhân Sư phạm Toán — ĐH Sư phạm Hà Nội",
    university: "ĐH Sư phạm Hà Nội",
    subject: "Math",
    location: "Hà Nội",
    rating: 5.0, reviewCount: 7,
    pricePerHour: 90000, priceMin: 80000, priceMax: 120000, rateType: "session",
    bio: "Gia sư toán tận tâm, phù hợp học sinh THCS và THPT.",
    tags: ["Toán THCS", "Toán THPT", "HSG"],
    verified: true,
    reviews: [{ name: "vanhaia1", rating: 4, text: "tốt", date: "3/23/2026" }],
    certificates: [
      { name: "Giải Ba HSG Toán lớp 12", year: 2021, verified: true },
    ],
  },
];

export function getTutorById(id) {
  return tutors.find((t) => String(t.id) === String(id)) || null;
}