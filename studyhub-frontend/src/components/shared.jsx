export function Squiggly({ color = "#3B82F6", className = "" }) {
  return (
    <svg viewBox="0 0 80 20" fill="none" className={className}>
      <path
        d="M2 10 C10 2, 18 18, 26 10 C34 2, 42 18, 50 10 C58 2, 66 18, 74 10"
        stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}

export function Triangle({ color = "#F97316", className = "" }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" className={className}>
      <path d="M20 3L37 33H3L20 3Z" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

export function Diamond({ color = "#3B82F6", className = "" }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className}>
      <rect x="4" y="4" width="22" height="22" rx="3" stroke={color} strokeWidth="3" fill="none" transform="rotate(45 15 15)" />
    </svg>
  );
}

export function PageHeader({ tag, title, description }) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-14 relative overflow-hidden">
      <Squiggly color="#F97316" className="absolute top-8 left-12 w-16 opacity-60" />
      <Squiggly color="#3B82F6" className="absolute bottom-6 right-16 w-14 opacity-50" />
      <div className="absolute top-4 right-24 w-20 h-20 bg-orange-100 rounded-full opacity-60 blur-2xl" />
      <div className="absolute bottom-0 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-50 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
          {tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{title}</h1>
        {description && (
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{description}</p>
        )}
      </div>
    </section>
  );
}