/**
 * FRONTEND IMPLEMENTATION GUIDE
 * 
 * Trạng thái hiện tại:
 * ✅ Constants được cập nhật với endpoints thực từ backend
 * ✅ authApi.js - Xóa mock, gọi backend thực
 * ✅ tutorApi.js - Hoàn chỉnh (getAllTutors, getProfile, updateProfile, apply job, etc)
 * ✅ parentApi.js - Hoàn chỉnh
 * ✅ reviewApi.js - Tạo mới
 * ✅ chatApi.js - Cập nhật khớp backend
 * ✅ adminApi.js - Cập nhật khớp backend
 * ✅ TutorListingPage - Cập nhật dùng real API + transform
 * ✅ LoginPage - Sẵn sàng (xóa mock nếu muốn)
 * 
 * CÒN CẦN LÀMTRONG PHẠM VI của bạn:
 * 
 * 1. TUTOR DASHBOARD (/tutor/dashboard)
 *    📍 src/pages/Tutor/TutorDashboardPage.jsx
 *    - Lấy profile: getMyProfile()
 *    - Lấy danh sách requests OPEN: getOpenRequests()
 *    - Hiển thị: form cập nhật hồ sơ, danh sách jobs để apply
 * 
 * 2. PARENT DASHBOARD (/parent/dashboard)
 *    📍 src/pages/parent/ParentDashboardPage.jsx
 *    - Form tạo bài đăng: createParentRequest()
 *    - Lấy danh sách bài đăng của phụ huynh
 *    - Xem danh sách ứng tuyên & accept/reject
 * 
 * 3. ADMIN DASHBOARD (/admin/dashboard)
 *    📍 src/pages/admin/AdminDashboardPage.jsx
 *    - Danh sách gia sư chờ duyệt: getAllTutorProfiles()
 *    - Danh sách bài đăng: getAllParentRequests()
 *    - Nút approve/ban
 * 
 * 4. TUTOR PROFILE PAGE (/profile)
 *    📍 src/pages/ProfilePage.jsx
 *    - Cập nhật hồ sơ: updateMyProfile()
 *    - Chọn môn học: updateMySubjects()
 *    - Hiển thị review từ frontend
 * 
 * 5. CHAT PAGE (/chat)
 *    📍 src/pages/ChatPage.jsx
 *    - getOrCreateConversation()
 *    - getUserConversations()
 *    - getChatHistory()
 *    - WebSocket để gửi tin nhắn real-time
 * 
 * CÁC MOCK FILES CẦN XÓA:
 * 🗑️ src/mocks/auth.mock.js       (dùng backend login)
 * 🗑️ src/mocks/tutors.mock.js     (dùng backend API)
 * 🗑️ src/mocks/tutors.js          (dùng backend API)
 * 🗑️ src/mocks/chat.mock.js       (dùng backend API)
 * 🗑️ src/mocks/parent.mock.js     (dùng backend API)
 * 🗑️ src/mocks/admin.mock.js      (dùng backend API)
 * 
 * CHÚ Ý QUAN TRỌNG:
 * - Backend trả về USER info nhưng cần FULL_NAME từ bảng Users
 *   → Có thể backend cần update endpoint để return User info kèm TutorProfile
 *   → Hoặc frontend call riêng User API để lấy fullName
 * 
 * - Chat sử dụng WebSocket (/ws/chat endpoint)
 *   → Tạo socket connection và subscribe to /topic/conversation/{id}
 *   → Gửi message tới /app/chat.send
 * 
 * - Cần thêm authenticate guards:
 *   📍 src/components/ProtectedRoute.jsx
 *   → Check token + role trước khi vào each page
 * 
 * NEXT STEPS:
 * 1. Cập nhật từng Dashboard page
 * 2. Cập nhật ChatPage để dùng real API + WebSocket
 * 3. Xóa tất cả mock files
 * 4. Test toàn bộ flow từ login -> apply job -> chat -> review
 */

export const IMPLEMENTATION_NOTES = {
    status: "70% hoàn thành",
    apis: "✅ Toàn bộ APIs đã sẵn sàng",
    pages_ready: ["LoginPage", "TutorListingPage"],
    pages_todo: [
        "TutorDashboardPage",
        "ParentDashboardPage",
        "AdminDashboardPage",
        "ProfilePage",
        "ChatPage"
    ],
    mocks_to_remove: [
        "auth.mock.js",
        "tutors.mock.js",
        "tutors.js",
        "chat.mock.js",
        "parent.mock.js",
        "admin.mock.js"
    ]
};
