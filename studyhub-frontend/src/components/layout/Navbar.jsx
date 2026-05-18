/**
 * components/layout/Navbar.jsx
 * Dùng useAuth() hook thay vì đọc localStorage trực tiếp.
 * Màu CTA thống nhất: Orange (primary brand color).
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/authService";
import { ROUTES, ROLE_DASHBOARD } from "../../constants";
import mainLogo from "../../assets/studyhub.jpg";

const NAV_LINKS = [
  { label: "Trang chủ",       to: ROUTES.HOME },
  { label: "Tra cứu gia sư",  to: ROUTES.TUTORS },
  { label: "Tin tức",         to: ROUTES.NEWS },
  { label: "Liên hệ",         to: ROUTES.CONTACT },
  { label: "Tài liệu",        to: ROUTES.MATERIALS },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const close = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate(ROUTES.LOGIN);
  };

  const dashboardPath = user ? ROLE_DASHBOARD[user.role] ?? ROUTES.HOME : ROUTES.HOME;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-blue-700 text-center py-2 px-4 text-xs font-semibold text-white">
        Bạn là sinh viên và muốn trở thành gia sư?{" "}
        <a href="#" className="text-orange-300 underline underline-offset-2 hover:text-orange-200 transition-colors font-bold">
          Đăng ký ngay →
        </a>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center group" onClick={close}>
            <img src={mainLogo} alt="StudyHub" className="w-18 h-18 object-contain transition-transform group-hover:scale-105" style={{width:'72px', height:'72px'}} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-bold transition-all relative py-2
                  ${pathname === item.to
                    ? "text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 border-l pl-6 ml-2 border-gray-100">
                <div className="text-right">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">{user.role}</p>
                  <p className="text-sm font-bold text-gray-800">{user.fullName}</p>
                </div>
                <Link
                  to={dashboardPath}
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
                >
                  Thoát
                </button>
              </div>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors px-3 py-2"
                >
                  Đăng nhập
                </Link>
                {/* ── Primary CTA: Orange ── */}
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-orange-100 transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95"
                >
                  Đăng ký miễn phí
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-6 space-y-4 bg-white shadow-xl">
            <div className="space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block text-sm font-bold py-2.5 px-3 rounded-xl transition-colors
                    ${pathname === item.to
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="w-full text-center bg-gray-900 text-white text-sm font-bold py-3 rounded-2xl"
                    onClick={close}
                  >
                    Dashboard ({user.role})
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-sm font-bold text-red-500 border border-red-100 py-3 rounded-2xl hover:bg-red-50 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    className="w-full text-center text-sm font-bold text-gray-700 border border-gray-200 py-3 rounded-2xl hover:bg-gray-50 transition-colors"
                    onClick={close}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-orange-500 text-white text-sm font-bold py-3 rounded-2xl shadow-md shadow-orange-100 hover:bg-orange-600 transition-colors"
                    onClick={close}
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
