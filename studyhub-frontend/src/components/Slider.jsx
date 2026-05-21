import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/usePreferences";
import { useTheme } from "../hooks/usePreferences";

const slides = [
  {
    id: 1,
    title: "StudyHub - Kết nối tri thức",
    subtitle: "Kết nối tri thức, xây dựng niềm tin",
    cta: "Tìm hiểu",
    image: "/assets/slider/banner.jpg",
    gradient: "linear-gradient(90deg,#0b63ff 0%,#ff7a00 100%)",
  },
  {
    id: 2,
    title: "Trở Thành Lập Trình Viên Frontend",
    subtitle: "Frontend Hiện Đại Với React.js",
    cta: "ĐĂNG KÝ NGAY",
    image: "/assets/slider/react-course.jpg",
    gradient: "linear-gradient(90deg,#0b63ff 0%,#ff7a00 100%)",
  },
  {
    id: 3,
    title: "Tìm Gia Sư Phù Hợp",
    subtitle: "Hàng trăm gia sư chất lượng",
    cta: "Tìm ngay",
    image: "/assets/slider/tutors.jpg",
    gradient: "linear-gradient(90deg,#0b63ff 0%,#ff7a00 100%)",
  },
  {
    id: 4,
    title: "Luyện Thi IELTS",
    subtitle: "Lộ trình cá nhân hóa",
    cta: "Xem khóa học",
    image: "/assets/slider/ielts.jpg",
    gradient: "linear-gradient(90deg,#0b63ff 0%,#ff7a00 100%)",
  },
  {
    id: 5,
    title: "Khóa Học và Tài Liệu",
    subtitle: "Tài liệu chất lượng, cập nhật liên tục",
    cta: "Xem tài liệu",
    image: "/assets/slider/react-course.jpg",
    gradient: "linear-gradient(90deg,#0b63ff 0%,#ff7a00 100%)",
  },
];

export default function Slider({ className = "" }) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDark = theme === "dark";

  const localized = slides.map((s) => {
    if (lang === "vi") return s;

    if (s.id === 1) return { ...s, title: "StudyHub - Connect knowledge", subtitle: "Connect knowledge, build trust", cta: "Discover", extra: "Learn more" };
    if (s.id === 2) return { ...s, title: "Become a Frontend Developer", subtitle: "Modern Frontend with React.js", cta: "JOIN NOW", extra: "Learn more" };
    if (s.id === 3) return { ...s, title: "Find the Right Tutor", subtitle: "Hundreds of quality tutors", cta: "Find now", extra: "Learn more" };
    if (s.id === 4) return { ...s, title: "IELTS Preparation", subtitle: "Personalized roadmap", cta: "View course", extra: "Learn more" };
    return { ...s, title: "Courses and Materials", subtitle: "High-quality resources, continuously updated", cta: "View resources", extra: "Learn more" };
  });

  useEffect(() => {
    if (isPaused) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % localized.length), 5000);
    return () => clearInterval(t);
  }, [isPaused, localized.length]);

  // keyboard navigation (left/right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + localized.length) % localized.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % localized.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [localized.length]);

  // Slider only — scrollspy handled by StepsNav component on HomePage

  return (
    <div
      className={`w-full overflow-hidden relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full">
        <div className="relative h-64 md:h-72 lg:h-96 overflow-hidden" role="region" aria-label="Homepage banner">
          {localized.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${i === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"}`}
            >
              <div className="w-full h-full">
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(115deg,#020617 0%,#0f172a 48%,#064e3b 100%)"
                      : s.gradient,
                  }}
                />
                <div className={`absolute inset-0 ${isDark ? "bg-slate-950/35" : "bg-white/5"}`} />
                <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center p-6 md:p-10">
                  <div className="flex-1 text-white">
                    <h2 className={`text-2xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-md ${isDark ? "bg-linear-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent" : "text-white"}`}>{s.title}</h2>
                    <p className={`mt-3 text-base md:text-lg max-w-2xl drop-shadow-sm ${isDark ? "text-slate-100" : "opacity-95"}`}>{s.subtitle}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        className="inline-flex items-center gap-2 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-transform"
                        style={{ background: isDark ? "linear-gradient(90deg,#10b981 0%, #84cc16 100%)" : "linear-gradient(90deg,#ff7a00 0%, #ff9a3c 100%)" }}
                      >
                        {s.cta}
                      </button>
                      <button className={`inline-flex items-center gap-2 font-medium px-4 py-2 rounded-full border transition-colors ${isDark ? "bg-slate-900/85 text-emerald-200 border-emerald-300/35 hover:bg-slate-800" : "bg-white text-[#0b63ff] border-white/30 hover:bg-white/95"}`}>{s.extra || "Tìm hiểu thêm"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* left / right arrows */}
          <button
            aria-label="Previous slide"
            onClick={() => setIndex((index - 1 + localized.length) % localized.length)}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full absolute left-4 top-1/2 -translate-y-1/2 shadow-lg transition-colors ${isDark ? "bg-slate-800/80 text-emerald-200 hover:bg-slate-700" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            onClick={() => setIndex((index + 1) % localized.length)}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full absolute right-4 top-1/2 -translate-y-1/2 shadow-lg transition-colors ${isDark ? "bg-slate-800/80 text-emerald-200 hover:bg-slate-700" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute left-6 bottom-6 flex items-center gap-3">
            {localized.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-current={i === index}
                title={`Go to slide ${i + 1}`}
                className={`transition-transform duration-200 rounded-full ${i === index ? (isDark ? 'w-4 h-4 bg-emerald-300 border-2 border-emerald-200 shadow-md scale-110' : 'w-4 h-4 bg-white border-2 border-white shadow-md scale-110') : (isDark ? 'w-3 h-3 bg-emerald-300/35 border border-emerald-200/30 hover:bg-emerald-300/60' : 'w-3 h-3 bg-white/30 border border-white/30 hover:bg-white/60')}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
