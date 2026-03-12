// =============================================
// MOCK DATA - Replace with API calls later:
// import api from '../services/api'
// const tutors = await api.get('/tutors')
// =============================================

export const SUBJECTS = [
  "Tất cả", "Toán học", "Vật lý", "Hóa học", "Sinh học",
  "Tiếng Anh", "Lập trình", "Văn học", "Lịch sử", "Địa lý",
];

export const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 100.000đ/giờ", min: 0, max: 100000 },
  { label: "100.000 – 200.000đ/giờ", min: 100000, max: 200000 },
  { label: "200.000 – 350.000đ/giờ", min: 200000, max: 350000 },
  { label: "Trên 350.000đ/giờ", min: 350000, max: Infinity },
];

export const tutors = [
  {
    id: 1,
    name: "Nguyễn Thanh Tùng",
    avatar: null,
    initials: "TT",
    avatarBg: "bg-blue-500",
    subject: "Toán học",
    subjectColor: "text-blue-600 bg-blue-50",
    title: "Thạc sĩ Toán ứng dụng – ĐH Bách Khoa HCM",
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 250000,
    totalSessions: 340,
    verified: true,
    tags: ["Giải tích", "Đại số tuyến tính", "Xác suất thống kê"],
    bio: "7 năm kinh nghiệm giảng dạy Toán cho học sinh THPT và sinh viên đại học. Phương pháp dạy trực quan, dễ hiểu.",
    availability: "Thứ 2 – Thứ 6, 18:00 – 22:00",
  },
  {
    id: 2,
    name: "Trần Minh Châu",
    avatar: null,
    initials: "MC",
    avatarBg: "bg-orange-500",
    subject: "Tiếng Anh",
    subjectColor: "text-orange-600 bg-orange-50",
    title: "IELTS 8.5 – Cử nhân Ngôn ngữ Anh ĐH KHXH&NV",
    rating: 5.0,
    reviewCount: 94,
    pricePerHour: 300000,
    totalSessions: 210,
    verified: true,
    tags: ["IELTS", "TOEIC", "Giao tiếp", "Phát âm"],
    bio: "Chuyên luyện IELTS và TOEIC. Hơn 90% học viên đạt mục tiêu sau 3 tháng học.",
    availability: "Thứ 7, Chủ nhật, linh hoạt",
  },
  {
    id: 3,
    name: "Lê Hoàng Phúc",
    avatar: null,
    initials: "HP",
    avatarBg: "bg-green-500",
    subject: "Lập trình",
    subjectColor: "text-green-600 bg-green-50",
    title: "Senior Engineer tại FPT Software – 8 năm kinh nghiệm",
    rating: 4.8,
    reviewCount: 67,
    pricePerHour: 400000,
    totalSessions: 156,
    verified: true,
    tags: ["React", "Node.js", "Python", "SQL"],
    bio: "Kỹ sư phần mềm cấp cao, dạy lập trình từ cơ bản đến nâng cao. Định hướng dự án thực tế.",
    availability: "Linh hoạt theo lịch",
  },
  {
    id: 4,
    name: "Phạm Thị Lan Anh",
    avatar: null,
    initials: "LA",
    avatarBg: "bg-pink-500",
    subject: "Hóa học",
    subjectColor: "text-pink-600 bg-pink-50",
    title: "Thạc sĩ Hóa hữu cơ – ĐH Khoa học Tự nhiên HCM",
    rating: 4.7,
    reviewCount: 53,
    pricePerHour: 180000,
    totalSessions: 198,
    verified: true,
    tags: ["Hóa hữu cơ", "Hóa vô cơ", "Luyện thi ĐH"],
    bio: "Chuyên ôn thi THPT Quốc gia và thi Đại học. Nhiều học viên đỗ trường Y Dược.",
    availability: "Thứ 2, 4, 6 và cuối tuần",
  },
  {
    id: 5,
    name: "Võ Đức Mạnh",
    avatar: null,
    initials: "ĐM",
    avatarBg: "bg-purple-500",
    subject: "Vật lý",
    subjectColor: "text-purple-600 bg-purple-50",
    title: "Giáo viên Vật lý THPT – 10 năm kinh nghiệm",
    rating: 4.6,
    reviewCount: 112,
    pricePerHour: 150000,
    totalSessions: 520,
    verified: false,
    tags: ["Vật lý đại cương", "Cơ học", "Điện từ học"],
    bio: "Kinh nghiệm 10 năm dạy Vật lý. Phương pháp ôn thi hiệu quả, nhiều mẹo làm bài.",
    availability: "Tất cả các ngày trong tuần",
  },
  {
    id: 6,
    name: "Nguyễn Thị Hương",
    avatar: null,
    initials: "TH",
    avatarBg: "bg-teal-500",
    subject: "Sinh học",
    subjectColor: "text-teal-600 bg-teal-50",
    title: "Cử nhân Sinh học – ĐH Khoa học Tự nhiên HN",
    rating: 4.5,
    reviewCount: 41,
    pricePerHour: 120000,
    totalSessions: 87,
    verified: false,
    tags: ["Sinh học tế bào", "Di truyền học", "Luyện thi ĐH"],
    bio: "Tốt nghiệp loại giỏi ngành Sinh học. Kiên nhẫn, dễ hiểu, phù hợp học sinh cần học căn bản.",
    availability: "Buổi tối từ thứ 2 – thứ 6",
  },
];

// =============================================
// TUTOR PROFILE DETAIL (for TutorProfilePage)
// In production: fetch by id from /tutors/:id
// =============================================
export const getTutorById = (id) => {
  const base = tutors.find((t) => t.id === parseInt(id));
  if (!base) return null;
  return {
    ...base,
    certificates: [
      { name: "Bằng Thạc sĩ – ĐH Bách Khoa HCM", year: "2018", verified: true },
      { name: "Chứng chỉ Giảng dạy Quốc tế (TESOL)", year: "2020", verified: true },
      { name: "Chứng nhận Gia sư StudyHub", year: "2023", verified: true },
    ],
    reviews: [
      { name: "Nguyễn Văn A", rating: 5, date: "10/03/2025", text: "Gia sư giảng rất dễ hiểu, điểm thi của tôi cải thiện rõ rệt!" },
      { name: "Trần Thị B", rating: 5, date: "05/03/2025", text: "Rất kiên nhẫn và tận tâm. Sẽ học tiếp ở kỳ sau." },
      { name: "Lê Hoàng C", rating: 4, date: "01/03/2025", text: "Giảng dạy tốt, đúng giờ, tài liệu chuẩn bị kỹ." },
    ],
    // Calendar availability (week view mock)
    calendar: {
      mon: ["18:00", "19:00", "20:00"],
      tue: ["19:00", "20:00"],
      wed: ["18:00", "19:00", "20:00", "21:00"],
      thu: [],
      fri: ["18:00", "19:00"],
      sat: ["09:00", "10:00", "14:00", "15:00"],
      sun: ["10:00", "14:00"],
    },
  };
};

// =============================================
// BOOKING DATA (for BookingDashboardPage)
// In production: fetch from /bookings?userId=...
// =============================================
export const mockBookings = [
  {
    id: "BK-2025-001",
    tutor: tutors[0],
    subject: "Toán học – Giải tích",
    date: "Thứ 4, 19/03/2025",
    time: "19:00 – 20:30",
    duration: 90,
    price: 375000,
    status: "escrow", // tiền đang giữ
    statusLabel: "Tiền đang được giữ bởi hệ thống",
    completedAt: null,
  },
  {
    id: "BK-2025-002",
    tutor: tutors[1],
    subject: "Tiếng Anh – IELTS Speaking",
    date: "Thứ 7, 15/03/2025",
    time: "10:00 – 11:00",
    duration: 60,
    price: 300000,
    status: "completed",
    statusLabel: "Đã hoàn thành – Tiền đã chuyển cho gia sư",
    completedAt: "15/03/2025 lúc 11:05",
  },
  {
    id: "BK-2025-003",
    tutor: tutors[2],
    subject: "Lập trình – React cơ bản",
    date: "Thứ 6, 21/03/2025",
    time: "20:00 – 22:00",
    duration: 120,
    price: 800000,
    status: "upcoming",
    statusLabel: "Sắp diễn ra",
    completedAt: null,
  },
];