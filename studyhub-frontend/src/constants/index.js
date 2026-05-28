// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/**
 * Tất cả Spring Boot endpoints được định nghĩa tập trung tại đây.
 * Khi backend thay đổi path → chỉ cần sửa 1 chỗ này.
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",     // POST  { email, password } → { id, token, fullName, email, role }
    REGISTER: "/auth/register",  // POST  { fullName, email, password, role }
    ME: "/auth/me",        // GET   → user object
  },

  // Public Subjects
  SUBJECTS: "/subjects",         // GET → Subject[]

  // Tutors (Public)
  TUTOR_ALL: "/tutor/all",       // GET → TutorProfile[]
  TUTOR_BY_ID: (id) => `/tutor/${id}`, // GET → TutorProfile

  // Tutor Profile Management (Auth: TUTOR)
  TUTOR: {
    PROFILE_GET: (userId) => `/tutor/profile/${userId}`,   // GET
    PROFILE_UPDATE: "/tutor/profile/update",               // PUT { bio, education, experienceYears, ... }
    SUBJECTS_UPDATE: "/tutor/subjects/update",             // POST { tutorProfileId, subjectIds[] }
  },

  // Job/Request Management (TutorHub)
  TUTORHUB: {
    REQUESTS_CREATE: "/tutorhub/requests/create",          // POST { parentId, subjectId, title, ... }
    REQUESTS_OPEN: "/tutorhub/requests/open",              // GET → ParentRequest[]
    APPLY: "/tutorhub/apply",                              // POST { requestId, tutorProfileId, message }
    APPLICATIONS_ACCEPT: (appId) => `/tutorhub/applications/${appId}/accept`, // PUT
  },

  // Reviews & Ratings
  REVIEWS: {
    CREATE: "/reviews/create",                             // POST { bookingId, parentId, tutorProfileId, rating, comment }
    GET_TUTOR: (tutorId) => `/reviews/tutor/${tutorId}`,   // GET → Review[]
    GET_AVERAGE: (tutorId) => `/reviews/tutor/${tutorId}/average`, // GET → double
  },

  // Chat & Messaging
  CHAT: {
    GET_OR_CREATE_CONVERSATION: "/chat/conversations/get-or-create",  // POST { parentId, tutorProfileId }
    GET_USER_CONVERSATIONS: (userId) => `/chat/conversations/user/${userId}`, // GET
    GET_HISTORY: (conversationId) => `/chat/history/${conversationId}`, // GET
    WS: "/ws/chat",                                        // WebSocket endpoint
  },

  // Admin Management
  ADMIN: {
    GET_TUTORS: "/admin/tutors",                           // GET → TutorProfile[]
    APPROVE_TUTOR: "/admin/tutors/approve",                // PUT { tutorProfileId, status }
    GET_REQUESTS: "/admin/requests",                       // GET → ParentRequest[]
    UPDATE_REQUEST_STATUS: "/admin/requests/status",       // PUT { requestId, status }
    BAN_USER: (userId) => `/admin/users/${userId}/ban`,    // PUT ?status=BANNED|ACTIVE
  },
};

// ─── Frontend Routes ──────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  HELP: "/help",
  PROFILE: "/profile",
  CHAT: "/chat",
  TUTOR_LISTING: "/tutors",
  TUTOR_PROFILE: (id) => `/tutors/${id}`,
  TUTOR_DASHBOARD: "/tutor/dashboard",
  PARENT_DASHBOARD: "/parent/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
};

// ─── Roles — phải khớp với enum UserRole trong Spring Boot ────────────────────
export const ROLES = {
  ADMIN: "ADMIN",
  TUTOR: "TUTOR",
  PARENT: "PARENT",
};

export const ROLE_DASHBOARD = {
  [ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
  [ROLES.TUTOR]: ROUTES.TUTOR_DASHBOARD,
  [ROLES.PARENT]: ROUTES.PARENT_DASHBOARD,
};

// ─── LocalStorage keys ────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  USER: "studyhub_user",
  TOKEN: "studyhub_token",
};
