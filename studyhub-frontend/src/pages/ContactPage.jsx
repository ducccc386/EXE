import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageHeader } from "../components/shared";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bg: "bg-orange-500",
    label: "Địa chỉ",
    value: "123 Đường Giáo Dục, TP. Hồ Chí Minh",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bg: "bg-blue-600",
    label: "Email",
    value: "xinchaostudyhub.vn",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    bg: "bg-green-500",
    label: "Điện thoại",
    value: "+84 (0) 123 456 789",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-purple-500",
    label: "Giờ làm việc",
    value: "Thứ 2 - Thứ 6: 8:00 - 20:00",
  },
];

const faqs = [
  { q: "Làm sao để tìm gia sư?", a: "Chỉ cần tìm kiếm theo môn học, lọc theo lịch rảnh và ngân sách, sau đó đặt lịch trực tiếp với gia sư bạn chọn." },
  { q: "StudyHub có miễn phí không?", a: "Đăng ký và tìm kiếm gia sư hoàn toàn miễn phí. Bạn chỉ trả tiền khi đặt buổi học." },
  { q: "Tôi có thể đổi gia sư không?", a: "Hoàn toàn có thể! Bạn có thể đổi gia sư bất cứ lúc nào mà không mất thêm phí." },
  { q: "Học trực tuyến hoạt động như thế nào?", a: "Các buổi học diễn ra trên bảng trắng tương tác với hỗ trợ video, âm thanh và chia sẻ màn hình." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <PageHeader
        tag="Liên hệ với chúng tôi"
        title="Liên hệ"
        description="Bạn có câu hỏi hoặc muốn hợp tác? Chúng tôi rất muốn nghe từ bạn. Đội ngũ thường phản hồi trong vòng 24 giờ."
      />

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 mt-10 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((info, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
              <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                {info.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{info.label}</p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">Fill in the form and we'll get back to you as soon as possible.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">Thanks for reaching out. We'll reply within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-blue-600 font-semibold text-sm hover:text-orange-500 transition-colors">
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Full Name</label>
                    <input type="text" required placeholder="Nguyễn Văn A" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Email Address</label>
                    <input type="email" required placeholder="nguyenvana@email.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                    <option value="">Select a topic...</option>
                    <option>General Inquiry</option>
                    <option>Become a Tutor</option>
                    <option>Partnership</option>
                    <option>Technical Support</option>
                    <option>Billing & Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Message</label>
                  <textarea required rows={5} placeholder="Viết nội dung tin nhắn..." value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
                </div>

                <button type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-orange-200 active:scale-95 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Map + Social */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl overflow-hidden relative min-h-64 flex items-center justify-center border border-blue-100">
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="font-bold text-blue-700 mb-1">123 Education Street</p>
                <p className="text-blue-500 text-sm">Learning City, LC 10001</p>
                <a href="#" className="mt-4 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">View on Google Maps →</a>
              </div>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Facebook", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600", letter: "f" },
                  { name: "Instagram", color: "hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600", letter: "ig" },
                  { name: "Twitter/X", color: "hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800", letter: "x" },
                  { name: "LinkedIn", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700", letter: "in" },
                ].map((s, i) => (
                  <a key={i} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 text-gray-500 text-sm font-semibold transition-all ${s.color}`}>
                    <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold uppercase">{s.letter}</span>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group">
                  <span className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all ${openFaq === i ? "bg-orange-500 rotate-45" : "bg-gray-100"}`}>
                    <svg className={`w-4 h-4 ${openFaq === i ? "text-white" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Still have questions? We're here to help!</h2>
          <p className="text-blue-100 mb-8">Join thousands of students already learning with StudyHub.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-orange-300 active:scale-95">Get Started Free</a>
            <a href="#" className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all">Browse Tutors</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}