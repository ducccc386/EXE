import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const HELP_SECTIONS = [
  {
    id: "become",
    title: "Trở Thành Một StudyMate",
    content: [
      "Để tạo hồ sơ gia sư, vào Profile và điền thông tin đầy đủ.",
      "Thiết lập khu vực dạy, trạng thái online và lịch trống.",
      "Thêm thành tích, bằng cấp và mô tả rõ ràng để tăng độ tin cậy.",
    ],
  },
  {
    id: "profile",
    title: "Thay Đổi Thông Tin Cá Nhân",
    content: [
      "Bạn có thể cập nhật tên, email và mô tả cá nhân tại Profile.",
      "Khi đổi mật khẩu, cần đúng định dạng bảo mật hệ thống.",
      "Sau khi lưu, hệ thống sẽ thông báo xác nhận thành công.",
    ],
  },
  {
    id: "events",
    title: "Thêm Sự Kiện",
    content: [
      "Mở tab Calendar để tạo sự kiện học tập mới.",
      "Điền tiêu đề, thời gian bắt đầu và kết thúc trong cùng ngày.",
      "Sự kiện sẽ hiển thị ngay sau khi bấm Lưu.",
    ],
  },
  {
    id: "chat",
    title: "Sử Dụng Chat",
    content: [
      "Vào mục Chat để trao đổi trực tiếp với phụ huynh/gia sư.",
      "Bạn có thể gửi lịch học, bài tập và tài liệu trong cuộc hội thoại.",
      "Giữ ngôn ngữ chuyên nghiệp để tăng trải nghiệm người dùng.",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sticky top-24 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Help Menu</h2>
              <div className="space-y-2">
                {HELP_SECTIONS.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${idx === 0 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-6">
            {HELP_SECTIONS.map((section) => (
              <section id={section.id} key={section.id} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{section.title}</h1>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  {section.content.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
