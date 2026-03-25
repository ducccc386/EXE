import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mainLogo from '../assets/studyhub.jpg';

const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Tra cứu gia sư", to: "/tutors" },
  { label: "Lịch học", to: "/booking" },
  { label: "Tin tức", to: "/news" },
  { label: "Liên hệ", to: "/contact" },
  { label: "Tài liệu học tập", to: "/materials" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage (đã lưu khi login thành công)
  const user = JSON.parse(localStorage.getItem("user"));

  const closeMenu = () => setMenuOpen(false);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      {/* Banner thông báo - GIỮ NGUYÊN */}
      <div className="bg-amber-400 text-center py-2 px-4 text-sm font-medium text-gray-800">
        Bạn là sinh viên đại học hoặc học sinh và muốn hợp tác gia sư trực tuyến?{" "}
        <a href="#" className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-900 transition-colors">
          Liên hệ ngay
        </a>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

          {/* Logo Section - GIỮ NGUYÊN */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <img
              src={mainLogo}
              alt="StudyHub"
              className="w-20 h-20 object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links - GIỮ NGUYÊN */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-bold transition-all hover:text-orange-500 relative py-2 ${pathname === item.to
                  ? "text-orange-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
                  : "text-gray-600"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section - THAY ĐỔI THEO ROLE */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              // HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
              <div className="flex items-center gap-4 border-l pl-6 ml-2">
                <div className="text-right">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">Chào mừng, {user.role}</p>
                  <p className="text-sm font-bold text-gray-800">{user.fullName}</p>
                </div>

                {/* Nút vào Dashboard tương ứng Role */}
                <Link
                  to={user.role === "ADMIN" ? "/admin/dashboard" : user.role === "TUTOR" ? "/tutor/dashboard" : "/parent/dashboard"}
                  className="bg-gray-900 hover:bg-black text-white text-[11px] font-bold px-5 py-2 rounded-full transition-all"
                >
                  DASHBOARD
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  Thoát
                </button>
              </div>
            ) : (
              // HIỂN THỊ KHI CHƯA ĐĂNG NHẬP (Code gốc của bạn)
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-blue-100 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - GIỮ NGUYÊN */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay - CẬP NHẬT LOGIC LOGIN */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-6 space-y-4 bg-white shadow-xl animate-in slide-in-from-top duration-300">
            <div className="space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block text-base font-bold transition-colors py-2 px-3 rounded-xl ${pathname === item.to
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                    }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-50">
              {user ? (
                <>
                  <Link
                    to={user.role === "ADMIN" ? "/admin/dashboard" : user.role === "TUTOR" ? "/tutor/dashboard" : "/parent/dashboard"}
                    className="w-full text-center bg-gray-900 text-white text-sm font-bold py-3 rounded-2xl"
                    onClick={closeMenu}
                  >
                    Vào Dashboard ({user.role})
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-sm font-bold text-red-500 border border-red-100 py-3 rounded-2xl"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center text-sm font-bold text-gray-700 border border-gray-200 py-3 rounded-2xl hover:bg-gray-50 transition-colors"
                    onClick={closeMenu}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-blue-600 text-white text-sm font-bold py-3 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors"
                    onClick={closeMenu}
                  >
                    Đăng ký miễn phí
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}