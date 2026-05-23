// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:    "/auth/login",
    LOGOUT:   "/auth/logout",
    REGISTER: "/auth/register",
    ME:       "/auth/me",
  },

  TUTORS: {
    LIST:    "/tutors",
    BY_ID:   (id) => `/tutors/${id}`,
  },

  TUTOR: {
    PROFILE:  "/tutor/profile",
    STATS:    "/tutor/stats",
    CLASSES:  "/tutor/classes",
    SCHEDULE: "/tutor/schedule",
    EARNINGS: "/tutor/earnings",
  },

  PARENT: {
    MATCH:       "/parent/match",
    BOOK_TRIAL:  "/parent/book-trial",
    CLASSES:     "/parent/classes",
    ESCROW:      "/parent/escrow",
    TOPUP:       "/parent/topup",
    ASSESSMENTS: "/parent/assessments",
  },

  ADMIN: {
    STATS:    "/admin/stats",
    USERS:    "/admin/users",
    EKYC:     "/admin/ekyc",
    FINANCE:  "/admin/finance",
    MATCHING: "/admin/matching",
  },

  MATERIALS: "/materials",
  NEWS:      "/news",

  CHAT: {
    FRIENDS:      "/chat/friends",
    MESSAGES:     (friendId) => `/chat/messages/${friendId}`,
    SEND:         "/chat/messages",
    MARK_READ:    (friendId) => `/chat/messages/${friendId}/read`,
    UNREAD_COUNT: "/chat/unread-count",
    WS:           "/ws/chat",
  },
};

// ─── Routes ───────────────────────────────────────────────────────────────────
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

// ─── Roles ────────────────────────────────────────────────────────────────────
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
