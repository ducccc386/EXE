import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Avatar, StatusBadge, formatPrice } from "../components/ui";
import { mockBookings } from "../data/tutors";

// ─── Escrow Timeline ──────────────────────────────────────────────────────────
function EscrowTimeline({ status }) {
  const steps = [
    { key: "paid", label: "Đã thanh toán", icon: "💳" },
    { key: "escrow", label: "Tiền đang giữ bởi hệ thống", icon: "🔒" },
    { key: "session", label: "Buổi học diễn ra", icon: "📚" },
    { key: "confirmed", label: "Học viên xác nhận", icon: "✅" },
    { key: "released", label: "Tiền chuyển cho gia sư", icon: "💰" },
  ];

  const activeIndex = {
    upcoming: 0,
    escrow: 1,
    completed: 4,
  }[status] ?? 1;

  return (
    <div className="relative">
      {/* Connector line */}
      <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 z-0" />
      <div
        className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 z-0 transition-all duration-700"
        style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
      />

      <div className="relative z-10 flex justify-between">
        {steps.map((step, i) => {
          const isDone = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <div key={step.key} className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base transition-all ${isDone
                  ? isCurrent
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110 ring-4 ring-blue-100"
                    : "bg-emerald-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-400"
                }`}>
                {step.icon}
              </div>
              <p className={`text-xs text-center leading-tight max-w-16 ${isDone ? "text-gray-700 font-semibold" : "text-gray-400"}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({ booking, onConfirm, onDispute }) {
  const [showDispute, setShowDispute] = useState(false);
  const [disputeText, setDisputeText] = useState("");
  const isEscrow = booking.status === "escrow";
  const isUpcoming = booking.status === "upcoming";

  return (
    <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all ${isEscrow ? "border-amber-200 ring-1 ring-amber-100" : "border-gray-100"
      }`}>
      {/* Status Banner */}
      {isEscrow && (
        <div className="bg-amber-500 px-6 py-2.5 flex items-center gap-2">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <p className="text-white text-xs font-bold">
            Tiền đang được giữ bởi hệ thống StudyHub · Chưa chuyển cho gia sư
          </p>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <Avatar initials={booking.tutor.initials} bg={booking.tutor.avatarBg} size="md" />
            <div>
              <h3 className="font-extrabold text-gray-900">{booking.tutor.name}</h3>
              <p className="text-gray-500 text-sm">{booking.subject}</p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { icon: "📅", label: "Ngày học", value: booking.date },
            { icon: "⏰", label: "Giờ học", value: booking.time },
            { icon: "⏱", label: "Thời lượng", value: `${booking.duration} phút` },
            { icon: "💰", label: "Học phí", value: formatPrice(booking.price) },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-3">
              <p className="text-gray-400 text-xs mb-1">{item.icon} {item.label}</p>
              <p className="font-bold text-gray-800 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Escrow Timeline */}
        {!isUpcoming && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Trạng thái thanh toán</p>
            <EscrowTimeline status={booking.status} />
          </div>
        )}

        {/* Status Message */}
        <div className={`rounded-2xl p-4 mb-5 flex items-start gap-3 ${isEscrow
            ? "bg-amber-50 border border-amber-200"
            : booking.status === "completed"
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-blue-50 border border-blue-200"
          }`}>
          <span className="text-lg">{isEscrow ? "🔒" : booking.status === "completed" ? "✅" : "📅"}</span>
          <div>
            <p className={`font-bold text-sm ${isEscrow ? "text-amber-700" : booking.status === "completed" ? "text-emerald-700" : "text-blue-700"}`}>
              {booking.statusLabel}
            </p>
            {isEscrow && (
              <p className="text-amber-600 text-xs mt-1 leading-relaxed">
                Sau khi buổi học kết thúc, hãy bấm <strong>"Xác nhận hoàn thành"</strong> để tiền được chuyển cho gia sư. Nếu có vấn đề, hãy bấm <strong>"Khiếu nại"</strong> để được hỗ trợ.
              </p>
            )}
            {booking.status === "completed" && (
              <p className="text-emerald-600 text-xs mt-1">Tiền đã chuyển lúc {booking.completedAt}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEscrow && !showDispute && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onConfirm(booking.id)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl transition-all hover:shadow-lg hover:shadow-emerald-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Xác nhận hoàn thành
            </button>
            <button
              onClick={() => setShowDispute(true)}
              className="flex-1 border-2 border-red-300 text-red-500 hover:bg-red-50 font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Khiếu nại / Cần hỗ trợ
            </button>
          </div>
        )}

        {/* Dispute Form */}
        {showDispute && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Gửi khiếu nại
            </h4>
            <p className="text-red-600 text-xs mb-3">Mô tả vấn đề bạn gặp phải. Đội ngũ StudyHub sẽ xem xét và phản hồi trong vòng 24 giờ. Tiền sẽ tiếp tục được giữ trong thời gian giải quyết.</p>
            <textarea
              rows={3}
              value={disputeText}
              onChange={(e) => setDisputeText(e.target.value)}
              placeholder="Mô tả vấn đề của bạn..."
              className="w-full border border-red-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400 resize-none mb-3"
            />
            <div className="flex gap-3">
              <button
                onClick={() => onDispute(booking.id, disputeText)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                Gửi khiếu nại
              </button>
              <button
                onClick={() => setShowDispute(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl transition-all text-sm hover:bg-gray-50"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Booking ID */}
        <p className="text-gray-300 text-xs mt-4 text-right font-mono">{booking.id}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookingDashboardPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleConfirm = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "completed", statusLabel: "Đã hoàn thành – Tiền đã chuyển cho gia sư", completedAt: "Vừa xong" }
          : b
      )
    );
    showToast("✅ Xác nhận thành công! Tiền đã chuyển cho gia sư.", "success");
  };

  const handleDispute = (id, reason) => {
    if (!reason.trim()) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "dispute", statusLabel: "Đang trong quá trình giải quyết khiếu nại" }
          : b
      )
    );
    showToast("📋 Khiếu nại đã gửi! Đội ngũ sẽ phản hồi trong 24 giờ.", "warning");
  };

  const filters = [
    { key: "all", label: "Tất cả", count: bookings.length },
    { key: "escrow", label: "Đang giữ tiền", count: bookings.filter((b) => b.status === "escrow").length },
    { key: "upcoming", label: "Sắp diễn ra", count: bookings.filter((b) => b.status === "upcoming").length },
    { key: "completed", label: "Hoàn thành", count: bookings.filter((b) => b.status === "completed").length },
  ];

  const visible = activeFilter === "all" ? bookings : bookings.filter((b) => b.status === activeFilter);

  // Summary stats
  const totalEscrow = bookings.filter((b) => b.status === "escrow").reduce((acc, b) => acc + b.price, 0);
  const totalPaid = bookings.filter((b) => b.status === "completed").reduce((acc, b) => acc + b.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl shadow-xl font-semibold text-sm transition-all ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
          }`}>
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Quản lý lịch học</h1>
              <p className="text-gray-500 text-sm mt-1">Theo dõi trạng thái và thanh toán các buổi học của bạn</p>
            </div>
            <button
              onClick={() => navigate("/tutors")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-200"
            >
              + Đặt lịch mới
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <p className="text-amber-700 text-xs font-bold">Đang giữ ký quỹ</p>
              </div>
              <p className="text-2xl font-extrabold text-amber-700">{formatPrice(totalEscrow)}</p>
              <p className="text-amber-500 text-xs mt-0.5">Sẽ chuyển sau khi bạn xác nhận</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-emerald-700 text-xs font-bold">Đã thanh toán</p>
              </div>
              <p className="text-2xl font-extrabold text-emerald-700">{formatPrice(totalPaid)}</p>
              <p className="text-emerald-500 text-xs mt-0.5">Đã chuyển thành công cho gia sư</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-700 text-xs font-bold">Sắp diễn ra</p>
              </div>
              <p className="text-2xl font-extrabold text-blue-700">{bookings.filter((b) => b.status === "upcoming").length} buổi</p>
              <p className="text-blue-500 text-xs mt-0.5">Trong tuần này</p>
            </div>
          </div>

          {/* Escrow explainer */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Cơ chế thanh toán ký quỹ (Escrow) của StudyHub</p>
              <p className="text-blue-200 text-xs mt-1 leading-relaxed">
                Tiền của bạn được giữ an toàn bởi StudyHub và <strong className="text-white">chỉ chuyển cho gia sư sau khi bạn xác nhận hoàn thành buổi học</strong>. Nếu có tranh chấp, đội ngũ hỗ trợ sẽ can thiệp ngay lập tức.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all ${activeFilter === f.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
              >
                {f.label}
                {f.count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === f.key ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-semibold">Không có lịch học nào</p>
          </div>
        ) : (
          visible.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onConfirm={handleConfirm}
              onDispute={handleDispute}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}