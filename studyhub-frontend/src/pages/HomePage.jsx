
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tutors } from "../data/tutors";
import Slider from "../components/Slider";


const SUBJECTS = [
  "English", "IELTS", "Math", "Chemistry", "Literature", "SAT"
];

const TEACHING_STYLES = [
  "#Friendly", "#Funny", "#Easygoing", "#Patient", "#Encouraging", "#Serious", "#Strict", "#Structured", "#Interactive", "#Creative", "#Practical", "#Detail-oriented"
];

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState([50000, 1000000]);
  const [gender, setGender] = useState("All");
  const navigate = useNavigate();


  // Ref for featured tutors section
  const featuredTutorsRef = useRef(null);
  // Lọc gia sư nổi bật (giả lập, lấy 3 người đầu)
  const featuredTutors = tutors.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Slider />

      {/* Banner + Search */}
      <div data-scrollspy data-scroll-title="Tìm gia sư" className="relative bg-gradient-to-br from-blue-600 to-blue-400 py-16 px-4 text-center">
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
        {/* Search Filters */}
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-4 items-center justify-center">
          <input type="text" placeholder="Enter keywords" value={keyword} onChange={e => setKeyword(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-48" />
          <select value={subject} onChange={e => setSubject(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-40">
            <option value="">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="text" placeholder="Type to search location (e.g., Ha Noi, Ba Dinh)" value={location} onChange={e => setLocation(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-56" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-all">Search</button>
        </div>
        {/* Teaching Styles */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {TEACHING_STYLES.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-100">{tag}</span>
          ))}
        </div>
        {/* Price & Gender */}
        <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Price Range (VND/hr):</span>
            <span className="font-bold text-blue-700">50,000</span>
            <input type="range" min={50000} max={1000000} step={50000} value={price[0]} onChange={e => setPrice([+e.target.value, price[1]])} className="mx-2" />
            <input type="range" min={50000} max={1000000} step={50000} value={price[1]} onChange={e => setPrice([price[0], +e.target.value])} className="mx-2" />
            <span className="font-bold text-blue-700">1,000,000 VND</span>
          </div>
          <div>
            <select value={style} onChange={e => setStyle(e.target.value)} className="border rounded-lg px-2 py-1">
              <option value="">Default</option>
              {TEACHING_STYLES.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Gender:</span>
            <button className={`px-3 py-1 rounded-full font-bold ${gender === "All" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setGender("All")}>All</button>
            <button className={`px-3 py-1 rounded-full font-bold ${gender === "Male" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setGender("Male")}>Male</button>
            <button className={`px-3 py-1 rounded-full font-bold ${gender === "Female" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setGender("Female")}>Female</button>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div data-scrollspy data-scroll-title="Danh mục" className="max-w-5xl mx-auto mt-12">
        <h2 className="text-3xl font-extrabold text-green-600 text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {SUBJECTS.map(s => (
            <div key={s} className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-all">
              <span className="text-3xl mb-2">📚</span>
              <span className="font-bold text-lg text-green-700 mb-1">{s}</span>
              <span className="text-gray-500 text-sm">{Math.floor(Math.random() * 60 + 5)} tutors</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Tutors */}
      <div ref={featuredTutorsRef} data-scrollspy data-scroll-title="Gia sư nổi bật" className="max-w-5xl mx-auto mt-4 mb-16">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">Gia Sư Nổi Bật</h2>
        <p className="text-center text-gray-500 mb-8">Discover experienced tutors who are ready to help you achieve your academic goals</p>
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
