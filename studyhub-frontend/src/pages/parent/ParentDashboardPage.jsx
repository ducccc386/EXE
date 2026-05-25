/**
 * pages/parent/ParentDashboardPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dashboard tổng quan cho Phụ huynh (role: PARENT).
 *
 * [TODO] Kết nối backend khi sẵn sàng:
 *   import { getMyClasses, getEscrow, getAssessments } from "../../api/parentApi";
 *
 * Spring Boot cần:
 *   GET /api/parent/classes     → ClassDTO[]
 *   GET /api/parent/escrow      → { balance, currency }
 *   GET /api/parent/assessments → AssessmentDTO[]
 * ─────────────────────────────────────────────────────────────────────────────
 */
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Parent Dashboard (Demo)</h1>
        <p className="text-gray-500 mt-2">Trang tổng quan nhanh cho phụ huynh.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Buổi học tuần này</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">4</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Gia sư đang theo</p>
            <p className="text-3xl font-extrabold text-orange-600 mt-2">2</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tiến độ học tập</p>
            <p className="text-3xl font-extrabold text-green-600 mt-2">82%</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
