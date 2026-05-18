// =============================================================================
// PARENT MOCK DATA
// =============================================================================

export const MOCK_PARENT_PROFILE = {
  fullName: "Trần Thị Phụ Huynh",
  childName: "Lê Minh Anh",
};

export const MOCK_MATCHED_TUTORS = [
  {
    id: "TUT-9901",
    name: "Đặng Tuấn",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
    matchScore: 98,
    tags: ["Tận tâm", "Toán 10", "Dạy dễ hiểu"],
    bio: "Sinh viên xuất sắc ĐH Bách Khoa, có 3 năm kinh nghiệm luyện thi.",
    distance: "2.5 km",
    price: 250000,
  },
  {
    id: "TUT-8824",
    name: "Lê Minh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
    matchScore: 92,
    tags: ["Vui vẻ", "Toán 10", "Hình học"],
    bio: "Giáo viên tự do, chuyên trị các ca hổng kiến thức căn bản.",
    distance: "1.2 km",
    price: 300000,
  },
];

export const MOCK_PARENT_CLASSES = [
  {
    id: "CLS-2026-A1",
    contractId: "2026-A1",
    subject: "Toán nâng cao 10",
    tutorName: "Đặng Tuấn",
    tutorId: "TUT-9901",
    totalSessions: 12,
    completedSessions: 8,
    status: "active",
    pendingConfirm: true,           // buổi vừa xong chờ PH xác nhận
    pendingSessionNumber: 8,
    lastDate: "24/03/2026",
  },
];

export const MOCK_PARENT_ESCROW = {
  frozenAmount: 2500000,
  releasedThisMonth: 1800000,
  contracts: [
    {
      id: "INV-2026-001",
      subject: "Toán 10",
      tutorName: "Đặng Tuấn",
      totalAmount: 2500000,
      completedSessions: 8,
      totalSessions: 10,
      status: "HELD",             // HELD | RELEASED | DISPUTE
      lastSession: "22/03/2026",
    },
  ],
};

export const MOCK_PARENT_ASSESSMENTS = [
  {
    id: 1,
    subject: "Toán giải tích lớp 12",
    tutorName: "Đặng Tuấn",
    date: "22/03/2026",
    scores: { attendance: 10, comprehension: 8, attitude: 9 },
    feedback: "Em Anh nắm vững công thức đạo hàm, tuy nhiên phần khảo sát hàm số cần chú ý kỹ hơn các điểm cực trị.",
    plan: "Buổi tới sẽ tập trung luyện đề thi thử đại học phần Hàm số.",
  },
  {
    id: 2,
    subject: "Tiếng Anh Giao tiếp",
    tutorName: "Lê Minh Anh",
    date: "20/03/2026",
    scores: { attendance: 9, comprehension: 9, attitude: 10 },
    feedback: "Em học rất chăm chỉ và tiến bộ rõ rệt về phát âm.",
    plan: "Luyện tập Speaking chủ đề IELTS Part 2.",
  },
];
