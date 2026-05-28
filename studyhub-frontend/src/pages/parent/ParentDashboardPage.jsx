/**
 * pages/parent/ParentDashboardPage.jsx
 * Dashboard cho Phụ huynh
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import { createParentRequest, getSubjects } from "../../api/tutorApi";
import { ROLES } from "../../constants";

export default function ParentDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "",
    grade: "",
    budget: "",
    city: "",
    addressDetail: "",
    teachingMode: "BOTH",
    sessionsPerWeek: 2,
    scheduleInfo: ""
  });

  useEffect(() => {
    if (user?.role !== ROLES.PARENT) {
      navigate("/login");
      return;
    }

    let mounted = true;
    async function loadSubjects() {
      try {
        const subjectsData = await getSubjects();
        if (mounted && Array.isArray(subjectsData)) {
          setSubjects(subjectsData);
          if (subjectsData.length > 0) {
            setFormData(prev => ({ ...prev, subjectId: subjectsData[0].id }));
          }
        }
      } catch (err) {
        console.error("Failed to load subjects", err);
      }
    }
    loadSubjects();
    return () => (mounted = false);
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!user?.id) {
      setSubmitError("Bạn cần đăng nhập trước!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        parentId: user.id,
        ...formData,
        subjectId: parseInt(formData.subjectId),
        budget: formData.budget ? parseInt(formData.budget) : null,
        sessionsPerWeek: parseInt(formData.sessionsPerWeek)
      };

      await createParentRequest(payload);

      setSubmitSuccess(true);
      setFormData({
        title: "",
        description: "",
        subjectId: subjects[0]?.id || "",
        grade: "",
        budget: "",
        city: "",
        addressDetail: "",
        teachingMode: "BOTH",
        sessionsPerWeek: 2,
        scheduleInfo: ""
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Lỗi tạo bài đăng: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Bảng điều khiển Phụ huynh</h1>
        <p className="text-gray-600 mt-2">Chào mừng, {user?.fullName}! 👋</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Bây giờ là 18:30</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">Bắt đầu học</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Gia sư hiện tại</p>
            <p className="text-3xl font-extrabold text-orange-600 mt-2">Chưa có</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Bài đăng của tôi</p>
            <p className="text-3xl font-extrabold text-green-600 mt-2">0</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng tìm gia sư</h2>

          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              Bài đăng tạo thành công! Gia sư sẽ thấy bài đăng của bạn sớm thôi.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="VD: Tìm gia sư Toán lớp 10"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Môn học <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">-- Chọn môn học --</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lớp/Khối <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="VD: Lớp 10, IELTS 6.5"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ngân sách/buổi (VND)</label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="VD: 250000"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thành phố <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="VD: Hà Nội, TP.HCM"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Chế độ dạy <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.teachingMode}
                  onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="BOTH">Cả hai (Online & Trực tiếp)</option>
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Trực tiếp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buổi/tuần <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  required
                  min="1"
                  max="7"
                  value={formData.sessionsPerWeek}
                  onChange={(e) => setFormData({ ...formData, sessionsPerWeek: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ chi tiết</label>
                <input
                  type="text"
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  placeholder="VD: Q.1, Tú Xương"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả chi tiết <span className="text-red-500">*</span></label>
              <textarea
                required
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả nhu cầu của bạn, mục tiêu học, trình độ hiện tại, v.v..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Thông tin lịch học</label>
              <input
                type="text"
                value={formData.scheduleInfo}
                onChange={(e) => setFormData({ ...formData, scheduleInfo: e.target.value })}
                placeholder="VD: Thứ 3, 4, 5 từ 18h-20h"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Đang đăng..." : "Đăng bài tuyển gia sư"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
