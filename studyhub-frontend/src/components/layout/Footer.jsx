export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              123 Đường Giáo Dục, TP. Hồ Chí Minh
            </div>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              xin chao@studyhub.vn
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +84 (0) 123 456 789
            </div>
          </div>
          <div>
            <ul className="flex flex-col gap-2 md:items-end">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Điều khoản dịch vụ</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Chính sách cookie</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">© {new Date().getFullYear()} StudyHub. All rights reserved.</div>
      </div>
    </footer>
  );
}
// ...existing code...