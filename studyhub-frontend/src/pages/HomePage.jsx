import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// [MOCK] Xóa dòng dưới khi GET /api/tutors và GET /api/tutors/:id sẵn sàng
import { tutors, getTutorByIdMock } from "../mocks/tutors.mock";
import Slider from "../components/Slider";
import { useLanguage } from "../hooks/usePreferences";
import { FaMapMarkerAlt, FaStar, FaRegStar, FaGraduationCap, FaBook } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdSchool } from "react-icons/md";

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

// Star rating component
function StarRating({ rating, max = 5, size = "text-base" }) {
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {Array.from({ length: max }).map((_, i) => (
        i < Math.round(rating)
          ? <FaStar key={i} className="text-yellow-400" />
          : <FaRegStar key={i} className="text-yellow-300" />
      ))}
    </div>
  );
}

function TutorProfileDrawer({ tutor, open, onClose }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fullProfile = tutor ? getTutorByIdMock(tutor.id) : null;

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Small delay to allow mount before animating in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!mounted || !tutor) return null;

  const reviews = fullProfile?.reviews || [];
  const certificates = fullProfile?.certificates || tutor.certifications || [];
  const university = tutor.university || (tutor.title?.match(/ĐH[\w\s]+/)?.[0]) || null;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(1.5px)",
          opacity: visible ? 1 : 0,
        }}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <aside
        className="relative ml-auto h-full bg-white shadow-2xl z-10 flex flex-col overflow-y-auto"
        style={{
          width: "min(580px, 100vw)",
          borderRadius: "20px 0 0 20px",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center z-20 transition-colors"
        >
          <IoClose size={20} />
        </button>

        {/* Header / Profile Info */}
        <div className="px-8 pt-10 pb-5 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-3 bg-gray-100 flex items-center justify-center overflow-hidden">
            {tutor.avatarUrl ? (
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
            ) : tutor.avatar ? (
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg viewBox="0 0 80 80" className="w-16 h-16 text-gray-400" fill="none">
                <circle cx="40" cy="30" r="16" stroke="currentColor" strokeWidth="3" />
                <path d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">{tutor.name}</h2>

          {/* Location & Online */}
          <div className="flex items-center gap-2 text-gray-600 mb-2 flex-wrap justify-center">
            <FaMapMarkerAlt className="text-blue-500 shrink-0" />
            <span className="text-sm">{tutor.location || "–"}</span>
            <span className="text-green-600 font-semibold text-sm">(Online Available)</span>
          </div>

          {/* University */}
          {university && (
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MdSchool className="text-teal-600 shrink-0" />
              <span className="text-sm">{university}</span>
            </div>
          )}

          {/* Subject */}
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FaBook className="text-gray-500 shrink-0" />
            <span className="text-sm font-medium">{tutor.subject}</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={tutor.rating || 0} size="text-lg" />
            <span className="font-bold text-gray-800 text-lg">{(tutor.rating || 0).toFixed(1)}</span>
          </div>

          {/* Price */}
          <div className="mb-5">
            <span className="text-blue-600 font-bold text-2xl">
              đ{tutor.pricePerHour?.toLocaleString("vi-VN") || "–"}
            </span>
            <span className="text-gray-500 text-sm ml-1">per session</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button className="flex-1 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
              <AiOutlineMessage size={18} /> Message
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
              Be My Tutor
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100 mx-8" />

        {/* Certifications & Degrees */}
        <div className="px-8 py-5">
          <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-gray-900">
            <span className="text-yellow-500 text-lg">🏅</span>
            <span>Certifications &amp; Degrees</span>
          </h3>

          {certificates.length > 0 ? (
            <div className="flex flex-col gap-4">
              {certificates.map((cert, idx) => (
                <div key={idx}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span className="font-semibold text-orange-600 text-sm leading-snug">
                      {cert.name || cert.title}
                      {cert.year && <span className="text-gray-400 font-normal ml-1">({cert.year})</span>}
                    </span>
                  </div>
                  {cert.image && (
                    <img
                      src={cert.image}
                      alt={cert.name || cert.title}
                      className="rounded-xl border border-gray-100 shadow-sm max-h-52 ml-4 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No certifications added yet.</p>
          )}
        </div>

        <div className="h-px bg-gray-100 mx-8" />

        {/* Reviews */}
        <div className="px-8 py-5 pb-10">
          <h3 className="font-bold text-base mb-4 text-gray-900">Reviews</h3>

          {reviews.length > 0 ? (
            <div className="flex flex-col gap-3">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-gray-800">{review.name}</span>
                    <StarRating rating={review.rating} size="text-sm" />
                  </div>
                  {review.text && (
                    <p className="text-sm text-gray-600 mb-1">{review.text}</p>
                  )}
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No reviews yet.</p>
          )}
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

  const featuredTutorsRef = useRef(null);
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
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl shadow transition-all text-lg border-2 border-white/30" onClick={() => navigate("/login")}>{copy.heroBecome}</button>
        </div>
        {/* Search Filters */}
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
      <div data-scrollspy data-scroll-title={copy.categoriesTitle} className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">{copy.categoriesTitle}</h2>
            <p className="text-sm text-gray-500 mt-1">{copy.categoriesSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SUBJECTS.map((s) => (
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
          ))}
        </div>
      </div>

      {/* Featured Tutors */}
      <div ref={featuredTutorsRef} data-scrollspy data-scroll-title={copy.tutorsTitle} className="max-w-6xl mx-auto mt-4 mb-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{copy.tutorsTitle}</h2>
          <p className="text-gray-500">{selectedCategory === "Tất cả" ? copy.tutorsSub : `Gia sư phù hợp cho danh mục ${selectedCategory}`}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTutors.map(tutor => (
            <div key={tutor.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 flex flex-col items-center border border-transparent dark:border-slate-800">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-4xl text-blue-600">
                {tutor.avatar || tutor.initials || "👤"}
              </div>
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">{tutor.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tutor.location || "-"}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tutor.university || "-"}</div>
              <div className="text-blue-600 font-bold mb-1">{tutor.pricePerHour ? tutor.pricePerHour.toLocaleString() + "/hour" : "-"}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{tutor.subject}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setSelectedTutor(tutor)}>{lang === "vi" ? "Xem hồ sơ" : "View Profile"}</button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">{lang === "vi" ? "Liên hệ" : "Contact"}</button>
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
