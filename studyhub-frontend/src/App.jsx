import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES, ROLES } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

// ─── Pages ────────────────────────────────────────────────────────────────────
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/auth/LoginPage";
import TutorListingPage from "./pages/tutor/TutorListingPage";
import TutorProfilePage from "./pages/tutor/TutorProfilePage";
import TutorDashboardPage from "./pages/tutor/TutorDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ParentDashboardPage from "./pages/parent/ParentDashboardPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ─────────────────────────────────────────────── */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.TUTORS} element={<TutorListingPage />} />
        <Route path="/tutors/:id" element={<TutorProfilePage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />

        {/* ── Protected: Tutor ───────────────────────────────────── */}
        <Route
          path={ROUTES.TUTOR_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.TUTOR]}>
              <TutorDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Parent ──────────────────────────────────── */}
        <Route
          path={ROUTES.PARENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
              <ParentDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Admin ───────────────────────────────────── */}
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
