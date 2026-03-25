import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const materials = [
  {
    id: "DOC-001",
    title: "Giải tích – Công thức đạo hàm đầy đủ",
    subject: "Toán", level: "Đại học", grade: "Năm 1", type: "PDF",
    tutor: { name: "Nguyễn Thanh Tùng", initials: "NTT", avatarBg: "#f59e0b" },
    pages: 12, downloads: 348, likes: 92,
    previewLines: ["Đạo hàm của hàm hợp", "Quy tắc L'Hôpital", "Chuỗi Taylor & Maclaurin"],
    tag: "Phổ biến", tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    price: null,
  },
  {
    id: "DOC-002",
    title: "IELTS Writing – Band 7+ Templates",
    subject: "Tiếng Anh", level: "Đại học", grade: "Năm 2", type: "PDF",
    tutor: { name: "Phạm Thị Lan", initials: "PTL", avatarBg: "#ec4899" },
    pages: 20, downloads: 521, likes: 134,
    previewLines: ["Task 1: Line graph template", "Task 2: Opinion essay structure", "Vocabulary for band 7+"],
    tag: "Mới nhất", tagColor: "bg-blue-50 text-blue-600 border-blue-200",
    price: 49000,
  },
  {
    id: "DOC-003",
    title: "React cơ bản – Slide buổi 1 đến 5",
    subject: "Lập trình", level: "Đại học", grade: "Năm 3", type: "Slide",
    tutor: { name: "Lê Hoàng Phúc", initials: "LHP", avatarBg: "#6366f1" },
    pages: 45, downloads: 210, likes: 67,
    previewLines: ["JSX & Component lifecycle", "useState & useEffect", "Props drilling vs Context"],
    tag: "Bán chạy", tagColor: "bg-violet-50 text-violet-600 border-violet-200",
    price: 79000,
  },
  {
    id: "DOC-004",
    title: "Vật lý – Điện từ trường tóm tắt lý thuyết",
    subject: "Vật lý", level: "THPT", grade: "Lớp 12", type: "PDF",
    tutor: { name: "Trần Minh Khoa", initials: "TMK", avatarBg: "#10b981" },
    pages: 8, downloads: 183, likes: 55,
    previewLines: ["Định luật Faraday", "Từ thông & cảm ứng điện từ", "Máy biến áp"],
    tag: "Phổ biến", tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    price: null,
  },
  {
    id: "DOC-005",
    title: "Video giải đề Hóa hữu cơ 2024",
    subject: "Hóa học", level: "THPT", grade: "Lớp 12", type: "Video",
    tutor: { name: "Vũ Đức Anh", initials: "VĐA", avatarBg: "#0ea5e9" },
    pages: null, duration: "38 phút", downloads: 97, likes: 41,
    previewLines: ["Phản ứng este hóa", "Bài tập chuỗi chuyển hóa", "Đề minh họa THPTQG 2024"],
    tag: "Mới nhất", tagColor: "bg-blue-50 text-blue-600 border-blue-200",
    price: 59000,
  },
  {
    id: "DOC-006",
    title: "Văn học – Phân tích Chí Phèo chi tiết",
    subject: "Văn học", level: "THPT", grade: "Lớp 11", type: "PDF",
    tutor: { name: "Ngô Thị Hương", initials: "NTH", avatarBg: "#f97316" },
    pages: 16, downloads: 265, likes: 88,
    previewLines: ["Giới thiệu tác giả Nam Cao", "Phân tích nhân vật Chí Phèo", "Kết luận & mở rộng"],
    tag: null, tagColor: "",
    price: null,
  },
  {
    id: "DOC-007",
    title: "Toán 12 – Bộ đề thi thử THPTQG có đáp án",
    subject: "Toán", level: "THPT", grade: "Lớp 12", type: "PDF",
    tutor: { name: "Nguyễn Thanh Tùng", initials: "NTT", avatarBg: "#f59e0b" },
    pages: 80, downloads: 412, likes: 110,
    previewLines: ["20 đề thi thử có lời giải", "Phân dạng bài tập theo chủ đề", "Thống kê điểm theo cấu trúc đề"],
    tag: "Bán chạy", tagColor: "bg-violet-50 text-violet-600 border-violet-200",
    price: 99000,
  },
  {
    id: "DOC-008",
    title: "Python cho người mới – Bài tập từng bước",
    subject: "Lập trình", level: "Đại học", grade: "Năm 1", type: "PDF",
    tutor: { name: "Lê Hoàng Phúc", initials: "LHP", avatarBg: "#6366f1" },
    pages: 35, downloads: 156, likes: 49,
    previewLines: ["Cú pháp cơ bản Python", "List, Dict, Loop", "OOP & File I/O"],
    tag: null, tagColor: "",
    price: 39000,
  },
  {
    id: "DOC-009",
    title: "Toán lớp 5 – Ôn tập cuối kỳ",
    subject: "Toán", level: "Tiểu học", grade: "Lớp 5", type: "PDF",
    tutor: { name: "Nguyễn Thanh Tùng", initials: "NTT", avatarBg: "#f59e0b" },
    pages: 10, downloads: 320, likes: 75,
    previewLines: ["Phân số & số thập phân", "Diện tích hình học cơ bản", "Bài tập thực hành"],
    tag: "Phổ biến", tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    price: null,
  },
  {
    id: "DOC-010",
    title: "Tiếng Anh lớp 8 – Grammar & Vocabulary",
    subject: "Tiếng Anh", level: "THCS", grade: "Lớp 8", type: "PDF",
    tutor: { name: "Phạm Thị Lan", initials: "PTL", avatarBg: "#ec4899" },
    pages: 24, downloads: 198, likes: 63,
    previewLines: ["Thì hoàn thành & tiếp diễn", "Câu điều kiện loại 1 & 2", "Từ vựng Unit 1-6"],
    tag: "Mới nhất", tagColor: "bg-blue-50 text-blue-600 border-blue-200",
    price: 29000,
  },
  {
    id: "DOC-011",
    title: "Hóa 9 – Tóm tắt lý thuyết hóa vô cơ",
    subject: "Hóa học", level: "THCS", grade: "Lớp 9", type: "PDF",
    tutor: { name: "Vũ Đức Anh", initials: "VĐA", avatarBg: "#0ea5e9" },
    pages: 18, downloads: 144, likes: 38,
    previewLines: ["Oxit – Axit – Bazơ – Muối", "Phản ứng hóa học cơ bản", "Bảng tính tan"],
    tag: null, tagColor: "",
    price: null,
  },
  {
    id: "DOC-012",
    title: "Toán lớp 3 – Bảng cửu chương & bài tập",
    subject: "Toán", level: "Tiểu học", grade: "Lớp 3", type: "PDF",
    tutor: { name: "Ngô Thị Hương", initials: "NTH", avatarBg: "#f97316" },
    pages: 6, downloads: 510, likes: 120,
    previewLines: ["Bảng nhân 2 đến 9", "Bài tập điền số", "Trò chơi ô chữ số"],
    tag: "Phổ biến", tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    price: null,
  },
];

// ─── Filter Constants ─────────────────────────────────────────────────────────
const SUBJECTS = ["Tất cả", "Toán", "Vật lý", "Lập trình", "Tiếng Anh", "Hóa học", "Văn học"];
const LEVELS = ["Tất cả", "Tiểu học", "THCS", "THPT", "Đại học"];
const GRADES_BY_LEVEL = {
  "Tiểu học": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
  "THCS":     ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
  "THPT":     ["Lớp 10", "Lớp 11", "Lớp 12"],
  "Đại học":  ["Năm 1", "Năm 2", "Năm 3", "Năm 4"],
};
const TYPES = ["Tất cả", "PDF", "Slide", "Video"];
const PRICE_FILTERS = ["Tất cả", "Miễn phí", "Có phí"];

const TYPE_ICON = { PDF: "📄", Slide: "📊", Video: "🎬" };
const TYPE_COLOR = {
  PDF: "bg-red-50 text-red-500 border-red-100",
  Slide: "bg-violet-50 text-violet-500 border-violet-100",
  Video: "bg-sky-50 text-sky-500 border-sky-100",
};
const SUBJECT_COLOR = {
  Toán: "#f59e0b", "Tiếng Anh": "#ec4899", "Lập trình": "#6366f1",
  "Vật lý": "#10b981", "Hóa học": "#0ea5e9", "Văn học": "#f97316",
};

function fmt(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// ─── Preview Modal ────────────────────────────────────────────────────────────
function PreviewModal({ material, onClose, onBuy }) {
  const isPaid = material.price !== null;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-1.5" style={{ background: SUBJECT_COLOR[material.subject] ?? "#94a3b8" }} />
        <div className="p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0" style={{ background: material.tutor.avatarBg }}>
              {material.tutor.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-gray-900 text-sm leading-snug">{material.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{material.tutor.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl leading-none ml-2 flex-shrink-0">✕</button>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${TYPE_COLOR[material.type]}`}>{TYPE_ICON[material.type]} {material.type}</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500">{material.grade}</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500">
              {material.pages ? `${material.pages} trang` : material.duration}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-400">⬇ {material.downloads.toLocaleString()}</span>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-5">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Nội dung chính</p>
            <ul className="space-y-2">
              {material.previewLines.map((line, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] text-gray-400 font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {isPaid ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-semibold">Giá tài liệu</p>
                  <p className="text-2xl font-black text-gray-900">{fmt(material.price)}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <p>Thanh toán một lần</p>
                  <p>Tải về vĩnh viễn ✓</p>
                </div>
              </div>
              <button onClick={() => onBuy(material)} className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-sm py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-100">
                {user ? "Mua ngay & Tải xuống 🔓" : "Đăng nhập để mua →"}
              </button>
              {!user && <p className="text-center text-gray-400 text-xs mt-2">Bạn sẽ được chuyển đến trang đăng nhập</p>}
            </div>
          ) : (
            <button onClick={() => onBuy(material)} className="w-full bg-gray-900 hover:bg-gray-800 active:scale-95 text-white font-black text-sm py-3.5 rounded-2xl transition-all">
              {user ? "Tải xuống miễn phí ↓" : "Đăng nhập để tải →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Material Card ────────────────────────────────────────────────────────────
function MaterialCard({ material, onPreview }) {
  const [liked, setLiked] = useState(false);
  const isPaid = material.price !== null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="h-1 w-full" style={{ background: SUBJECT_COLOR[material.subject] ?? "#94a3b8" }} />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TYPE_COLOR[material.type]}`}>{TYPE_ICON[material.type]} {material.type}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-100 bg-gray-50 text-gray-400">{material.grade}</span>
          {material.tag && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${material.tagColor}`}>{material.tag}</span>
          )}
          <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${isPaid ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"}`}>
            {isPaid ? fmt(material.price) : "Miễn phí"}
          </span>
        </div>

        <h3 className="font-black text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{material.title}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-white text-[9px] flex-shrink-0" style={{ background: material.tutor.avatarBg }}>
            {material.tutor.initials}
          </div>
          <p className="text-gray-400 text-xs truncate">{material.tutor.name}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex-1">
          <ul className="space-y-1">
            {material.previewLines.slice(0, 2).map((line, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                {line}
              </li>
            ))}
            {material.previewLines.length > 2 && (
              <li className="text-xs text-gray-300 italic">+{material.previewLines.length - 2} nội dung khác...</li>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onPreview(material)} className={`flex-1 font-black text-xs py-2.5 rounded-xl transition-all ${isPaid ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>
            {isPaid ? `Mua · ${fmt(material.price)}` : "Xem & Tải →"}
          </button>
          <button onClick={() => setLiked(l => !l)} className={`flex items-center gap-1 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${liked ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-100 text-gray-400 hover:border-red-200 hover:text-red-400"}`}>
            {liked ? "♥" : "♡"} {material.likes + (liked ? 1 : 0)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MaterialsPage() {
  const navigate = useNavigate();
  const [search, setSearch]           = useState("");
  const [subject, setSubject]         = useState("Tất cả");
  const [level, setLevel]             = useState("Tất cả");
  const [grade, setGrade]             = useState("Tất cả");
  const [type, setType]               = useState("Tất cả");
  const [priceFilter, setPriceFilter] = useState("Tất cả");
  const [preview, setPreview]         = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Khi đổi level thì reset grade
  const handleLevelChange = (val) => {
    setLevel(val);
    setGrade("Tất cả");
  };

  const gradeOptions = level !== "Tất cả" ? ["Tất cả", ...GRADES_BY_LEVEL[level]] : [];

  const handleBuy = (material) => {
    if (!user) { navigate("/login"); return; }
    alert(material.price ? `Tiến hành thanh toán ${fmt(material.price)} cho "${material.title}"` : `Đang tải "${material.title}"...`);
  };

  const filtered = materials.filter(m => {
    const q = search.toLowerCase();
    const matchSearch   = !q || m.title.toLowerCase().includes(q) || m.tutor.name.toLowerCase().includes(q);
    const matchSubject  = subject === "Tất cả" || m.subject === subject;
    const matchLevel    = level === "Tất cả" || m.level === level;
    const matchGrade    = grade === "Tất cả" || m.grade === grade;
    const matchType     = type === "Tất cả" || m.type === type;
    const matchPrice    = priceFilter === "Tất cả" || (priceFilter === "Miễn phí" ? m.price === null : m.price !== null);
    return matchSearch && matchSubject && matchLevel && matchGrade && matchType && matchPrice;
  });

  const totalDownloads = materials.reduce((a, m) => a + m.downloads, 0);
  const hasFilter = search || subject !== "Tất cả" || level !== "Tất cả" || grade !== "Tất cả" || type !== "Tất cả" || priceFilter !== "Tất cả";

  const clearAll = () => { setSearch(""); setSubject("Tất cả"); setLevel("Tất cả"); setGrade("Tất cả"); setType("Tất cả"); setPriceFilter("Tất cả"); };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {preview && (
        <PreviewModal
          material={preview}
          onClose={() => setPreview(null)}
          onBuy={(m) => { setPreview(null); handleBuy(m); }}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Tài liệu học tập</h1>
          <p className="text-gray-400 text-sm">Tổng hợp tài liệu từ các gia sư trên StudyHub — từ lớp 1 đến đại học.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { value: materials.length, label: "tài liệu", color: "text-blue-500", icon: "📚" },
            { value: totalDownloads.toLocaleString(), label: "lượt tải", color: "text-green-500", icon: "⬇️" },
            { value: materials.filter(m => m.price === null).length, label: "miễn phí", color: "text-emerald-500", icon: "🆓" },
            { value: materials.filter(m => m.price !== null).length, label: "có phí", color: "text-blue-600", icon: "🔒" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={`text-2xl font-black ${s.color} leading-none mb-1`}>{s.value}</p>
              <p className="text-gray-400 text-xs">{s.icon} {s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 space-y-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên tài liệu hoặc gia sư..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-300 focus:bg-white transition-all font-semibold text-gray-700 placeholder:text-gray-300"
            />
          </div>

          <div className="space-y-2.5">
            {/* Môn */}
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest w-10 flex-shrink-0 pt-1.5">Môn</span>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECTS.map(f => (
                  <button key={f} onClick={() => setSubject(f)} className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${subject === f ? "bg-blue-500 border-blue-500 text-white" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500"}`}>{f}</button>
                ))}
              </div>
            </div>

            {/* Cấp */}
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest w-10 flex-shrink-0 pt-1.5">Cấp</span>
              <div className="flex flex-wrap gap-1.5">
                {LEVELS.map(f => (
                  <button key={f} onClick={() => handleLevelChange(f)} className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${level === f ? "bg-violet-500 border-violet-500 text-white" : "bg-white text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-500"}`}>{f}</button>
                ))}
              </div>
            </div>

            {/* Lớp — chỉ hiện khi đã chọn cấp */}
            {level !== "Tất cả" && (
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest w-10 flex-shrink-0 pt-1.5">Lớp</span>
                <div className="flex flex-wrap gap-1.5">
                  {gradeOptions.map(f => (
                    <button key={f} onClick={() => setGrade(f)} className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${grade === f ? "bg-orange-500 border-orange-500 text-white" : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"}`}>{f}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Loại */}
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest w-10 flex-shrink-0 pt-1.5">Loại</span>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map(f => (
                  <button key={f} onClick={() => setType(f)} className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${type === f ? "bg-gray-900 border-gray-900 text-white" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"}`}>
                    {f !== "Tất cả" ? `${TYPE_ICON[f]} ` : ""}{f}
                  </button>
                ))}
              </div>
            </div>

            {/* Giá */}
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest w-10 flex-shrink-0 pt-1.5">Giá</span>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_FILTERS.map(f => (
                  <button key={f} onClick={() => setPriceFilter(f)} className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${priceFilter === f ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-500"}`}>{f}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400 font-semibold">{filtered.length} tài liệu{hasFilter ? " phù hợp" : ""}</p>
          {hasFilter && (
            <button onClick={clearAll} className="text-xs font-bold text-gray-400 hover:text-gray-700 transition-all">✕ Xóa bộ lọc</button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-4xl block mb-3">📭</span>
            <p className="text-gray-400 font-semibold text-sm">Không tìm thấy tài liệu phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filtered.map(m => (
              <MaterialCard key={m.id} material={m} onPreview={setPreview} />
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-black text-white text-base">Bạn là gia sư? Chia sẻ & bán tài liệu của mình!</p>
            <p className="text-blue-100 text-sm mt-1">Upload tài liệu, đặt giá và tiếp cận hàng nghìn học sinh trên StudyHub.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="bg-white text-blue-600 font-black text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all">Đăng ký ngay</button>
            <button className="bg-white/10 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all border border-white/20">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}