import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "StudyHub - Kết nối tri thức",
    subtitle: "Kết nối tri thức, xây dựng niềm tin",
    cta: "Tìm hiểu",
    image: "/assets/slider/banner.jpg",
    bg: "bg-white",
  },
  {
    id: 2,
    title: "Trở Thành Lập Trình Viên Frontend",
    subtitle: "Frontend Hiện Đại Với React.js",
    cta: "ĐĂNG KÝ NGAY",
    image: "/assets/slider/react-course.jpg",
    bg: "bg-gradient-to-r from-blue-600 to-purple-500",
  },
  {
    id: 3,
    title: "Tìm Gia Sư Phù Hợp",
    subtitle: "Hàng trăm gia sư chất lượng",
    cta: "Tìm ngay",
    image: "/assets/slider/tutors.jpg",
    bg: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    id: 4,
    title: "Luyện Thi IELTS",
    subtitle: "Lộ trình cá nhân hóa",
    cta: "Xem khóa học",
    image: "/assets/slider/ielts.jpg",
    bg: "bg-gradient-to-r from-orange-400 to-pink-400",
  },
  {
    id: 5,
    title: "Khóa Học và Tài Liệu",
    subtitle: "Tài liệu chất lượng, cập nhật liên tục",
    cta: "Xem tài liệu",
    image: "/assets/slider/react-course.jpg",
    bg: "bg-gradient-to-r from-indigo-500 to-blue-500",
  },
];

export default function Slider({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [sections, setSections] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Detect scrollspy sections on the page and observe them
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-scrollspy]'));
    if (!els || els.length === 0) return;
    const mapped = els.map((el, i) => ({ id: el.id || `scrollspy-${i}`, title: el.getAttribute('data-scroll-title') || el.id || `Section ${i + 1}`, el }));
    setSections(mapped);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = mapped.findIndex(m => m.el === entry.target);
            if (idx >= 0) setActiveSection(idx);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    mapped.forEach((m) => observer.observe(m.el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`w-full overflow-hidden relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-64 md:h-44 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${i === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"}`}
            >
              <div className={`w-full h-full flex items-center ${s.bg} p-6 md:p-10`}> 
                <div className="flex-1 text-white">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">{s.title}</h2>
                  <p className="mt-2 text-sm md:text-base opacity-90">{s.subtitle}</p>
                  <button className="mt-4 inline-block bg-white text-gray-800 font-semibold px-4 py-2 rounded-full shadow">{s.cta}</button>
                </div>
                <div className="hidden md:block w-1/3">
                  <img src={s.image} alt="slide" className="w-full h-40 object-cover rounded-md shadow-inner" />
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-4 bottom-4 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Right vertical steps column */}
          <div className="hidden md:flex flex-col items-center absolute right-6 top-1/2 -translate-y-1/2 space-y-6">
            <div className="h-12 w-0.5 bg-white/30 rounded-full" />
            <div className="flex flex-col items-center gap-4">
              {sections && sections.length > 0 ? (
                sections.map((s, i) => (
                  <button key={s.id} onClick={() => s.el.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="flex items-center gap-3" aria-label={`Go to section ${i+1}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${i === activeSection ? 'bg-white text-gray-800 shadow-lg' : 'bg-white/30 text-white'}`}>
                      {i+1}
                    </div>
                    <div className={`text-xs text-white max-w-[100px] text-left ${i === activeSection ? 'font-bold' : 'opacity-80'}`}>{s.title}</div>
                  </button>
                ))
              ) : (
                slides.map((s, i) => (
                  <button key={s.id} onClick={() => setIndex(i)} className="flex items-center gap-3" aria-label={`Go to step ${i+1}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${i === index ? 'bg-white text-gray-800 shadow-lg' : 'bg-white/30 text-white'}`}>
                      {i+1}
                    </div>
                    <div className={`text-xs text-white ${i === index ? 'font-bold' : 'opacity-80'}`}>{s.title}</div>
                  </button>
                ))
              )}
            </div>
            <div className="h-12 w-0.5 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
