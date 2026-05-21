import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES, ROLES } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TutorListingPage from "./pages/TutorListingPage";
import HelpPage from "./pages/HelpPage";
import ProfilePage from "./pages/ProfilePage";
import TutorDashboardPage from "./pages/TutorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.TUTORS} element={<TutorListingPage />} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

        <Route
          path={ROUTES.TUTOR_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.TUTOR]}>
              <TutorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PARENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
              <ParentDashboardPage />
            </ProtectedRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  );
}
