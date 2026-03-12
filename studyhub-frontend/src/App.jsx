import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import TutorListingPage from "./pages/TutorListingPage";
import TutorProfilePage from "./pages/TutorProfilePage";
import BookingDashboardPage from "./pages/BookingDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Main Demo Flow: Home → Tutors → Profile → Booking ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/tutors" element={<TutorListingPage />} />
        <Route path="/tutors/:id" element={<TutorProfilePage />} />
        <Route path="/booking" element={<BookingDashboardPage />} />

        {/* ── Other pages ── */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;