import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES, ROLES } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage            from "./pages/HomePage";
import LoginPage           from "./pages/LoginPage";
import TutorListingPage    from "./pages/TutorListingPage";
import TutorProfilePage    from "./pages/TutorProfilePage";
import NewsPage            from "./pages/NewsPage";
import ContactPage         from "./pages/ContactPage";
import MaterialsPage       from "./pages/MaterialsPage";

// Role dashboards
import TutorDashboard  from "./pages/Tutor/TutorDashboard";
import ParentDashboard from "./pages/Parent/ParentDashboard";
import AdminDashboard  from "./pages/Admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path={ROUTES.HOME}     element={<HomePage />} />
        <Route path={ROUTES.LOGIN}    element={<LoginPage />} />
        <Route path={ROUTES.TUTORS}   element={<TutorListingPage />} />
        <Route path="/tutors/:id"     element={<TutorProfilePage />} />
        <Route path={ROUTES.NEWS}     element={<NewsPage />} />
        <Route path={ROUTES.CONTACT}  element={<ContactPage />} />
        <Route path={ROUTES.MATERIALS} element={<MaterialsPage />} />

        {/* ── Protected: Admin ── */}
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Tutor ── */}
        <Route
          path={ROUTES.TUTOR_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.TUTOR]}>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Parent ── */}
        <Route
          path={ROUTES.PARENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
