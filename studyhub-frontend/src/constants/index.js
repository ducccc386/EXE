// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  // Auth
  LOGIN:    "/auth/login",
  LOGOUT:   "/auth/logout",
  REGISTER: "/auth/register",
  ME:       "/auth/me",

  // Public - Tutors
  TUTORS:       "/tutors",
  TUTOR_BY_ID:  (id) => `/tutors/${id}`,

  // Public - Materials & News
  MATERIALS: "/materials",
  NEWS:      "/news",

  // Admin
  ADMIN_STATS:    "/admin/stats",
  ADMIN_USERS:    "/admin/users",
  ADMIN_EKYC:     "/admin/ekyc",
  ADMIN_FINANCE:  "/admin/finance",
  ADMIN_MATCHING: "/admin/matching",

  // Tutor (authenticated)
  TUTOR_PROFILE:        "/tutor/profile",
  TUTOR_STATS:          "/tutor/stats",
  TUTOR_CLASSES:        "/tutor/classes",
  TUTOR_SCHEDULE:       "/tutor/schedule",
  TUTOR_EARNINGS:       "/tutor/earnings",
  TUTOR_PENDING_REPORT: "/tutor/pending-report",

  // Parent (authenticated)
  PARENT_MATCH:       "/parent/match",
  PARENT_BOOK_TRIAL:  "/parent/book-trial",
  PARENT_CLASSES:     "/parent/classes",
  PARENT_ESCROW:      "/parent/escrow",
  PARENT_TOPUP:       "/parent/topup",
  PARENT_ASSESSMENTS: "/parent/assessments",
};

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:             "/",
  LOGIN:            "/login",
  REGISTER:         "/register",
  TUTORS:           "/tutors",
  TUTOR_PROFILE:    (id) => `/tutors/${id}`,
  NEWS:             "/news",
  CONTACT:          "/contact",
  MATERIALS:        "/materials",
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

// ─── LocalStorage ─────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  USER:  "studyhub_user",
  TOKEN: "studyhub_token",
};
