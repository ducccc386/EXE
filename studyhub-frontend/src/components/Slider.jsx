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

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Slider only — scrollspy handled by StepsNav component on HomePage

  return (
    <div className={`w-full overflow-hidden relative ${className}`}>
      <div className="w-full">
        <div className="relative h-64 md:h-72 lg:h-96 overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${i === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"}`}
            >
              <div className="w-full h-full">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${s.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center p-6 md:p-10">
                  <div className="flex-1 text-white">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-md">{s.title}</h2>
                    <p className="mt-3 text-base md:text-lg opacity-95 max-w-2xl drop-shadow-sm">{s.subtitle}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0b63ff] to-[#3b82f6] text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-transform">{s.cta}</button>
                      <button className="inline-flex items-center gap-2 bg-white/20 text-white font-medium px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-colors">Learn more</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-6 bottom-6 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full border-2 ${i === index ? "border-white bg-white" : "border-white/40 bg-white/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
