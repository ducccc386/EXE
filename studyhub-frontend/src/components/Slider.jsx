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
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center p-6 md:p-10">
                  <div className="flex-1 text-white">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">{s.title}</h2>
                    <p className="mt-2 text-sm md:text-base opacity-90">{s.subtitle}</p>
                    <button className="mt-4 inline-block bg-white text-gray-800 font-semibold px-4 py-2 rounded-full shadow">{s.cta}</button>
                  </div>
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
        </div>
      </div>
    </div>
  );
}
