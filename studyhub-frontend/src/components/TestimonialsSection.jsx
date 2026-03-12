import { Squiggly, Triangle, Diamond } from "./shared";

const testimonials = [
  {
    name: "William Smith",
    role: "Student At College",
    stars: 5,
    text: "As a student of this online education website, I can confidently say that it has been an incredible experience. The platform is user-friendly and the courses are well-structured, making it easy for me to learn at my own pace.",
    initials: "WS",
    color: "bg-blue-500",
  },
  {
    name: "Sarah Johnson",
    role: "High School Student",
    stars: 5,
    text: "Finding a tutor has never been easier! The matching system is spot on and my tutor is incredibly helpful. My grades have improved significantly since I started using StudyHub.",
    initials: "SJ",
    color: "bg-orange-500",
  },
  {
    name: "Mike Chen",
    role: "University Student",
    stars: 5,
    text: "The interactive whiteboard makes online tutoring feel like an in-person session. My tutor explains concepts clearly and the scheduling system is very convenient for my busy life.",
    initials: "MC",
    color: "bg-green-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 overflow-hidden relative">
      <Squiggly color="#3B82F6" className="absolute top-10 left-10 w-16 opacity-70" />
      <Diamond color="#F97316" className="absolute top-16 left-28 w-6 opacity-60" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-300 rounded-full opacity-85 -translate-x-1/2 translate-y-1/2" />
      <Squiggly color="#3B82F6" className="absolute bottom-14 left-12 w-14 opacity-70" />
      <div className="absolute top-4 right-0 w-24 h-24 bg-cyan-400 rounded-full opacity-90 translate-x-1/3" />
      <Triangle color="#F97316" className="absolute top-1/2 right-14 w-8 opacity-55 -translate-y-6" />
      <Squiggly color="#3B82F6" className="absolute bottom-20 right-10 w-16 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
            Our Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our Students Say About Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i === 1
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                  : "bg-gray-50 border border-gray-100"
                }`}
            >
              <div className={`text-5xl font-serif leading-none mb-4 ${i === 1 ? "text-blue-300" : "text-orange-200"}`}>"</div>
              <p className={`text-sm leading-relaxed mb-6 ${i === 1 ? "text-blue-100" : "text-gray-500"}`}>{t.text}</p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} className={`w-4 h-4 ${i === 1 ? "text-amber-300" : "text-amber-400"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{t.initials}</div>
                <div>
                  <p className={`font-bold text-sm ${i === 1 ? "text-white" : "text-gray-800"}`}>{t.name}</p>
                  <p className={`text-xs ${i === 1 ? "text-blue-200" : "text-gray-400"}`}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}