// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/**
 * Tất cả Spring Boot endpoints được định nghĩa tập trung tại đây.
 * Khi backend thay đổi path → chỉ cần sửa 1 chỗ này.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:    "/auth/login",     // POST  { email, password } → { token, id, fullName, email, role }
    LOGOUT:   "/auth/logout",    // POST  (optional, dùng để revoke token phía server)
    REGISTER: "/auth/register",  // POST  { fullName, email, password, role }
    ME:       "/auth/me",        // GET   → user object (dùng để refresh session)
  },

  // Public — không cần token
  TUTORS: {
    LIST:  "/tutors",            // GET   ?subject=&location=&priceMax=&page= → Page<TutorDTO>
    BY_ID: (id) => `/tutors/${id}`, // GET → TutorDTO (gồm reviews, certificates)
  },

  // Authenticated — role: TUTOR
  TUTOR: {
    PROFILE:  "/tutor/profile",  // GET / PUT  → TutorProfileDTO
    STATS:    "/tutor/stats",    // GET        → { totalStudents, totalSessions, rating, earnings }
    CLASSES:  "/tutor/classes",  // GET        → ClassDTO[]
    SCHEDULE: "/tutor/schedule", // GET        → ScheduleDTO[]
    EARNINGS: "/tutor/earnings", // GET        → EarningsDTO
  },

  // Authenticated — role: PARENT
  PARENT: {
    MATCH:       "/parent/match",       // POST  { subject, location, priceMax } → TutorDTO[]
    BOOK_TRIAL:  "/parent/book-trial",  // POST  { tutorId, date, timeSlot }     → BookingDTO
    CLASSES:     "/parent/classes",     // GET                                   → ClassDTO[]
    ESCROW:      "/parent/escrow",      // GET                                   → { balance, currency }
    TOPUP:       "/parent/topup",       // POST  { amount }                      → { balance }
    ASSESSMENTS: "/parent/assessments", // GET                                   → AssessmentDTO[]
  },

  // Authenticated — role: ADMIN
  ADMIN: {
    STATS:    "/admin/stats",    // GET → AdminStatsDTO
    USERS:    "/admin/users",    // GET ?page=&role=&search=  → Page<UserDTO>
    EKYC:     "/admin/ekyc",     // GET → EkycRequestDTO[]
    FINANCE:  "/admin/finance",  // GET → FinanceReportDTO
    MATCHING: "/admin/matching", // GET → MatchingLogDTO[]
  },

  MATERIALS: "/materials",       // GET ?type=&subject= → MaterialDTO[]
  NEWS:      "/news",            // GET ?page= → Page<NewsDTO>

  CHAT: {
    FRIENDS:      "/chat/friends",                           // GET → FriendDTO[]
    MESSAGES:     (friendId) => `/chat/messages/${friendId}`,// GET ?page=&size= → MessageDTO[]
    SEND:         "/chat/messages",                          // POST { receiverId, content } → MessageDTO
    MARK_READ:    (friendId) => `/chat/messages/${friendId}/read`, // PUT
    UNREAD_COUNT: "/chat/unread-count",                      // GET → { count }
    WS:           "/ws/chat",                                // WS  ?token=<jwt>
  },
};

// ─── Frontend Routes ──────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:             "/",
  LOGIN:            "/login",
  REGISTER:         "/register",
  HELP:             "/help",
  PROFILE:          "/profile",
  CHAT:             "/chat",
  TUTORS:           "/tutors",
  TUTOR_PROFILE:    (id) => `/tutors/${id}`,
  TUTOR_DASHBOARD:  "/tutor/dashboard",
  PARENT_DASHBOARD: "/parent/dashboard",
  ADMIN_DASHBOARD:  "/admin/dashboard",
};

// ─── Roles — phải khớp với enum UserRole trong Spring Boot ────────────────────
export const ROLES = {
  ADMIN:  "ADMIN",
  TUTOR:  "TUTOR",
  PARENT: "PARENT",
};

export const ROLE_DASHBOARD = {
  [ROLES.ADMIN]:  ROUTES.ADMIN_DASHBOARD,
  [ROLES.TUTOR]:  ROUTES.TUTOR_DASHBOARD,
  [ROLES.PARENT]: ROUTES.PARENT_DASHBOARD,
};

// ─── LocalStorage keys ────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  USER:  "studyhub_user",
  TOKEN: "studyhub_token",
};
