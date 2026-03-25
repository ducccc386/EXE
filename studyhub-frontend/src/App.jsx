import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import TutorListingPage from "./pages/TutorListingPage";
import TutorProfilePage from "./pages/TutorProfilePage";
import BookingDashboardPage from "./pages/BookingDashboardPage";
import LoginPage from "./pages/LoginPage";
import TutorDashboard from "./pages/Tutor/TutorDashboard";
import ParentDashboard from "./pages/Parent/ParentDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MaterialsPage from "./pages/MaterialsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Main Demo Flow ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tutors" element={<TutorListingPage />} />
        <Route path="/tutors/:id" element={<TutorProfilePage />} />
        <Route path="/booking" element={<BookingDashboardPage />} />

        {/* ── Other pages ── */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/materials" element={<MaterialsPage />} />

        {/* ── Protected dashboards ── */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["TUTOR"]}>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["PARENT"]}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;