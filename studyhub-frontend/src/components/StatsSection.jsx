const stats = [
  { value: "870", label: "Expert tutors" },
  { value: "20,000+", label: "Hours tutored" },
  { value: "298", label: "Subject and courses" },
  { value: "72,924", label: "Active students" },
];

export default function StatsSection() {
  return (
    <section className="bg-blue-600 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-blue-500">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-6 py-2">
              <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}