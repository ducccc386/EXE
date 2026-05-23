/**
 * components/layout/Navbar.jsx
 * Dùng useAuth() hook thay vì đọc localStorage trực tiếp.
 * Language + theme toggles được lưu localStorage để dùng xuyên trang.
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../api/authApi";
import { ROUTES } from "../../constants";
import mainLogo from "../../assets/studyhub.jpg";
import { useLanguage } from "../../hooks/usePreferences";


const NAV_LINKS_LOGGED_IN = [
  {
    label: "Home", to: ROUTES.HOME, icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5" /></svg>
    )
  },
  {
    label: "Profile", to: ROUTES.PROFILE, icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" /></svg>
    )
  },
  {
    label: "Chat", to: ROUTES.CHAT, icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    )
  },
  {
    label: "Help", to: "/help", icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    )
  },
];

const NAV_LINKS_GUEST = [
  {
    label: "Home", to: ROUTES.HOME, icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5" /></svg>
    )
  },
  {
    label: "Help", to: "/help", icon: (
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    )
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { lang, toggleLang } = useLanguage();

  const close = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate(ROUTES.LOGIN);
  };

  const labels = lang === "vi"
    ? { home: "Trang chủ", profile: "Hồ sơ", chat: "Trò chuyện", help: "Trợ giúp", login: "Đăng nhập", register: "Đăng ký", logout: "Đăng xuất" }
    : { home: "Home", profile: "Profile", chat: "Chat", help: "Help", login: "Login", register: "Register", logout: "Logout" };

  return (
    <>

      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center">

          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center group mr-8" onClick={close}>
            <img src={mainLogo} alt="StudyHub" className="w-28 h-28 object-contain rounded-full border-4 border-orange-100 shadow-md transition-transform duration-200 group-hover:scale-110" style={{ width: '112px', height: '112px' }} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {(isLoggedIn ? NAV_LINKS_LOGGED_IN : NAV_LINKS_GUEST).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center text-sm font-bold transition-all duration-200 relative py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${pathname === item.to
                  ? "text-orange-600 bg-orange-50/85 shadow-inner"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/80"
                  }`}
              >
                {item.icon}
                {item.label === "Profile" ? labels.profile : item.label === "Chat" ? labels.chat : item.label === "Help" ? labels.help : labels.home}
              </Link>
            ))}
            {isLoggedIn && (
              <span className="text-sm font-semibold text-gray-500 opacity-80">{user.fullName}</span>
            )}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg">{labels.logout}</button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="text-sm font-bold text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg">{labels.login}</Link>
              </>
            )}

            <button onClick={toggleLang} className="ml-1 px-3 py-1 rounded-full bg-orange-100 text-xs font-bold text-orange-700 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 uppercase">
              {lang === "vi" ? "vn | en" : "en | vn"}
            </button>

          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-xl border border-orange-100 shadow-sm bg-white/80 hover:bg-orange-50 transition-colors duration-200 ${menuOpen ? "ring-2 ring-orange-300" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 text-orange-500 transition-transform duration-300 ${menuOpen ? "rotate-90 scale-110" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-orange-100 px-6 py-6 space-y-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-b-3xl animate-fade-in-down">
            <div className="space-y-1">
              {(isLoggedIn ? NAV_LINKS_LOGGED_IN : NAV_LINKS_GUEST).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block text-sm font-bold py-2.5 px-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${pathname === item.to
                    ? "bg-orange-50 text-orange-600 shadow"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  onClick={close}
                >
                  {item.label === "Profile" ? labels.profile : item.label === "Chat" ? labels.chat : item.label === "Help" ? labels.help : labels.home}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-orange-100">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-sm font-bold text-red-500 border border-red-100 py-3 rounded-2xl hover:bg-red-50 transition-colors"
                  >
                    {labels.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    className="w-full text-center text-sm font-bold text-gray-700 border border-gray-200 py-3 rounded-2xl hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    onClick={close}
                  >
                    {labels.login}
                  </Link>
                </>
              )}

              <div className="flex items-center justify-between gap-3 pt-3">
                <button onClick={toggleLang} className="px-3 py-2 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase">
                  {lang === "vi" ? "vn | en" : "en | vn"}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
