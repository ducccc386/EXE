import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageHeader } from "../components/shared";

const news = [
  {
    id: 1,
    category: "Mẹo học tập",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "5 Phương pháp học tập đã được chứng minh giúp cải thiện kết quả học tập",
    excerpt: "Khám phá các phương pháp học tập hiệu quả nhất được học sinh giỏi trên toàn thế giới áp dụng. Từ kỹ thuật lặp lại ngắt quãng đến Pomodoro, những chiến lược này sẽ thay đổi cách bạn học.",
    author: "Quản trị viên",
    date: "10/03/2025",
    readTime: "5 phút đọc",
    featured: true,
  },
  {
    id: 2,
    category: "Tin tức nền tảng",
    categoryColor: "bg-blue-100 text-blue-600",
    title: "StudyHub Nay Cung Cấp Học 1 Kèm 1 Trong Hơn 50 Môn Học",
    excerpt: "Chúng tôi vui mừng thông báo mở rộng mạng lưới gia sư. Học viên hiện có thể tìm gia sư chuyên gia trong nhiều môn học hơn bao giờ hết.",
    author: "Quản trị viên",
    date: "08/03/2025",
    readTime: "3 phút đọc",
    featured: false,
  },
  {
    id: 3,
    category: "Học viên thành công",
    categoryColor: "bg-green-100 text-green-600",
    title: "Câu chuyện của Ngọc Anh: Từ điểm Yếu lên Giỏi Toán chỉ trong 3 tháng",
    excerpt: "Đọc câu chuyện cải thiện học tập đáng kinh ngạc của Ngọc Anh với sự hỗ trợ của gia sư tận tâm từ StudyHub.",
    author: "Quản trị viên",
    date: "05/03/2025",
    readTime: "6 phút đọc",
    featured: false,
  },
  {
    id: 4,
    category: "Mẹo học tập",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "Cách chọn gia sư phù hợp với phong cách học tập của bạn",
    excerpt: "Không phải gia sư nào cũng dạy giống nhau, và không phải học viên nào cũng học theo cách giống nhau. Đây là hướng dẫn toàn diện để tìm gia sư hoàn hảo cho bạn.",
    author: "Quản trị viên",
    date: "03/03/2025",
    readTime: "4 phút đọc",
    featured: false,
  },
  {
    id: 5,
    category: "Tin tức nền tảng",
    categoryColor: "bg-blue-100 text-blue-600",
    title: "Ra mắt tính năng Bảng trắng tương tác 2.0 mới",
    excerpt: "Bảng trắng nâng cấp hỗ trợ vẽ nhiều người dùng, phương trình LaTeX, tô sáng code và công cụ cộng tác thời gian thực.",
    author: "Quản trị viên",
    date: "28/02/2025",
    readTime: "3 phút đọc",
    featured: false,
  },
  {
    id: 6,
    category: "Giáo dục",
    categoryColor: "bg-purple-100 text-purple-600",
    title: "Tương lai của Giáo dục Trực tuyến: Xu hướng cần theo dõi năm 2025",
    excerpt: "Gia sư hỗ trợ AI, lớp học VR và lộ trình học cá nhân hóa đang định hình lại nền giáo dục.",
    author: "Quản trị viên",
    date: "25/02/2025",
    readTime: "7 phút đọc",
    featured: false,
  },
];

const iconPaths = {
  "Mẹo học tập": "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  "Tin tức nền tảng": "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  "Học viên thành công": "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  "Giáo dục": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
};

const cardBg = { "Mẹo học tập": "bg-orange-50", "Tin tức nền tảng": "bg-blue-50", "Học viên thành công": "bg-green-50", "Giáo dục": "bg-purple-50" };
const iconBg = { "Mẹo học tập": "bg-orange-400", "Tin tức nền tảng": "bg-blue-400", "Học viên thành công": "bg-green-400", "Giáo dục": "bg-purple-400" };

const categories = ["Tất cả", "Mẹo học tập", "Tin tức nền tảng", "Học viên thành công", "Giáo dục"];

function FeaturedCard({ post }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row gap-8 items-center shadow-xl shadow-blue-200">
      <div className="flex-shrink-0 w-full md:w-64 h-48 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-400 rounded-2xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
            </svg>
          </div>
          <span className="text-white/70 text-xs">Featured Article</span>
        </div>
      </div>
      <div className="flex-1">
        <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">⭐ Nổi bật</span>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">{post.title}</h2>
        <p className="text-blue-100 text-sm leading-relaxed mb-6">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-blue-200 text-xs">
            <div className="w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <a href="#" className="bg-white text-blue-600 font-bold text-sm px-5 py-2 rounded-full hover:bg-orange-50 transition-colors">Read More →</a>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ post }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className={`${cardBg[post.category] || "bg-gray-50"} h-44 flex items-center justify-center`}>
        <div className={`w-14 h-14 ${iconBg[post.category] || "bg-gray-400"} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPaths[post.category] || iconPaths["Giáo dục"]} />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${post.categoryColor}`}>{post.category}</span>
        <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
            <span>{post.date}</span>
          </div>
          <span className="text-xs text-gray-400">{post.readTime}</span>
        </div>
        <a href="#" className="mt-4 flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-orange-500 transition-colors">
          Read More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const featured = news.find((n) => n.featured);
  const rest = news.filter((n) => !n.featured);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <PageHeader
        tag="Blog StudyHub"
        title="Tin tức & Cập nhật"
        description="Cập nhật những mẹo học tập, tin tức nền tảng và câu chuyện thành công của học viên."
      />

      <section className="max-w-7xl mx-auto px-6 pb-20">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 my-10">
          {categories.map((cat, i) => (
            <button key={i}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${i === 0 ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}>
              {cat}
            </button>
          ))}
        </div>

        {featured && <div className="mb-12"><FeaturedCard post={featured} /></div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => <NewsCard key={post.id} post={post} />)}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 font-bold px-10 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:shadow-lg hover:shadow-blue-200">
            Load More Articles
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}