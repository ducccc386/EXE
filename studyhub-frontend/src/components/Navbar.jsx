import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainLogo from '../assets/studyhub.jpg'
const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Tin Tức", to: "/news" },
  { label: "Liên hệ", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-amber-400 text-center py-2 px-4 text-sm font-medium text-gray-800">
        Are you a university or school student for an online tutoring partnership?{" "}
        <a href="#" className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-900 transition-colors">
          Talk to us
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
  <img
    src={mainLogo}
    alt="StudyHub"
    className="w-24 h-24 object-contain"
  />
</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium transition-colors hover:text-orange-500 ${isActive ? "text-orange-500" : "text-gray-600"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-2">Đăng nhập</a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              Đăng kí
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}