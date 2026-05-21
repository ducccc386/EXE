
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tutors } from "../data/tutors";
import Slider from "../components/Slider";
import StepsNav from "../components/StepsNav";
import { useLanguage } from "../hooks/usePreferences";


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

const normalize = (v) => String(v || "").trim().toLowerCase();

const matchesFilters = (tutor, filters) => {
  const keyword = normalize(filters.keyword);
  const location = normalize(filters.location);
  const subject = normalize(filters.subject);
  const style = normalize(filters.style).replace(/^#/, "");
  const gender = normalize(filters.gender);
  const tutorSubject = normalize(tutor.subject);
  const tutorTitle = normalize(tutor.title);
  const tutorLocation = normalize(tutor.location);
  const tutorTags = (tutor.tags || []).map(normalize);
  const tutorStyles = (tutor.styles || []).map(normalize);
  const tutorGender = normalize(tutor.gender || "all");
  const tutorPrice = tutor.pricePerHour || tutor.hourlyRate || 0;

  const matchKeyword =
    !keyword ||
    normalize(tutor.name).includes(keyword) ||
    tutorSubject.includes(keyword) ||
    tutorTitle.includes(keyword) ||
    tutorTags.some((tag) => tag.includes(keyword));

  const matchSubject = !subject || matchesCategory(tutor, filters.subject);
  const matchLocation = !location || tutorLocation.includes(location);
  const matchStyle = !style || tutorStyles.some((s) => s.includes(style)) || tutorTags.some((t) => t.includes(style));
  const matchGender = gender === "all" || tutorGender === gender;
  const matchPrice = tutorPrice >= filters.price[0] && tutorPrice <= filters.price[1];

  return matchKeyword && matchSubject && matchLocation && matchStyle && matchGender && matchPrice;
};

function TutorProfileDrawer({ tutor, open, onClose }) {
  if (!open || !tutor) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-100 overflow-y-auto animate-in slide-in-from-right-6 duration-300">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Tutor Profile</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">Thông tin gia sư</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500">×</button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 font-black text-xl flex items-center justify-center">
              {tutor.avatar || tutor.initials || "GS"}
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{tutor.name}</h4>
              <p className="text-sm text-gray-500">{tutor.title}</p>
              <p className="text-sm text-blue-600 font-semibold mt-1">{tutor.subject}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-500 font-semibold uppercase">Đánh giá</p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">{tutor.rating || 0} / 5</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-500 font-semibold uppercase">Học phí</p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">{(tutor.pricePerHour || tutor.hourlyRate || 0).toLocaleString()}đ</p>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-2">Giới thiệu</h5>
            <p className="text-sm text-gray-600 leading-relaxed">{tutor.bio || "Chưa có mô tả"}</p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-gray-900 mb-2">Kỹ năng</h5>
            <div className="flex flex-wrap gap-2">
              {(tutor.tags || []).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState([50000, 1000000]);
  const [gender, setGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [appliedFilters, setAppliedFilters] = useState({
    keyword: "",
    subject: "",
    location: "",
    style: "",
    price: [50000, 1000000],
    gender: "All",
  });
  const [selectedTutor, setSelectedTutor] = useState(null);
  const navigate = useNavigate();


  // Ref for featured tutors section
  const featuredTutorsRef = useRef(null);
  // Lọc gia sư nổi bật (giả lập, lấy 3 người đầu)
  const featuredTutors = tutors
    .filter((tutor) => matchesCategory(tutor, selectedCategory))
    .filter((tutor) => matchesFilters(tutor, appliedFilters))
    .slice(0, 6);

  const categoryCounts = SUBJECTS.reduce((acc, category) => {
    acc[category] = tutors.filter((tutor) => matchesCategory(tutor, category)).length;
    return acc;
  }, {});

  const handleSearch = () => {
    setAppliedFilters({ keyword, subject, location, style, price: [...price], gender });
    featuredTutorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copy = lang === "vi"
    ? {
        heroTitle: "Tìm gia sư phù hợp",
        heroFind: "Tìm gia sư",
        heroBecome: "Trở thành gia sư",
        searchKeyword: "Từ khóa (tên gia sư, môn học, kỹ năng)",
        searchLocation: "Địa điểm (ví dụ: Hà Nội)",
        searchBtn: "Tìm kiếm",
        categoriesTitle: "Popular Categories",
        categoriesSub: "Bấm vào một danh mục để cuộn thẳng xuống phần gia sư",
        tutorsTitle: "Gia sư nổi bật",
        tutorsSub: "Các gia sư phù hợp sẽ hiển thị ở đây",
        allStyles: "Tất cả phong cách",
        all: "Tất cả",
        male: "Nam",
        female: "Nữ",
      }
    : {
        heroTitle: "Find Your Perfect Tutor",
        heroFind: "Find a Tutor",
        heroBecome: "Become a Tutor",
        searchKeyword: "Keywords (tutor name, subject, skill)",
        searchLocation: "Location (e.g., Hanoi)",
        searchBtn: "Search",
        categoriesTitle: "Popular Categories",
        categoriesSub: "Click a category to jump straight to the tutor section",
        tutorsTitle: "Featured Tutors",
        tutorsSub: "Matching tutors will appear here",
        allStyles: "All styles",
        all: "All",
        male: "Male",
        female: "Female",
      };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Slider />
      <StepsNav />

      {/* Banner + Search */}
      <div data-scrollspy data-scroll-title={copy.heroTitle} className="relative bg-linear-to-br from-blue-600 to-blue-400 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">{copy.heroTitle}</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <button
            className="bg-white/80 hover:bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow transition-all text-lg"
            onClick={() => {
              if (featuredTutorsRef.current) {
                featuredTutorsRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {copy.heroFind}
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl shadow transition-all text-lg border-2 border-white/30" onClick={() => navigate("/register")}>{copy.heroBecome}</button>
        </div>
        {/* Search Filters - modernized */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-4 border border-white/60 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <input type="text" placeholder={copy.searchKeyword} value={keyword} onChange={e => setKeyword(e.target.value)} className="flex-1 px-5 py-3 rounded-full border border-white/20 shadow-inner placeholder-gray-400 focus:ring-2 focus:ring-[#0b63ff] outline-none" />
              <select value={subject} onChange={e => setSubject(e.target.value)} className="w-48 px-4 py-3 rounded-full border border-white/20 bg-white/95 focus:ring-2 focus:ring-[#0b63ff] outline-none">
                <option value="">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="text" placeholder={copy.searchLocation} value={location} onChange={e => setLocation(e.target.value)} className="w-56 px-5 py-3 rounded-full border border-white/20 shadow-inner placeholder-gray-400 focus:ring-2 focus:ring-[#0b63ff] outline-none" />
              <button onClick={handleSearch} className="bg-linear-to-r from-[#ff7a00] to-[#ff9a3c] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:brightness-95 transition">{copy.searchBtn}</button>
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
                  <option value="">{copy.allStyles}</option>
                  {TEACHING_STYLES.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>

                <div className="flex items-center gap-2">
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "All" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("All")}>{copy.all}</button>
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "Male" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("Male")}>{copy.male}</button>
                  <button className={`px-4 py-2 rounded-full font-semibold ${gender === "Female" ? "bg-[#0b63ff] text-white" : "bg-white/90 text-gray-700"}`} onClick={() => setGender("Female")}>{copy.female}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div data-scrollspy data-scroll-title="Danh mục" className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">{copy.categoriesTitle}</h2>
            <p className="text-sm text-gray-500 mt-1">{copy.categoriesSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SUBJECTS.map((s) => {
            return (
              <button
                key={s}
                onClick={() => {
                  setSelectedCategory(s);
                  featuredTutorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group text-left rounded-3xl p-5 border bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 transition-all shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-blue-50">
                      <span className="text-[#0b63ff]">📚</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{s}</h3>
                    <p className="text-sm text-gray-500">{categoryCounts[s] || 0} tutors</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Tutors */}
      <div ref={featuredTutorsRef} data-scrollspy data-scroll-title="Gia sư nổi bật" className="max-w-6xl mx-auto mt-4 mb-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{copy.tutorsTitle}</h2>
          <p className="text-gray-500">{selectedCategory === "Tất cả" ? copy.tutorsSub : `Gia sư phù hợp cho danh mục ${selectedCategory}`}</p>
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setSelectedTutor(tutor)}>View Profile</button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">Contact</button>
              </div>
            </div>
          ))}
        </div>
        {featuredTutors.length === 0 && (
          <div className="text-center bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 py-12 text-gray-500 dark:text-gray-400 font-semibold">
            Không tìm thấy gia sư theo bộ lọc đã chọn.
          </div>
        )}
      </div>

      <Footer />
      <TutorProfileDrawer tutor={selectedTutor} open={!!selectedTutor} onClose={() => setSelectedTutor(null)} />
    </div>
  );
}
