import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainLogo from '../assets/studyhub.jpg'
const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Tìm gia sư", to: "/tutors" },
  { label: "Lịch học", to: "/booking" },
  { label: "Tin tức", to: "/news" },
  { label: "Liên hệ", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div className="bg-amber-400 text-center py-2 px-4 text-sm font-medium text-gray-800">
        Bạn là sinh viên đại học hoặc học sinh và muốn hợp tác gia sư trực tuyến?{" "}
        <a href="#" className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-900 transition-colors">
          Liên hệ ngay
        </a>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src={mainLogo}
              alt="StudyHub"
              className="w-22 h-22 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link key={item.to} to={item.to}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${pathname === item.to ? "text-orange-500" : "text-gray-600"}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-2">Đăng nhập</a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              Đăng ký
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 bg-white">
            {navLinks.map((item) => (
              <Link key={item.to} to={item.to}
                className={`block text-sm font-medium transition-colors py-1 ${pathname === item.to ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`}
                onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="#" className="flex-1 text-center text-sm font-semibold text-gray-700 border border-gray-200 py-2 rounded-full hover:border-blue-400 transition-colors">Đăng nhập</a>
              <a href="#" className="flex-1 text-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-full hover:bg-blue-700 transition-colors">Đăng ký</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}