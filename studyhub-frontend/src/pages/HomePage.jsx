
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tutors } from "../data/tutors";
import Slider from "../components/Slider";
import StepsNav from "../components/StepsNav";


const SUBJECTS = [
  "English", "IELTS", "Math", "Chemistry", "Literature", "SAT"
];

const TEACHING_STYLES = [
  "#Friendly", "#Funny", "#Easygoing", "#Patient", "#Encouraging", "#Serious", "#Strict", "#Structured", "#Interactive", "#Creative", "#Practical", "#Detail-oriented"
];

const CATEGORY_ALIASES = {
  English: ["tiếng anh", "english", "ielts"],
  IELTS: ["ielts", "tiếng anh"],
  Math: ["toán học", "math"],
  Chemistry: ["hóa học", "chemistry"],
  Literature: ["văn học", "literature"],
  SAT: ["sat"],
};

const matchesCategory = (tutor, category) => {
  if (category === "Tất cả") return true;
  const aliases = CATEGORY_ALIASES[category] || [category.toLowerCase()];
  const subject = (tutor.subject || "").toLowerCase();
  const title = (tutor.title || "").toLowerCase();
  const tags = (tutor.tags || []).map((tag) => tag.toLowerCase());
  return aliases.some((alias) => subject.includes(alias) || title.includes(alias) || tags.some((tag) => tag.includes(alias)));
};

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState([50000, 1000000]);
  const [gender, setGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const navigate = useNavigate();


  // Ref for featured tutors section
  const featuredTutorsRef = useRef(null);
  // Lọc gia sư nổi bật (giả lập, lấy 3 người đầu)
  const featuredTutors = tutors
    .filter((tutor) => matchesCategory(tutor, selectedCategory))
    .slice(0, 3);

  const categoryCounts = SUBJECTS.reduce((acc, category) => {
    acc[category] = tutors.filter((tutor) => matchesCategory(tutor, category)).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Slider />
      <StepsNav />

      {/* Banner + Search */}
      <div data-scrollspy data-scroll-title="Tìm gia sư" className="relative bg-linear-to-br from-blue-600 to-blue-400 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Find Your Perfect Tutor</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <button
            className="bg-white/80 hover:bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow transition-all text-lg"
            onClick={() => {
              if (featuredTutorsRef.current) {
                featuredTutorsRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Find a Tutor
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl shadow transition-all text-lg border-2 border-white/30" onClick={() => navigate("/register")}>Become a Tutor</button>
        </div>
        {/* Search Filters - modernized */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <input type="text" placeholder="Enter keywords (e.g., tutor name, subject)" value={keyword} onChange={e => setKeyword(e.target.value)} className="flex-1 px-5 py-3 rounded-full border border-white/20 shadow-inner placeholder-gray-400 focus:ring-2 focus:ring-[#0b63ff] outline-none" />
              <select value={subject} onChange={e => setSubject(e.target.value)} className="w-48 px-4 py-3 rounded-full border border-white/20 bg-white/95 focus:ring-2 focus:ring-[#0b63ff] outline-none">
                <option value="">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="text" placeholder="Location (e.g., Ha Noi)" value={location} onChange={e => setLocation(e.target.value)} className="w-56 px-5 py-3 rounded-full border border-white/20 shadow-inner placeholder-gray-400 focus:ring-2 focus:ring-[#0b63ff] outline-none" />
              <button className="bg-linear-to-r from-[#ff7a00] to-[#ff9a3c] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:brightness-95 transition">Search</button>
            </div>

            <div className="flex flex-wrap gap-3 items-center mt-2">
              {TEACHING_STYLES.map(tag => (
                <button key={tag} className="bg-white/80 text-[#0b63ff] px-3 py-1 rounded-full text-sm shadow-sm hover:scale-105 transition" onClick={() => setStyle(tag)}>{tag}</button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">Price:</div>
                <div className="text-sm font-bold text-[#0b63ff]">{price[0].toLocaleString()} - {price[1].toLocaleString()} VND</div>
                <div className="w-48">
                  <input type="range" min={50000} max={1000000} step={50000} value={price[0]} onChange={e => setPrice([+e.target.value, price[1]])} className="w-full" />
                </div>
                <div className="w-48">
                  <input type="range" min={50000} max={1000000} step={50000} value={price[1]} onChange={e => setPrice([price[0], +e.target.value])} className="w-full" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select value={style} onChange={e => setStyle(e.target.value)} className="px-3 py-2 rounded-full border border-white/20 bg-white/95">
                  <option value="">All styles</option>
                  {TEACHING_STYLES.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>

                <div className="flex items-center gap-2">
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "All" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("All")}>All</button>
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "Male" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("Male")}>Male</button>
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "Female" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("Female")}>Female</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div data-scrollspy data-scroll-title="Danh mục" className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-left">Popular Categories</h2>
            <p className="text-sm text-gray-500 mt-1">Bấm vào một danh mục để xem các gia sư phù hợp</p>
          </div>
          <button
            onClick={() => setSelectedCategory("Tất cả")}
            className="text-sm font-semibold text-[#0b63ff] hover:text-[#ff7a00] transition-colors"
          >
            Xem tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SUBJECTS.map((s) => {
            const active = selectedCategory === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setSelectedCategory(s);
                  featuredTutorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`group text-left rounded-3xl p-5 border transition-all shadow-sm hover:shadow-xl ${active ? "border-transparent bg-linear-to-br from-[#0b63ff] to-[#ff7a00] text-white" : "bg-white border-gray-100 hover:border-blue-200 hover:-translate-y-1"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${active ? "bg-white/15" : "bg-blue-50"}`}>
                      <span className={active ? "text-white" : "text-[#0b63ff]"}>📚</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${active ? "text-white" : "text-gray-900"}`}>{s}</h3>
                    <p className={`text-sm ${active ? "text-white/80" : "text-gray-500"}`}>{categoryCounts[s] || 0} tutors</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${active ? "bg-white/15 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {active ? "Đang xem" : "Chọn"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory !== "Tất cả" && (
          <div className="mb-6 flex items-center justify-between gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#0b63ff]">Đang lọc theo: {selectedCategory}</p>
              <p className="text-xs text-gray-500">{featuredTutors.length} gia sư đang hiển thị</p>
            </div>
            <button onClick={() => setSelectedCategory("Tất cả")} className="text-sm font-semibold text-[#ff7a00] hover:underline">Bỏ lọc</button>
          </div>
        )}
      </div>

      {/* Featured Tutors */}
      <div ref={featuredTutorsRef} data-scrollspy data-scroll-title="Gia sư nổi bật" className="max-w-6xl mx-auto mt-4 mb-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Gia Sư Nổi Bật</h2>
          <p className="text-gray-500">{selectedCategory === "Tất cả" ? "Discover experienced tutors who are ready to help you achieve your academic goals" : `Gia sư phù hợp cho danh mục ${selectedCategory}`}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTutors.map(tutor => (
            <div key={tutor.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-4xl text-blue-600">
                {tutor.avatar || tutor.initials || "👤"}
              </div>
              <div className="font-bold text-lg text-gray-900 mb-1">{tutor.name}</div>
              <div className="text-sm text-gray-500 mb-1">{tutor.location || "-"}</div>
              <div className="text-sm text-gray-500 mb-1">{tutor.university || "-"}</div>
              <div className="text-blue-600 font-bold mb-1">{tutor.pricePerHour ? tutor.pricePerHour.toLocaleString() + "/hour" : "-"}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{tutor.subject}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" onClick={() => navigate(`/tutors/${tutor.id}`)}>View Profile</button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">Contact</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works (anchor for scrolling) */}
      <div data-scrollspy data-scroll-title="Cách hoạt động" className="max-w-5xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-4">Cách hoạt động</h2>
        <p className="text-center text-gray-500">Mô tả ngắn về cách StudyHub kết nối gia sư và học viên.</p>
      </div>

      {/* Contact / Call to action (anchor) */}
      <div data-scrollspy data-scroll-title="Liên hệ" className="max-w-5xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-4">Liên hệ</h2>
        <p className="text-center text-gray-500">Liên hệ với chúng tôi để được hỗ trợ thêm.</p>
      </div>

      <Footer />
    </div>
  );
}
