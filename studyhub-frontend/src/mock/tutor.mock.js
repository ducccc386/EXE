// =============================================================================
// TUTOR MOCK DATA
// =============================================================================

export const MOCK_TUTOR_PROFILE = {
  id: "GS-001",
  fullName: "Dr. Teresa Thompson PhD",
  role: "Gia sư Cao cấp",
  experience: "5 năm kinh nghiệm",
  rating: 4.9,
  successRate: 98,
  certifications: [
    { title: "IELTS Academic 8.5",  issuer: "",                    year: "2024", icon: "🇬🇧" },
    { title: "Sư phạm Toán học",    issuer: "ĐH Sư Phạm HN",      year: "2022", icon: "📐" },
    { title: "Tư duy sáng tạo",     issuer: "StudyMate Academy",   year: "2025", icon: "🧠" },
  ],
  bio: "Tôi tin rằng mỗi học sinh đều có một điểm chạm tư duy riêng. Thay vì ép khuôn mẫu, tôi kích thích sự tò mò và cá nhân hóa lộ trình học.",
};

export const MOCK_TUTOR_STATS = {
  activeClasses: 4,
  avgRating: 4.9,
  monthlyHours: 120,
  availableBalance: 12500000,
  escrowBalance: 2500000,
  monthlyEarnings: 15000000,
};

export const MOCK_TUTOR_CLASSES = [
  {
    id: "SM-88201",
    subject: "Toán Nâng Cao 10",
    student: "Thế Anh",
    totalSessions: 12,
    completedSessions: 8,
    status: "active",
  },
];

export const MOCK_TUTOR_SCHEDULE = [
  {
    id: "SCH-001",
    classId: "SM-88201",
    subject: "Toán 10",
    student: "Thế Anh",
    date: "Hôm nay",
    displayDate: "24/03",
    time: "19:00 - 21:00",
    type: "online",
    sessionNumber: 9,
    status: "upcoming",
  },
];

export const MOCK_TUTOR_EARNINGS = [
  {
    contractId: "SM-88201",
    subject: "Toán 10",
    student: "Thế Anh",
    amount: 2500000,
    completedSessions: 8,
    totalSessions: 10,
    status: "PENDING_REPORT", // PENDING_REPORT | PENDING_RELEASE | RELEASED
  },
];

export const MOCK_PENDING_REPORT = {
  classId: "SM-88201",
  subject: "Toán 10",
  student: "Thế Anh",
  sessionNumber: 8,
  time: "19:00 - 21:00",
};
