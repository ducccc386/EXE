import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getTutors } from "../services/tutorService";
import { SUBJECTS, PRICE_RANGES } from "../data/tutors";
import Slider from "../components/Slider";

function formatVND(n) {
  return n?.toLocaleString("vi-VN") ?? "—";
}

// Cover image URLs by initials fallback
const COVER_PHOTOS = {
  TT: "https://i.pravatar.cc/600?img=11",
  MC: "https://i.pravatar.cc/600?img=5",
  HP: "https://i.pravatar.cc/600?img=15",
  LA: "https://i.pravatar.cc/600?img=47",
  ĐM: "https://i.pravatar.cc/600?img=12",
  TH: "https://i.pravatar.cc/600?img=48",
  PA: "https://i.pravatar.cc/600?img=49",
  VY: "https://i.pravatar.cc/600?img=44",
  HQ: "https://i.pravatar.cc/600?img=68",
};

const GRADIENTS = {
  "bg-blue-500":   "from-blue-400 to-indigo-600",
  "bg-orange-500": "from-orange-400 to-pink-500",
  "bg-green-500":  "from-green-400 to-teal-500",
  "bg-pink-500":   "from-pink-400 to-rose-500",
  "bg-purple-500": "from-purple-400 to-violet-600",
  "bg-teal-500":   "from-teal-400 to-cyan-500",
};

// ─── TutorCard ────────────────────────────────────────────────────────────────
function TutorCard({ tutor, onView }) {
  const photo = tutor.coverImage || tutor.avatar || COVER_PHOTOS[tutor.initials];
  const gradient = tutor.coverGradient || GRADIENTS[tutor.avatarBg] || "from-blue-400 to-indigo-600";
  const price = tutor.pricePerHour || tutor.hourlyRate || 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">

      {/* ── TOP HALF: full-cover photo / gradient ── */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        {photo ? (
          <img
            src={photo}
            alt={tutor.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
              {tutor.initials}
            </div>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Subject badge — top right */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
          {tutor.subject}
        </span>

        {/* Verified — top left */}
        {tutor.verified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Đã xác minh
          </span>
        )}

        {/* Rating overlay on photo */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-white text-xs font-bold drop-shadow">{tutor.rating}</span>
          <span className="text-white/75 text-xs drop-shadow">({tutor.reviewCount} đánh giá)</span>
        </div>
      </div>

      {/* ── BOTTOM: info ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {tutor.name}
        </h3>

        <div className="mt-2.5 space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="truncate">{tutor.location || "Việt Nam"}</span>
          </div>
          {tutor.title && (
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              <span className="truncate">{tutor.title}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
            </svg>
            <span>₫{formatVND(price)}/giờ</span>
          </div>
        </div>

        <div className="mt-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
            {tutor.subject}
          </span>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={onView}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200"
          >
            Xem hồ sơ
          </button>
          <button
            className="flex-1 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold text-sm py-2.5 rounded-xl transition-all"
          >
            Liên hệ
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Drawer ───────────────────────────────────────────────────────────
function TutorProfileDrawer({ tutor, open, onClose }) {
  if (!open || !tutor) return null;

  const photo = tutor.coverImage || tutor.avatar || COVER_PHOTOS[tutor.initials];
  const gradient = tutor.coverGradient || GRADIENTS[tutor.avatarBg] || "from-blue-400 to-indigo-600";
  const price = tutor.pricePerHour || tutor.hourlyRate || 0;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-gray-100 dark:border-slate-800 overflow-y-auto">

        {/* ── TOP HALF: full cover photo ── */}
        <div className="relative overflow-hidden" style={{ height: "280px" }}>
          {photo ? (
            <img src={photo} alt={tutor.name} className="w-full h-full object-cover object-top" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <div className="w-36 h-36 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-6xl font-black text-white shadow-2xl">
                {tutor.initials}
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white font-bold text-xl flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            ×
          </button>

          {tutor.verified && (
            <span className="absolute top-4 left-4 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Đã xác minh
            </span>
          )}

          {/* Name + rating over photo */}
          <div className="absolute bottom-5 left-5 right-12">
            <h4 className="text-2xl font-black text-white drop-shadow-lg">{tutor.name}</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-white font-bold text-sm">{tutor.rating}</span>
              <span className="text-white/70 text-xs">({tutor.reviewCount} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="px-6 pt-5 space-y-5 pb-10">
          {tutor.title && <p className="text-sm text-gray-500 dark:text-gray-400">{tutor.title}</p>}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Địa điểm</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{tutor.location || "Việt Nam"}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Học phí</p>
              <p className="text-sm font-bold text-blue-600 mt-1">
                ₫{formatVND(price)}<span className="text-gray-400 font-normal text-xs">/giờ</span>
              </p>
            </div>
          </div>

          {tutor.bio && (
            <div>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Giới thiệu</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tutor.bio}</p>
            </div>
          )}

          {(tutor.tags || []).length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Kỹ năng</h5>
              <div className="flex flex-wrap gap-2">
                {tutor.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(tutor.certificates || []).length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Chứng chỉ & Bằng cấp</h5>
              <div className="space-y-2">
                {tutor.certificates.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>{c.name} {c.year && <span className="text-gray-400">({c.year})</span>}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(tutor.reviews || []).length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Đánh giá</h5>
              <div className="space-y-3">
                {tutor.reviews.map((r, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{r.name}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{r.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button className="w-full rounded-2xl bg-blue-600 text-white font-bold py-3 hover:bg-blue-700 transition-colors active:scale-95">
              Nhắn tin
            </button>
            <button className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              Gửi kết bạn
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TutorListingPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [subject, setSubject] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    getTutors()
      .then(data => { if (mounted) setTutors(data || []); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const filtered = tutors.filter(t => {
    const matchSubject = subject === "Tất cả" || t.subject === subject;
    const range = PRICE_RANGES[priceRange] || { min: 0, max: Infinity };
    const price = t.hourlyRate || t.pricePerHour || 0;
    const matchPrice = price >= range.min && price <= range.max;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q
      || (t.name || "").toLowerCase().includes(q)
      || (t.subject || "").toLowerCase().includes(q)
      || (t.tags || []).some(tag => tag.toLowerCase().includes(q));
    return matchSubject && matchPrice && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100 font-sans">
      <Navbar />
      <div className="pt-6"><Slider /></div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Tìm gia sư phù hợp</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input
            type="text"
            placeholder="Tìm theo tên, môn học, kỹ năng..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full md:w-2/5 bg-white dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select value={subject} onChange={e => setSubject(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full md:w-1/5 bg-white dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-400">
            <option value="Tất cả">Tất cả môn</option>
            {SUBJECTS.filter(s => s !== "Tất cả").map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
            className="border rounded-xl px-4 py-3 w-full md:w-1/5 bg-white dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-400">
            {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Đang tải gia sư…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-16">Không tìm thấy gia sư.</div>
            ) : (
              filtered.map(t => (
                <TutorCard key={t.id} tutor={t} onView={() => setSelectedTutor(t)} />
              ))
            )}
          </div>
        )}
      </div>

      <TutorProfileDrawer tutor={selectedTutor} open={!!selectedTutor} onClose={() => setSelectedTutor(null)} />
      <Footer />
    </div>
  );
}