import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { VerifiedBadge, StarRating, Avatar, SubjectBadge, formatPrice } from "../components/ui";
import { tutors, SUBJECTS, PRICE_RANGES } from "../data/tutors";

// ─── Tutor Card (horizontal layout) ──────────────────────────────────────────
function TutorCard({ tutor, onClick }) {
  return (
    <div
      onClick={() => onClick(tutor.id)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
    >
      {/* Top row: avatar + name + badges */}
      <div className="flex items-start gap-4 p-5 pb-3">
        <Avatar initials={tutor.initials} bg={tutor.avatarBg} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-extrabold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors truncate">
              {tutor.name}
            </h3>
            {tutor.verified && <VerifiedBadge />}
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate">{tutor.title}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <SubjectBadge label={tutor.subject} colorClass={tutor.subjectColor} />
            <StarRating rating={tutor.rating} count={tutor.reviewCount} />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-5 pb-3">
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{tutor.bio}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 px-5 pb-3">
        {tutor.tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {tutor.totalSessions} buổi
        </div>
        <div className="flex items-center gap-1 truncate">
          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{tutor.availability}</span>
        </div>
      </div>

      {/* Footer: price + button */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 mt-auto">
        <div>
          <span className="text-xl font-extrabold text-gray-900">{formatPrice(tutor.pricePerHour)}</span>
          <span className="text-gray-400 text-xs">/giờ</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95 whitespace-nowrap">
          Xem hồ sơ →
        </button>
      </div>
    </div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
function FilterSidebar({ subject, setSubject, priceRange, setPriceRange, verifiedOnly, setVerifiedOnly, onReset }) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-extrabold text-gray-900 text-base">Bộ lọc</h2>
          <button onClick={onReset} className="text-xs text-orange-500 font-semibold hover:text-orange-600 transition-colors">
            Xóa lọc
          </button>
        </div>

        {/* Verified Filter */}
        <div className="mb-6">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all font-semibold text-sm ${verifiedOnly ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-emerald-300"
              }`}
          >
            <svg className={`w-4 h-4 ${verifiedOnly ? "text-emerald-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Chỉ gia sư đã xác minh
          </button>
        </div>

        {/* Subject Filter */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Môn học</h3>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${subject === s ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Mức học phí</h3>
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range, i) => (
              <button
                key={i}
                onClick={() => setPriceRange(i)}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${priceRange === i ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TutorListingPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tutors.filter((t) => {
    const matchSubject = subject === "Tất cả" || t.subject === subject;
    const range = PRICE_RANGES[priceRange];
    const matchPrice = t.pricePerHour >= range.min && t.pricePerHour <= range.max;
    const matchVerified = !verifiedOnly || t.verified;
    const matchSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSubject && matchPrice && matchVerified && matchSearch;
  });

  const handleReset = () => {
    setSubject("Tất cả");
    setPriceRange(0);
    setVerifiedOnly(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Search Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-extrabold mb-2">Tìm gia sư phù hợp với bạn</h1>
          <p className="text-blue-200 text-sm mb-6">Hơn 870 gia sư đã được xác minh đang sẵn sàng dạy bạn</p>
          <div className="relative max-w-2xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm theo tên gia sư, môn học, kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            subject={subject} setSubject={setSubject}
            priceRange={priceRange} setPriceRange={setPriceRange}
            verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
            onReset={handleReset}
          />

          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-extrabold text-gray-900 text-lg">{filtered.length} gia sư</span>
                {subject !== "Tất cả" && (
                  <span className="text-gray-500 text-sm ml-2">trong môn "{subject}"</span>
                )}
              </div>
              <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:outline-none focus:border-blue-400 bg-white">
                <option>Sắp xếp: Đánh giá cao nhất</option>
                <option>Sắp xếp: Giá thấp nhất</option>
                <option>Sắp xếp: Số buổi nhiều nhất</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-semibold">Không tìm thấy gia sư phù hợp</p>
                <button onClick={handleReset} className="mt-3 text-sm text-orange-500 font-semibold hover:text-orange-600">Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filtered.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} onClick={(id) => navigate(`/tutors/${id}`)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}