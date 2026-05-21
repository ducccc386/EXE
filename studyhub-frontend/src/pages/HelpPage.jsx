import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useLanguage } from "../hooks/usePreferences";

const HELP_SECTIONS = [
  {
    id: "become",
    title: { vi: "Trở Thành Một StudyMate", en: "Become a StudyMate" },
    content: {
      vi: ["Để tạo hồ sơ gia sư, vào Profile và điền thông tin đầy đủ.", "Thiết lập khu vực dạy, trạng thái online và lịch trống.", "Thêm thành tích, bằng cấp và mô tả rõ ràng để tăng độ tin cậy."],
      en: ["Open Profile and complete your tutor information.", "Set your teaching area, online status, and availability.", "Add achievements, degrees, and a clear bio to build trust."],
    },
  },
  {
    id: "profile",
    title: { vi: "Thay Đổi Thông Tin Cá Nhân", en: "Update Personal Information" },
    content: {
      vi: ["Bạn có thể cập nhật tên, email và mô tả cá nhân tại Profile.", "Khi đổi mật khẩu, cần đúng định dạng bảo mật hệ thống.", "Sau khi lưu, hệ thống sẽ thông báo xác nhận thành công."],
      en: ["You can update your name, email, and personal bio in Profile.", "Password changes must follow the security requirements.", "After saving, you will see a success confirmation."],
    },
  },
  {
    id: "chat",
    title: { vi: "Sử Dụng Chat", en: "Use Chat" },
    content: {
      vi: ["Vào mục Chat để trao đổi trực tiếp với phụ huynh/gia sư.", "Bạn có thể gửi lịch học, bài tập và tài liệu trong cuộc hội thoại.", "Giữ ngôn ngữ chuyên nghiệp để tăng trải nghiệm người dùng."],
      en: ["Use Chat to communicate directly with parents or tutors.", "You can send schedules, assignments, and materials in the conversation.", "Keep the tone professional for the best user experience."],
    },
  },
];

export default function HelpPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 sticky top-24 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">Help Menu</h2>
              <div className="space-y-2">
                {HELP_SECTIONS.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${idx === 0 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-blue-300"}`}
                  >
                    {item.title[lang]}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-6">
            {HELP_SECTIONS.map((section) => (
              <section id={section.id} key={section.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{section.title[lang]}</h1>
                <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content[lang].map((line) => (
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
