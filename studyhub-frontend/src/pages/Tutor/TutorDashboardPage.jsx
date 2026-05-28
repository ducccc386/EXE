/**
 * pages/Tutor/TutorDashboardPage.jsx
 * Dashboard tổng quan cho Gia sư
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import { getOpenRequests, applyToJob, getMyProfile, updateMyProfile, updateMySubjects, getSubjects } from "../../api/tutorApi";
import { transformTutorProfile, transformParentRequest } from "../../utils/dataTransform";

export default function TutorDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [openRequests, setOpenRequests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Form states
  const [formData, setFormData] = useState({
    bio: "",
    education: "",
    experienceYears: 0,
    teachingMethod: "",
    hourlyRate: 0,
    city: "",
    teachingMode: "BOTH"
  });

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    let mounted = true;
    async function loadData() {
      try {
        setLoading(true);

        // Lấy hồ sơ gia sư hiện tại
        const profileData = await getMyProfile(user.id);
        if (mounted && profileData) {
          setProfile(profileData);
          setFormData({
            bio: profileData.bio || "",
            education: profileData.education || "",
            experienceYears: profileData.experienceYears || 0,
            teachingMethod: profileData.teachingMethod || "",
            hourlyRate: profileData.hourlyRate || 0,
            city: profileData.city || "",
            teachingMode: profileData.teachingMode || "BOTH"
          });
        }

        // Lấy danh sách bài đăng đang mở
        const jobsData = await getOpenRequests();
        if (mounted && Array.isArray(jobsData)) {
          setOpenRequests(jobsData.map(r => transformParentRequest(r)));
        }

        // Lấy danh sách môn học
        const subjectsData = await getSubjects();
        if (mounted && Array.isArray(subjectsData)) {
          setSubjects(subjectsData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => (mounted = false);
  }, [user, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userId: user.id,
        ...formData
      };
      await updateMyProfile(payload);
      alert("Cập nhật hồ sơ thành công!");
    } catch (err) {
      alert("Lỗi cập nhật hồ sơ: " + err.message);
    }
  };

  const handleUpdateSubjects = async () => {
    try {
      await updateMySubjects({
        tutorProfileId: profile.id,
        subjectIds: selectedSubjects
      });
      alert("Cập nhật môn học thành công!");
    } catch (err) {
      alert("Lỗi cập nhật môn học: " + err.message);
    }
  };

  const handleApplyJob = async (requestId) => {
    try {
      await applyToJob({
        requestId,
        tutorProfileId: profile.id,
        message: "Tôi rất hứng thú với lớp học này và sẵn sàng tham gia!"
      });
      alert("Ứng tuyển thành công! Vui lòng chờ phụ huynh phản hồi.");
    } catch (err) {
      alert("Lỗi ứng tuyển: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        { /* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Bảng điều khiển Gia sư</h1>
          <p className="text-gray-600 mt-2">Chào mừng, {user?.fullName}! 👋</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          { /* Left: Profile Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cập nhật hồ sơ</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Giới thiệu</label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Viết về bản thân..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Học vấn</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="VD: Cử nhân Toán - ĐH KHTN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kinh nghiệm (năm)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Giá/giờ (VND)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Thành phố</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Chế độ dạy</label>
                  <select
                    value={formData.teachingMode}
                    onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="BOTH">Cả hai (Online & Trực tiếp)</option>
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Trực tiếp</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Lưu thay đổi
                </button>
              </form>
            </div>

            { /* Select Subjects */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn môn học</h2>
              <div className="space-y-2">
                {subjects.map(subject => (
                  <label key={subject.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSubjects([...selectedSubjects, subject.id]);
                        } else {
                          setSelectedSubjects(selectedSubjects.filter(id => id !== subject.id));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{subject.name}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleUpdateSubjects}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Cập nhật
              </button>
            </div>
          </div>

          { /* Right: Job Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Bài đăng tuyển gia sư ({openRequests.length})
              </h2>

              {openRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Chưa có bài đăng nào. Hãy kiểm tra lại sau!</p>
              ) : (
                <div className="space-y-4">
                  {openRequests.map(request => (
                    <div key={request.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full">
                          {request.status}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{request.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                        <p>📍 {request.city}</p>
                        <p>💰 {request.budget?.toLocaleString()} VND/buổi</p>
                        <p>📚 {request.grade}</p>
                        <p>📅 {request.sessionsPerWeek} buổi/tuần</p>
                      </div>

                      <button
                        onClick={() => handleApplyJob(request.id)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors"
                      >
                        Ứng tuyển
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
