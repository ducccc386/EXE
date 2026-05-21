/**
 * pages/LoginPage.jsx
 * Click demo account → tự điền + đăng nhập luôn vào đúng dashboard.
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { login } from "../services/authService";
import { ROUTES, ROLE_DASHBOARD } from "../constants";
import { useLanguage } from "../hooks/usePreferences";

const T = {
  vi: {
    welcome: "Chào mừng trở lại!",
    subtitle: "Kết nối tri thức, nâng bước tương lai",
    demoLabel: "Đăng nhập nhanh (Demo)",
    demoAccounts: ["Admin", "Gia sư", "Phụ huynh"],
    divider: "hoặc đăng nhập thủ công",
    emailLabel: "Email",
    passwordLabel: "Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    loginBtn: "ĐĂNG NHẬP",
    loggingIn: "Đang đăng nhập...",
    noAccount: "Bạn là người mới?",
    register: "Đăng ký tài khoản",
    demoError: "Lỗi đăng nhập demo. Vui lòng thử lại.",
    loginError: "Đăng nhập thất bại. Vui lòng kiểm tra lại!",
    serverError: "Lỗi kết nối tới máy chủ.",
  },
  en: {
    welcome: "Welcome back!",
    subtitle: "Connect knowledge, elevate your future",
    demoLabel: "Quick Login (Demo)",
    demoAccounts: ["Admin", "Tutor", "Parent"],
    divider: "or login manually",
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    loginBtn: "LOGIN",
    loggingIn: "Logging in...",
    noAccount: "New here?",
    register: "Create an account",
    demoError: "Demo login failed. Please try again.",
    loginError: "Login failed. Please check your credentials!",
    serverError: "Server connection error.",
  },
};

const DEMO_ACCOUNTS = [
  { labelKey: 0, email: "admin@studyhub.vn",  password: "admin123",  color: "bg-purple-100 text-purple-700 border-purple-200",  icon: "🛡️" },
  { labelKey: 1, email: "tutor@studyhub.vn",  password: "tutor123",  color: "bg-blue-100 text-blue-700 border-blue-200",        icon: "👨‍🏫" },
  { labelKey: 2, email: "parent@studyhub.vn", password: "parent123", color: "bg-orange-100 text-orange-700 border-orange-200",   icon: "👨‍👧" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      navigate(ROLE_DASHBOARD[data.role] ?? ROUTES.HOME);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data
        || t.loginError;
      setError(typeof msg === "string" ? msg : t.serverError);
    } finally {
      setLoading(false);
    }
  };

  /** Click demo → điền sẵn và submit luôn */
  const handleDemoLogin = async (account) => {
    const next = { email: account.email, password: account.password };
    setFormData(next);
    setError("");
    setLoading(true);
    try {
      const data = await login(next.email, next.password);
      navigate(ROLE_DASHBOARD[data.role] ?? ROUTES.HOME);
    } catch (err) {
      setError(t.demoError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 pt-8 pb-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">StudyHub</span>
            </div>
            <h1 className="text-2xl font-extrabold">{t.welcome}</h1>
            <p className="text-blue-100 text-sm mt-1">{t.subtitle}</p>
          </div>

          <div className="px-8 py-7">
            {/* Demo quick-login */}
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t.demoLabel}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.labelKey}
                    onClick={() => handleDemoLogin(acc)}
                    disabled={loading}
                    className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl border-2 font-bold text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${acc.color}`}
                  >
                    <span className="text-xl">{acc.icon}</span>
                    {t.demoAccounts[acc.labelKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">{t.divider}</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all placeholder:text-gray-300 text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-gray-700">{t.passwordLabel}</label>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">{t.forgotPassword}</a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all placeholder:text-gray-300 text-sm"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 rounded-2xl shadow-md shadow-orange-100 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.loggingIn}
                  </>
                ) : t.loginBtn}
              </button>
            </form>

            <p className="text-sm text-gray-500 font-medium text-center mt-5">
              {t.noAccount}{" "}
              <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 underline underline-offset-4">
                {t.register}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}