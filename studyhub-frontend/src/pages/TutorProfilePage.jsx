import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { VerifiedBadge, StarRating, Avatar, SubjectBadge, formatPrice } from "../components/ui";
import { getTutorById } from "../data/tutors";

const DAYS = [
  { key: "mon", label: "T2" },
  { key: "tue", label: "T3" },
  { key: "wed", label: "T4" },
  { key: "thu", label: "T5" },
  { key: "fri", label: "T6" },
  { key: "sat", label: "T7" },
  { key: "sun", label: "CN" },
];

// ─── Availability Calendar ────────────────────────────────────────────────────
function AvailabilityCalendar({ calendar, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSlot = (day, time) => {
    const key = `${day}-${time}`;
    setSelected(key === selected ? null : key);
    onSelect(key === selected ? null : { day, time });
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 min-w-[420px]">
        {DAYS.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase">{label}</div>
            <div className="space-y-1.5">
              {calendar[key].length === 0 ? (
                <div className="h-8 flex items-center justify-center">
                  <span className="text-gray-300 text-xs">—</span>
                </div>
              ) : (
                calendar[key].map((time) => {
                  const key2 = `${key}-${time}`;
                  const isSelected = selected === key2;
                  return (
                    <button
                      key={time}
                      onClick={() => handleSlot(key, time)}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all ${isSelected
                          ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                    >
                      {time}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertificateCard({ cert }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
      {/* Blurred certificate preview */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-blue-200">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/40" />
        <svg className="w-6 h-6 text-blue-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-800 text-sm leading-tight">{cert.name}</p>
        <p className="text-gray-400 text-xs mt-0.5">Cấp năm {cert.year}</p>
      </div>
      {cert.verified && (
        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Đã kiểm duyệt bởi StudyHub
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TutorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutor = getTutorById(id || 1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy gia sư.</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Vui lòng chọn khung giờ học trước!");
      return;
    }
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/tutors")} className="hover:text-blue-600 transition-colors">Danh sách gia sư</button>
          <span>/</span>
          <span className="text-gray-700 font-medium">{tutor.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Main Content ─── */}
          <div className="flex-1 space-y-6">

            {/* Profile Header Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar initials={tutor.initials} bg={tutor.avatarBg} size="xl" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">{tutor.name}</h1>
                      <p className="text-gray-500 text-sm mt-1">{tutor.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <SubjectBadge label={tutor.subject} colorClass={tutor.subjectColor} />
                      {tutor.verified && <VerifiedBadge size="md" />}
                    </div>
                  </div>
                  <StarRating rating={tutor.rating} count={tutor.reviewCount} size="md" />
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <strong className="text-gray-800">{tutor.totalSessions}</strong> buổi đã dạy
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {tutor.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { key: "about", label: "Giới thiệu" },
                  { key: "certs", label: "Bằng cấp & Chứng chỉ" },
                  { key: "video", label: "Video giới thiệu" },
                  { key: "reviews", label: `Đánh giá (${tutor.reviews.length})` },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === tab.key
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-800"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* About Tab */}
                {activeTab === "about" && (
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-3">Về gia sư</h3>
                    <p className="text-gray-600 leading-relaxed">{tutor.bio}</p>
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide text-gray-500">Chuyên môn</h4>
                      <div className="flex flex-wrap gap-2">
                        {tutor.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 font-semibold text-sm px-3 py-1.5 rounded-xl">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificates Tab */}
                {activeTab === "certs" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-extrabold text-gray-900">Bằng cấp & Chứng chỉ</h3>
                      <span className="text-xs bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        Tất cả đã được kiểm duyệt
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-5">
                      Tất cả tài liệu được xác minh bởi đội ngũ StudyHub. Hình ảnh được làm mờ để bảo vệ thông tin cá nhân của gia sư.
                    </p>
                    <div className="space-y-3">
                      {tutor.certificates.map((cert, i) => (
                        <CertificateCard key={i} cert={cert} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Tab */}
                {activeTab === "video" && (
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-2">Video giới thiệu & Giảng thử</h3>
                    <p className="text-gray-500 text-sm mb-5">Xem phong cách giảng dạy của gia sư trước khi đặt lịch.</p>
                    <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden aspect-video flex items-center justify-center group cursor-pointer">
                      <div className="absolute inset-0 bg-black/20" />
                      {/* Play button */}
                      <div className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-sm">Giới thiệu bản thân & Demo bài giảng Giải tích</p>
                        <p className="text-white/70 text-xs">5:32 • Đăng ngày 10/01/2025</p>
                      </div>
                      {/* Decorative grid pattern */}
                      <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      Video được kiểm duyệt bởi StudyHub • Nội dung giảng dạy thực tế
                    </p>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-5">Đánh giá từ học viên</h3>
                    <div className="space-y-4">
                      {tutor.reviews.map((review, i) => (
                        <div key={i} className="bg-gray-50 rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-sm text-gray-900">{review.name}</p>
                                <p className="text-xs text-gray-400">{review.date}</p>
                              </div>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-extrabold text-gray-900 mb-2">Chọn lịch học</h3>
              <p className="text-gray-500 text-sm mb-6">Nhấn vào khung giờ trống để chọn thời gian học phù hợp với bạn</p>
              <AvailabilityCalendar calendar={tutor.calendar} onSelect={setSelectedSlot} />
              {selectedSlot && (
                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-semibold bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Đã chọn: {selectedSlot.day?.toUpperCase()} lúc {selectedSlot.time}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Booking Sidebar ─── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-extrabold text-gray-900">{formatPrice(tutor.pricePerHour)}</p>
                <p className="text-gray-400 text-sm">/giờ học</p>
              </div>

              {/* Escrow info */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-amber-700 font-bold text-xs">Thanh toán an toàn</p>
                    <p className="text-amber-600 text-xs mt-0.5 leading-relaxed">
                      Tiền được giữ bởi StudyHub và chỉ chuyển cho gia sư sau khi bạn xác nhận hoàn thành buổi học.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className={`w-full font-bold py-4 rounded-2xl transition-all text-sm ${selectedSlot
                    ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-xl hover:shadow-orange-200 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {selectedSlot ? "Đặt lịch ngay →" : "Chọn khung giờ trước"}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Miễn phí hủy trước 24 giờ</p>

              <div className="border-t border-gray-100 mt-5 pt-5 space-y-3">
                {[
                  ["Buổi học", "60 phút"],
                  ["Hình thức", "Trực tuyến (Zoom/Meet)"],
                  ["Ngôn ngữ", "Tiếng Việt"],
                ].map(([label, val], i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}