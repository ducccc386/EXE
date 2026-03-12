// =============================================
// Badge component
// =============================================
export function VerifiedBadge({ size = "sm" }) {
  const sizes = { sm: "text-xs px-2 py-0.5 gap-1", md: "text-sm px-3 py-1 gap-1.5" };
  return (
    <span className={`inline-flex items-center font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 ${sizes[size]}`}>
      <svg className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Đã xác minh
    </span>
  );
}

export function SubjectBadge({ label, colorClass = "text-blue-600 bg-blue-50" }) {
  return (
    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${colorClass}`}>
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const config = {
    escrow: { label: "Đang giữ tiền", cls: "bg-amber-50 text-amber-600 border-amber-200" },
    completed: { label: "Hoàn thành", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    upcoming: { label: "Sắp diễn ra", cls: "bg-blue-50 text-blue-600 border-blue-200" },
    dispute: { label: "Đang khiếu nại", cls: "bg-red-50 text-red-600 border-red-200" },
  };
  const { label, cls } = config[status] || config.upcoming;
  return (
    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

// =============================================
// StarRating component
// =============================================
export function StarRating({ rating, count, size = "sm" }) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={`${starSize} ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className={`font-bold text-gray-800 ${size === "sm" ? "text-xs" : "text-sm"}`}>{rating}</span>
      {count !== undefined && (
        <span className={`text-gray-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>({count} đánh giá)</span>
      )}
    </div>
  );
}

// =============================================
// Avatar component
// =============================================
export function Avatar({ initials, bg = "bg-blue-500", size = "md" }) {
  const sizes = { sm: "w-9 h-9 text-sm", md: "w-12 h-12 text-base", lg: "w-20 h-20 text-2xl", xl: "w-28 h-28 text-3xl" };
  return (
    <div className={`${sizes[size]} ${bg} rounded-full flex items-center justify-center text-white font-extrabold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// =============================================
// Price formatter
// =============================================
export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}