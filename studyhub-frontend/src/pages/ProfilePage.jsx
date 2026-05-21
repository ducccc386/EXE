import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-2">
            Đây là trang hồ sơ cá nhân demo. Bạn có thể mở nhanh thông tin tài khoản từ panel bên phải ở Navbar.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
