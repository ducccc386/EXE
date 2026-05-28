/**
 * pages/admin/AdminDashboardPage.jsx
 * Dashboard tổng quan cho Admin
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllTutorProfiles,
  approveTutorProfile,
  getAllParentRequests,
  updateRequestStatus,
  updateUserStatus
} from "../../api/adminApi";
import { transformTutorProfile, transformParentRequest } from "../../utils/dataTransform";
import { ROLES } from "../../constants";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tutors"); // "tutors" | "requests"

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) {
      navigate("/login");
      return;
    }

    let mounted = true;
    async function loadData() {
      try {
        setLoading(true);

        // Lấy danh sách gia sư
        const tutorData = await getAllTutorProfiles();
        if (mounted && Array.isArray(tutorData)) {
          setTutors(tutorData.map(t => transformTutorProfile(t)));
        }

        // Lấy danh sách bài đăng
        const requestData = await getAllParentRequests();
        if (mounted && Array.isArray(requestData)) {
          setRequests(requestData.map(r => transformParentRequest(r)));
        }
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => (mounted = false);
  }, [user, navigate]);

  const handleApproveTutor = async (tutorId, status) => {
    try {
      await approveTutorProfile(tutorId, status);
      alert(`Gia sư đã được ${status === "APPROVED" ? "duyệt" : "từ chối"}!`);
      // Reload data
      const updatedTutors = await getAllTutorProfiles();
      setTutors(updatedTutors.map(t => transformTutorProfile(t)));
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleBanTutor = async (userId) => {
    if (!window.confirm("Xác nhận khóa tài khoản này?")) return;
    try {
      await updateUserStatus(userId, "BANNED");
      alert("Tài khoản đã bị khóa!");
      const updatedTutors = await getAllTutorProfiles();
      setTutors(updatedTutors.map(t => transformTutorProfile(t)));
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      await updateRequestStatus(requestId, status);
      alert(`Bài đăng đã được ${status === "CLOSED" ? "đóng" : "cập nhật"}!`);
      const updatedRequests = await getAllParentRequests();
      setRequests(updatedRequests.map(r => transformParentRequest(r)));
    } catch (err) {
      alert("Lỗi: " + err.message);
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
        <h1 className="text-4xl font-extrabold text-gray-900">Bảng điều khiển Admin</h1>
        <p className="text-gray-600 mt-2">Quản lý hệ thống & duyệt gia sư</p>

        { /* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Tổng gia sư</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">{tutors.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Chờ duyệt</p>
            <p className="text-3xl font-extrabold text-orange-600 mt-2">
              {tutors.filter(t => !t.verified).length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Bài đăng</p>
            <p className="text-3xl font-extrabold text-green-600 mt-2">{requests.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Đang mở</p>
            <p className="text-3xl font-extrabold text-purple-600 mt-2">
              {requests.filter(r => r.status === "OPEN").length}
            </p>
          </div>
        </div>

        { /* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("tutors")}
              className={`px-6 py-4 font-bold transition-colors ${activeTab === "tutors"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Gia sư ({tutors.length})
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-6 py-4 font-bold transition-colors ${activeTab === "requests"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Bài đăng ({requests.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === "tutors" && (
              <div className="space-y-4">
                {tutors.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Không có gia sư nào</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Tên</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Thành phố</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Học phí</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Rating</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Trạng thái</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {tutors.map(tutor => (
                          <tr key={tutor.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{tutor.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{tutor.city}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {tutor.hourlyRate?.toLocaleString()} đ
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {tutor.rating || 0}/5 ({tutor.reviewCount})
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${tutor.verified
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                                }`}>
                                {tutor.verified ? "Đã duyệt" : "Chờ duyệt"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm space-x-2">
                              {!tutor.verified && (
                                <button
                                  onClick={() => handleApproveTutor(tutor.id, "APPROVED")}
                                  className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700"
                                >
                                  Duyệt
                                </button>
                              )}
                              <button
                                onClick={() => handleBanTutor(tutor.userId)}
                                className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                              >
                                Khóa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-4">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Không có bài đăng nào</p>
                ) : (
                  <div className="space-y-3">
                    {requests.map(request => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900">{request.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${request.status === "OPEN"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                            }`}>
                            {request.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{request.description}</p>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="mr-4">📍 {request.city}</span>
                            <span>💰 {request.budget?.toLocaleString()} VND</span>
                          </div>
                          {request.status === "OPEN" && (
                            <button
                              onClick={() => handleUpdateRequestStatus(request.id, "CLOSED")}
                              className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700"
                            >
                              Đóng
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
