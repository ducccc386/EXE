import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES, ROLES } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import TutorProfilePage from "./pages/TutorProfilePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path="/tutors/:id" element={<TutorProfilePage />} />



      </Routes>
    </BrowserRouter>
  );
}
