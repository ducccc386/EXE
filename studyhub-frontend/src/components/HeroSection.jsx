import { Squiggly, Triangle, Diamond } from "./shared";

export default function HeroSection() {
  return (
    <section className="bg-white overflow-hidden relative">
      <div className="absolute top-8 left-6 w-3 h-3 bg-orange-400 rounded-full opacity-70" />
      <div className="absolute top-14 left-14 w-2 h-2 bg-blue-400 rounded-full opacity-60" />
      <Squiggly color="#F97316" className="absolute top-1/3 left-4 w-12 opacity-50 rotate-90" />
      <Triangle color="#3B82F6" className="absolute bottom-10 left-8 w-8 opacity-40" />
      <div className="absolute top-6 right-20 w-20 h-20 bg-amber-100 rounded-full opacity-80 z-0" />
      <Diamond color="#F97316" className="absolute top-8 right-10 w-6 opacity-50" />
      <Squiggly color="#3B82F6" className="absolute bottom-8 right-6 w-14 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 max-w-xl">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 block">
            Cam kết hài lòng 100%
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Tìm Gia Sư{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Phù Hợp</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8.5C60 3 120 1 180 4.5C220 7 260 9 298 6" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            <span>✏️</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 mt-6">
            Chúng tôi giúp bạn tìm gia sư phù hợp cho các buổi học 1-1.
            <br />
            Hoàn toàn <span className="text-orange-500 font-semibold">miễn phí</span> &amp; <span className="text-blue-600 font-semibold">riêng tư</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-orange-200 active:scale-95 text-sm">
              Bắt đầu ngay
            </a>
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors shadow-md">
                <svg className="w-4 h-4 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                Xem cách hoạt động
              </span>
            </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="absolute bottom-6 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-70 z-0"></div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-blue-50 rounded-3xl overflow-hidden h-52 w-44 flex items-end justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-blue-700">Gia sư Toán</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-3xl overflow-hidden h-52 w-44 mt-6 flex items-end justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-orange-700">Chuyên gia Lý</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-3xl overflow-hidden h-52 w-44 -mt-4 flex items-end justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">Gia sư Ngoại ngữ</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-3xl overflow-hidden h-52 w-44 flex items-end justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-700">Mentor Lập trình</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Được đánh giá cao</p>
              <p className="text-xs text-gray-500">4.9/5 từ học viên</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}