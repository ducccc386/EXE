import React, { useEffect, useState } from "react";

export default function StepsNav({ className = "" }) {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-scrollspy]"));
    if (!els.length) return;
    const mapped = els.map((el, i) => ({ id: el.id || `scrollspy-${i}`, title: el.getAttribute("data-scroll-title") || `Section ${i + 1}`, el }));
    setSections(mapped);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = mapped.findIndex((m) => m.el === entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    mapped.forEach((m) => observer.observe(m.el));
    return () => observer.disconnect();
  }, []);

  if (!sections.length) return null;

  return (
    <div className={`hidden md:flex flex-col items-center fixed right-6 top-1/2 -translate-y-1/2 z-50 ${className}`}>
      <div className="h-12 w-0.5 bg-gray-300 rounded-full mb-4" />
      <div className="flex flex-col items-center gap-4">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => s.el.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="flex items-center gap-3"
            aria-label={`Go to section ${i + 1}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${i === active ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700"}`}>
              {i + 1}
            </div>
            <div className={`text-xs text-gray-700 max-w-[120px] text-left ${i === active ? "font-bold" : "opacity-80"}`}>{s.title}</div>
          </button>
        ))}
      </div>
      <div className="h-12 w-0.5 bg-gray-300 rounded-full mt-4" />
    </div>
  );
}
