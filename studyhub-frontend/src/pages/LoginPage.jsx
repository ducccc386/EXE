import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
    const navigate = useNavigate();
    // formData sẽ khớp với LoginRequest DTO bên phía Spring Boot
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Gọi API đăng nhập tới AuthController của Spring Boot
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Lưu thông tin người dùng và token vào localStorage
                localStorage.setItem("user", JSON.stringify(data));

                // Điều hướng dựa trên role trả về từ database (ADMIN, TUTOR, PARENT)
                const userRole = data.role;

                if (userRole === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (userRole === "TUTOR") {
                    navigate("/tutor/dashboard");
                } else if (userRole === "PARENT") {
                    navigate("/parent/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                // Hiển thị lỗi từ RuntimeException của Backend (sai pass, bị ban...)
                setError(data || "Đăng nhập thất bại. Vui lòng kiểm tra lại!");
            }
        } catch (err) {
            setError("Lỗi kết nối tới máy chủ. Vui lòng thử lại sau!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 py-12">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">StudyMate</h1>
                        <p className="text-gray-400 text-sm mt-2 font-medium">Kết nối tri thức, nâng bước tương lai</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-sm font-bold text-gray-700">Mật khẩu</label>
                                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-800">Quên mật khẩu?</a>
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl animate-pulse">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4 flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : "ĐĂNG NHẬP"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Bạn là người mới?{" "}
                            <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 transition-colors underline underline-offset-4">
                                Đăng ký tài khoản
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}