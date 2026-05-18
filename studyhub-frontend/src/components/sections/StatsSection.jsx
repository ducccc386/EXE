/**
 * StatsSection.jsx
 * Đổi background từ blue-600 sang gradient tối (charcoal) để không clash
 * với orange CTA. Blue stats strip trông như "brand color" riêng nhưng
 * thực ra làm confuse với secondary color.
 */
const stats = [
  { value: "870+",    label: "Gia sư chuyên nghiệp", icon: "👨‍🏫" },
  { value: "20.000+", label: "Giờ dạy học",           icon: "⏱️" },
  { value: "298",     label: "Môn học & khóa học",    icon: "📚" },
  { value: "72.924",  label: "Học viên đang học",      icon: "🎓" },
];

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-blue-600 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-6 py-4">
              <p className="text-3xl mb-1">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-extrabold text-white mb-1 tabular-nums">
                {stat.value}
              </p>
              <p className="text-white/75 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
