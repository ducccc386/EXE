// =============================================================================
// ADMIN MOCK DATA
// Toàn bộ dữ liệu giả cho Admin domain nằm ở đây.
// Khi backend sẵn sàng → xóa file này, KHÔNG cần đụng vào component.
// =============================================================================

export const MOCK_ADMIN_STATS = {
  newUsers: "+128",
  pendingEkyc: 15,
  pendingMatch: 1,
  totalEscrow: "5.5M",
};

export const MOCK_USERS = [
  { id: "GS-9901", name: "Dr. Teresa Thompson PhD",  email: "teresa.t@university.edu",   phone: "(+1) 123-321-1234",   role: "TUTOR",  status: "Approved", eKYC: true  },
  { id: "PH-2024", name: "Nguyễn Văn Tú",            email: "tu.nguyen@gmail.com",       phone: "(+84) 901-234-567",  role: "PARENT", status: "Active",   eKYC: false },
  { id: "GS-9905", name: "Somesh Great",              email: "somesh.great@company.com",  phone: "(+91) 987-654-3210", role: "TUTOR",  status: "Pending",  eKYC: false },
  { id: "GS-9902", name: "Lê Thị Hồng Hạnh",        email: "hanh.le@outlook.com",       phone: "(+84) 988-777-666",  role: "TUTOR",  status: "Approved", eKYC: true  },
  { id: "GS-9904", name: "Trần Minh Tâm",            email: "tam.tran@tutor.vn",         phone: "(+84) 912-000-111",  role: "TUTOR",  status: "Rejected", eKYC: true  },
];

export const MOCK_EKYC_PENDING = [
  {
    id: "TUT-9901",
    name: "Nguyễn Thị Phương Thảo",
    role: "Gia sư Sinh viên",
    school: "Đại học Quốc gia TP.HCM",
    major: "Business Administration",
    gpa: "3.8/4.0",
    matchScore: 95,
    idNumber: "031092001234",
    certificates: [
      { name: "IELTS Academic", score: "8.0",  issueDate: "2025", provider: "British Council" },
      { name: "Giải Nhì Toán Tỉnh", score: "9.5", issueDate: "2023", provider: "Sở GD&ĐT" },
    ],
    selfieImg:  "https://nld.mediacdn.vn/zoom/594_371/291774122806476800/2023/9/6/edit-hinh2-1694005434985814384572.png",
    cardImg:    "https://images2.thanhnien.vn/528068263637045248/2023/11/27/doi-ten-the-can-cuoc-1701048226664995346108.jpg",
    degreeImg:  "https://lambangdaihocphoithat.com/wp-content/uploads/2022/08/Lam-bang-Dai-hoc-Quoc-gia-TPHCM.jpg",
    requestDate: "2026-03-23 09:45",
  },
  {
    id: "TUT-8824",
    name: "Lê Minh Anh",
    role: "Giáo viên tự do",
    school: "Đại học Sư Phạm TP.HCM",
    major: "Sư phạm Tiếng Anh",
    gpa: "3.9/4.0",
    matchScore: 89,
    idNumber: "079095005678",
    certificates: [
      { name: "TESOL Certificate",  score: "Distinction", issueDate: "2024", provider: "Madison University" },
      { name: "IELTS Academic",     score: "8.5",         issueDate: "2024", provider: "IDP" },
    ],
    selfieImg:  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    cardImg:    "https://images.unsplash.com/photo-1610123590390-eb41da009c34?w=600&h=400&fit=crop",
    degreeImg:  "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&h=400&fit=crop",
    requestDate: "2026-03-23 10:20",
  },
  {
    id: "TUT-7750",
    name: "Trần Hoàng Nam",
    role: "Gia sư Sinh viên",
    school: "Đại học Bách Khoa",
    major: "Điện - Điện tử",
    gpa: "3.2/4.0",
    matchScore: 52,
    idNumber: "001095009999",
    certificates: [
      { name: "Giải Ba Vật Lý Quốc Gia", score: "8.75", issueDate: "2022", provider: "Bộ GD&ĐT" },
    ],
    selfieImg:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    cardImg:    "https://images.unsplash.com/photo-1610123590390-eb41da009c34?w=600&h=400&fit=crop",
    degreeImg:  "https://images.unsplash.com/photo-1621460249265-276632c0211a?w=600&h=400&fit=crop",
    requestDate: "2026-03-23 11:05",
  },
];

export const MOCK_TRANSACTIONS = [
  { id: "TRX-88201", parent: "Nguyễn Văn A", tutor: "Đặng Tuấn",       amount: 2500000, status: "HELD",     subject: "Toán 10",    date: "2026-03-20", progress: "0/10 buổi"  },
  { id: "TRX-88202", parent: "Trần Thị B",   tutor: "Lê Minh Anh",     amount: 1800000, status: "RELEASED", subject: "Tiếng Anh",  date: "2026-03-15", progress: "12/12 buổi" },
  { id: "TRX-88203", parent: "Lê Văn C",     tutor: "Trần Hoàng Nam",  amount: 3000000, status: "DISPUTE",  subject: "Vật Lý",     date: "2026-03-22", progress: "2/10 buổi"  },
];

export const MOCK_PENDING_JOBS = [
  {
    id: "JOB-2026-001",
    parentName: "Chị Lan (Quận 10)",
    subject: "Toán lớp 10",
    studentPersonality: "Hướng nội, cần gia sư kiên nhẫn",
    coords: { lat: 10.776, lng: 106.667 },
    candidates: [
      { id: "TUT-9901", name: "Đặng Tuấn",   dist: "1.2 km", personalityScore: 92, tags: ["Kiên nhẫn", "Tâm lý"] },
      { id: "TUT-8824", name: "Lê Minh Anh", dist: "5.5 km", personalityScore: 75, tags: ["Nghiêm túc", "Chuyên môn cao"] },
    ],
  },
];
