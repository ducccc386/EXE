import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const allSessions = [
  {
    id: "BK-2025-001",
    tutor: { name: "Nguyễn Thanh Tùng", initials: "NTT", avatarBg: "#f59e0b" },
    subject: "Toán học – Giải tích",
    date: "Hôm nay",
    time: "19:00 – 20:30",
    duration: 90,
    status: "live",
    spotsLeft: null,
    viewers: 4, // Bạn có thể xóa trường này trong DB sau, hiện tại UI sẽ bỏ qua nó
    tags: ["Toán", "Đại học"],
  },
  {
    id: "BK-2025-002",
    tutor: { name: "Trần Minh Khoa", initials: "TMK", avatarBg: "#10b981" },
    subject: "Vật lý – Điện từ học",
    date: "Hôm nay",
    time: "18:30 – 20:00",
    duration: 90,
    status: "live",
    spotsLeft: null,
    viewers: 7,
    tags: ["Vật lý", "THPT"],
  },
  {
    id: "BK-2025-003",
    tutor: { name: "Lê Hoàng Phúc", initials: "LHP", avatarBg: "#6366f1" },
    subject: "Lập trình – React cơ bản",
    date: "Thứ 6, 21/03",
    time: "20:00 – 22:00",
    duration: 120,
    status: "upcoming",
    spotsLeft: 2,
    viewers: 9,
    tags: ["Lập trình", "Web"],
  },
  {
    id: "BK-2025-004",
    tutor: { name: "Phạm Thị Lan", initials: "PTL", avatarBg: "#ec4899" },
    subject: "Tiếng Anh – IELTS Writing",
    date: "Thứ 5, 20/03",
    time: "20:30 – 22:00",
    duration: 90,
    status: "upcoming",
    spotsLeft: 1,
    viewers: 12,
    tags: ["Tiếng Anh", "IELTS"],
  },
  {
    id: "BK-2025-005",
    tutor: { name: "Vũ Đức Anh", initials: "VĐA", avatarBg: "#0ea5e9" },
    subject: "Hóa học – Hóa hữu cơ",
    date: "Hôm nay",
    time: "19:30 – 21:00",
    duration: 90,
    status: "live",
    spotsLeft: null,
    viewers: 3,
    tags: ["Hóa học", "THPT"],
  },
  {
    id: "BK-2025-006",
    tutor: { name: "Ngô Thị Hương", initials: "NTH", avatarBg: "#f97316" },
    subject: "Văn học – Phân tích tác phẩm",
    date: "Thứ 7, 22/03",
    time: "09:00 – 10:30",
    duration: 90,
    status: "upcoming",
    spotsLeft: 3,
    viewers: 5,
    tags: ["Văn học", "THPT"],
  },
];

const MY_IDS = ["BK-2025-001", "BK-2025-003"];
const SUBJECT_FILTERS = ["Tất cả", "Toán", "Vật lý", "Lập trình", "Tiếng Anh", "Hóa học", "Văn học"];

function LivePulse() {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
    </span>
  );
}

function SessionCard({ session }) {
  const isLive = session.status === "live";
  const isMine = MY_IDS.includes(session.id);

  return (
    <div className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
      ${isLive ? "border-orange-200 shadow-sm" : "border-gray-100 shadow-sm"}
      ${isMine ? "ring-2 ring-blue-400 ring-offset-2" : ""}
    `}>
      {isLive && <div className="h-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400" />}

      {isMine && (
        <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-blue-500 text-white px-2 py-0.5 rounded-full z-10">
          Của tôi
        </span>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0"
            style={{ background: session.tutor.avatarBg }}
          >
            {session.tutor.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-900 text-sm leading-tight truncate">{session.tutor.name}</p>
            <p className="text-gray-400 text-xs truncate mt-0.5">{session.subject}</p>
          </div>
          {isLive ? (
            <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 flex-shrink-0">
              <LivePulse /> LIVE
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex-shrink-0">
              Sắp tới
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-xl p-2.5">
            <p className="text-gray-400 text-[10px]">🗓 Ngày</p>
            <p className="font-bold text-gray-800 text-xs mt-0.5">{session.date}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5">
            <p className="text-gray-400 text-[10px]">⏰ Giờ</p>
            <p className="font-bold text-gray-800 text-xs mt-0.5">{session.time}</p>
          </div>
        </div>

        {/* Đã gỡ bỏ justify-between và phần hiển thị mắt (viewers) */}
        <div className="flex gap-1 flex-wrap">
          {session.tags.map((t) => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{t}</span>
          ))}
          {session.spotsLeft && (
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100 animate-pulse">
              🔥 Còn {session.spotsLeft} slot
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SchedulePublicPage() {
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("all");

  const liveCount = allSessions.filter(s => s.status === "live").length;
  const upcomingCount = allSessions.filter(s => s.status === "upcoming").length;
  
  // Đã bỏ tính toán totalViewers ở đây

  const filtered = allSessions.filter(s => {
    const tagOk = subjectFilter === "Tất cả" || s.tags.includes(subjectFilter);
    const statusOk = statusFilter === "all" || s.status === statusFilter;
    return tagOk && statusOk;
  });

  const liveSessions = filtered.filter(s => s.status === "live");
  const upcomingSessions = filtered.filter(s => s.status === "upcoming");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Page intro */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-gray-900">Lịch học hôm nay</h1>
            <span className="flex items-center gap-1.5 text-xs font-black px-3 py-1 bg-red-50 text-red-500 border border-red-100 rounded-full">
              <LivePulse /> Đang cập nhật
            </span>
          </div>
          <p className="text-gray-400 text-sm">Các buổi học đang và sắp diễn ra trên StudyHub — khám phá và đặt lịch ngay.</p>
        </div>

        {/* Stats - Cập nhật grid-cols-3 thành grid-cols-2 vì đã bỏ thẻ View */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { value: liveCount, label: "đang diễn ra", color: "text-red-500", icon: "🔴" },
            { value: upcomingCount, label: "sắp bắt đầu", color: "text-blue-500", icon: "🗓" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={`text-3xl font-black ${s.color} leading-none mb-1`}>{s.value}</p>
              <p className="text-gray-400 text-xs">{s.icon} {s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 space-y-3">
          <div className="flex gap-1">
            {[
              { key: "all", label: "Tất cả", count: allSessions.length },
              { key: "live", label: "🔴 Đang diễn ra", count: liveCount },
              { key: "upcoming", label: "🗓 Sắp tới", count: upcomingCount },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statusFilter === tab.key ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {tab.label}
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}>{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUBJECT_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setSubjectFilter(f)}
                className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${subjectFilter === f
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Live now */}
        {liveSessions.length > 0 && statusFilter !== "upcoming" && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <LivePulse />
              <p className="text-xs font-black text-gray-700 uppercase tracking-widest">Đang diễn ra ngay bây giờ</p>
              <div className="flex-1 h-px bg-red-100" />
              <span className="text-xs text-gray-400">{liveSessions.length} buổi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {liveSessions.map(s => <SessionCard key={s.id} session={s} />)}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingSessions.length > 0 && statusFilter !== "live" && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              <p className="text-xs font-black text-gray-700 uppercase tracking-widest">Sắp diễn ra</p>
              <div className="flex-1 h-px bg-blue-100" />
              <span className="text-xs text-gray-400">{upcomingSessions.length} buổi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingSessions.map(s => <SessionCard key={s.id} session={s} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-4xl block mb-3">📭</span>
            <p className="text-gray-400 font-semibold text-sm">Không có lịch học nào phù hợp</p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-2 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-black text-white text-base leading-snug">Muốn đặt lịch học riêng?</p>
            <p className="text-blue-100 text-sm mt-1">Đăng ký ngay để ghép gia sư phù hợp và quản lý lịch học của bạn.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="bg-white text-blue-600 font-black text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all">
              Đăng ký
            </button>
            <button className="bg-white/10 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all border border-white/20">
              Dashboard →
            </button>
          </div>
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">
          Buổi học viền xanh <span className="text-blue-400 font-bold">●</span> là của bạn
        </p>
      </div>

      <Footer />
    </div>
  );
}