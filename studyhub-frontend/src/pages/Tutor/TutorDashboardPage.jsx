import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const stats = [
  { label: "Lớp đang dạy", value: "6" },
  { label: "Học viên mới", value: "14" },
  { label: "Đánh giá TB", value: "4.9" },
  { label: "Thu nhập tháng", value: "18.5M" },
];

export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Tutor Dashboard (Demo)</h1>
        <p className="text-gray-500 mt-2">Tổng quan nhanh cho tài khoản gia sư.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-3xl font-extrabold text-blue-700 mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Lịch dạy hôm nay</h2>
          <ul className="space-y-3 text-gray-700">
            <li>18:00 - 19:00 | Toán lớp 10 | Nguyễn Minh</li>
            <li>19:30 - 20:30 | IELTS Speaking | Hoàng Lan</li>
            <li>21:00 - 22:00 | SAT Math | Thu Hà</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
