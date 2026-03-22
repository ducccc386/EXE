import { Navigate } from "react-router-dom";

// allowedRoles: Danh sách các vai trò được phép vào trang (ví dụ: ["ADMIN"])
const ProtectedRoute = ({ children, allowedRoles }) => {
    // Lấy thông tin user từ localStorage (đã lưu lúc đăng nhập)
    const user = JSON.parse(localStorage.getItem("user"));

    // 1. Kiểm tra xem đã đăng nhập chưa
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Kiểm tra xem vai trò có khớp không
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Nếu không đúng quyền (ví dụ Parent cố vào Admin), đẩy về trang chủ hoặc trang lỗi
        return <Navigate to="/" replace />;
    }

    // 3. Nếu thỏa mãn hết thì cho vào trang
    return children;
};

export default ProtectedRoute;