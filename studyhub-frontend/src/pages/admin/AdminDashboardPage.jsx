/**
 * pages/admin/AdminDashboardPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dashboard tổng quan cho Admin (role: ADMIN).
 *
 * [TODO] Kết nối backend khi sẵn sàng:
 *   import { getAdminStats, getUsers, getEkycQueue } from "../../api/adminApi";
 *
 * Spring Boot cần:
 *   GET /api/admin/stats → { totalUsers, activeTutors, pendingEkyc, revenueThisMonth }
 *   GET /api/admin/users → Page<UserDTO>
 *   GET /api/admin/ekyc  → EkycRequestDTO[]
 * ─────────────────────────────────────────────────────────────────────────────
 */
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const blocks = [
  { title: "Người dùng mới", value: "+128", color: "text-blue-700" },
  { title: "eKYC chờ duyệt", value: "15", color: "text-orange-600" },
  { title: "Lớp cần match", value: "8", color: "text-green-600" },
  { title: "Escrow đang giữ", value: "62M", color: "text-purple-700" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard (Demo)</h1>
        <p className="text-gray-500 mt-2">Bảng điều khiển quản trị tổng quan.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {blocks.map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className={`text-3xl font-extrabold mt-2 ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Hàng đợi ưu tiên</h2>
          <ul className="space-y-3 text-gray-700">
            <li>Duyệt hồ sơ gia sư: 5 hồ sơ mới</li>
            <li>Yêu cầu hoàn tiền escrow: 2 yêu cầu</li>
            <li>Báo cáo vi phạm: 1 cảnh báo chờ xử lý</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
