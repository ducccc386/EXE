function ScheduleBlock({ reverse }) {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
      {/* Image side */}
      <div className="flex-1 relative">
        <div className="relative z-10 flex gap-4 justify-center">
          <div className={`w-52 h-64 rounded-3xl ${reverse ? "bg-gradient-to-br from-orange-100 to-amber-200" : "bg-gradient-to-br from-blue-100 to-blue-200"} flex items-center justify-center shadow-lg`}>
            <div className="text-center">
              <div className={`w-20 h-20 ${reverse ? "bg-orange-400" : "bg-blue-400"} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className={`text-xs font-bold ${reverse ? "text-orange-700" : "text-blue-700"}`}>Expert Tutor</span>
            </div>
          </div>

          <div className={`w-44 h-52 rounded-3xl ${reverse ? "bg-gradient-to-br from-blue-100 to-indigo-200" : "bg-gradient-to-br from-amber-100 to-orange-200"} flex items-center justify-center shadow-lg mt-10`}>
            <div className="text-center">
              <div className={`w-16 h-16 ${reverse ? "bg-indigo-400" : "bg-amber-400"} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`text-xs font-bold ${reverse ? "text-indigo-700" : "text-amber-700"}`}>Schedule</span>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className={`absolute top-0 ${reverse ? "right-0" : "left-0"} w-20 h-20 ${reverse ? "bg-orange-100" : "bg-blue-100"} rounded-full blur-xl opacity-70`}></div>
      </div>

      {/* Text side */}
      <div className="flex-1 max-w-lg">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
          Customize With Your Schedule
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          Personalized Professional Online Tutor On Your Schedule
        </h2>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          Our scheduling system allows you to select based on your free time. Keep track of your students' class tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility.
        </p>
        <a
          href="#"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-orange-200 active:scale-95 text-sm"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default function ScheduleSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <ScheduleBlock reverse={false} />
        <div className="border-t border-gray-100"></div>
        <ScheduleBlock reverse={true} />
      </div>
    </section>
  );
}