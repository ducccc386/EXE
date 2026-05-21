import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { VerifiedBadge, StarRating, Avatar, SubjectBadge, formatPrice } from "../components/ui";
import { getTutors } from "../services/tutorService";
import { SUBJECTS, PRICE_RANGES } from "../data/tutors";

function TutorCard({ tutor, onView }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col">
      <div className="flex items-start gap-4 p-5 pb-3">
        <Avatar initials={tutor.initials} bg={tutor.avatarBg} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-extrabold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors truncate">{tutor.name}</h3>
            {tutor.verified && <VerifiedBadge />}
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate">{tutor.title}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <SubjectBadge label={tutor.subject} colorClass={tutor.subjectColor} />
            <StarRating rating={tutor.rating} count={tutor.reviewCount} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-3">
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{tutor.bio}</p>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 mt-auto">
        <div>
          <span className="text-xl font-extrabold text-gray-900">{formatPrice(tutor.pricePerHour || tutor.hourlyRate)}</span>
          <span className="text-gray-400 text-xs">/giờ</span>
        </div>
        <button onClick={onView} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95 whitespace-nowrap">
          Xem hồ sơ →
        </button>
      </div>
    </div>
  );
}

export default function TutorListingPage() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    async function fetchTutors() {
      try {
        setLoading(true);
        const data = await getTutors();
        if (mounted) setTutors(data || []);
      } catch (err) {
        console.error("Failed to load tutors", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTutors();
    return () => (mounted = false);
  }, []);

  const filtered = tutors.filter((t) => {
    const matchSubject = subject === "Tất cả" || t.subject === subject;
    const range = PRICE_RANGES[priceRange] || { min: 0, max: Infinity };
    const price = t.hourlyRate || t.pricePerHour || 0;
    const matchPrice = price >= range.min && price <= range.max;
    const matchVerified = !verifiedOnly || t.verified;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || (t.name || "").toLowerCase().includes(q) || (t.subject || "").toLowerCase().includes(q) || (t.tags || []).some(tag => tag.toLowerCase().includes(q));
    return matchSubject && matchPrice && matchVerified && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Tìm gia sư phù hợp</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input type="text" placeholder="Tìm theo tên gia sư, môn học, kỹ năng..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="border rounded-lg px-4 py-3 w-full md:w-2/5" />
          <select value={subject} onChange={e => setSubject(e.target.value)} className="border rounded-lg px-4 py-3 w-full md:w-1/5">
            <option value="Tất cả">Tất cả</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="border rounded-lg px-4 py-3 w-full md:w-1/5">
            {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Đang tải gia sư…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 font-semibold">Không tìm thấy gia sư.</div>
            ) : (
              filtered.map(t => (
                <TutorCard key={t.id} tutor={t} onView={() => navigate(`/tutors/${t.id}`)} />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}