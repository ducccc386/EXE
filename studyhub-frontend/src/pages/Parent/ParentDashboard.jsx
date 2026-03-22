import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import LearningAssessment from "./LearningAssessment";

export default function ParentDashboard() {
    const [activeTab, setActiveTab] = useState('classes');
    const [selectedClass, setSelectedClass] = useState(null); // Lưu lớp đang chọn để hiện Popup
    const user = JSON.parse(localStorage.getItem("user"));

    const myClasses = [
        {
            id: 1,
            subject: "Toán lớp 10 - Ôn thi học kỳ",
            status: "Đang diễn ra",
            tutor: "Trần Trung",
            phone: "0901 234 567",
            email: "trantrung.tutor@company.com",
            schedule: "Thứ 2, Thứ 4 (19:00 - 21:00)",
            location: "Quận 10, TP.HCM",
            price: "250.000đ/buổi",
            description: "Tập trung vào giải đề thi giữa kỳ và cuối kỳ. Cải thiện kỹ năng giải toán hình học không gian.",
            progress: "60%"
        },
        {
            id: 2,
            subject: "Tiếng Anh Giao tiếp",
            status: "Đang tìm gia sư",
            tutor: "Đang cập nhật...",
            phone: "N/A",
            email: "N/A",
            schedule: "Thứ 7, Chủ nhật (09:00 - 11:00)",
            location: "Trực tuyến (Online)",
            price: "300.000đ/buổi",
            description: "Yêu cầu gia sư có chứng chỉ IELTS 7.0 trở lên, phát âm chuẩn. Tập trung vào phản xạ nghe nói.",
            progress: "0%"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a] relative">
            <Navbar />

            <div className="flex flex-1">
                {/* SIDEBAR - Giữ nguyên */}
                <aside className="w-72 bg-zinc-900/50 border-r border-white/5 flex flex-col p-6 sticky top-[116px] h-[calc(100vh-116px)]">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 italic">StudyHub Management</p>
                    <nav className="space-y-2">
                        {['classes', 'assessment', 'payment'].map((id) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === id ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-gray-400 hover:bg-white/5"
                                    }`}
                            >
                                <span>{id === 'classes' ? '📚' : id === 'assessment' ? '📊' : '💳'}</span>
                                <span className="text-sm">{id === 'classes' ? 'Lớp học của con' : id === 'assessment' ? 'Đánh giá học tập' : 'Thanh toán'}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {activeTab === 'classes' && (
                        <div className="animate-in fade-in duration-500">
                            <h1 className="text-3xl font-black italic text-white uppercase mb-10 tracking-tighter">
                                Quản lý <span className="text-orange-500">Lớp học</span>
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myClasses.map((cls) => (
                                    <div
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls)}
                                        className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] hover:border-orange-500/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${cls.status === "Đang diễn ra" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                                                }`}>
                                                {cls.status}
                                            </span>
                                            <p className="text-white font-black text-sm">{cls.price}</p>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{cls.subject}</h3>
                                        <p className="text-sm text-gray-500">📅 {cls.schedule}</p>
                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <button className="w-full bg-white/5 hover:bg-orange-500 text-white text-xs font-black py-3 rounded-xl transition-all uppercase">
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'assessment' && <LearningAssessment />}
                </main>
            </div>

            {/* POPUP MODAL */}
            {selectedClass && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    {/* Lớp nền mờ */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedClass(null)}
                    ></div>

                    {/* Nội dung Popup */}
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-[40px] p-8 relative z-10 animate-in zoom-in-95 duration-300 shadow-2xl">
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white text-2xl"
                        >
                            ✕
                        </button>

                        <div className="mb-8">
                            <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">Chi tiết lớp học #{selectedClass.id}</p>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                                {selectedClass.subject}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Gia sư phụ trách</p>
                                    <p className="text-white font-bold">{selectedClass.tutor}</p>
                                    <p className="text-xs text-gray-400 italic">{selectedClass.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Thời gian học</p>
                                    <p className="text-white font-bold">{selectedClass.schedule}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Địa điểm / Hình thức</p>
                                    <p className="text-white font-bold">{selectedClass.location}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Tiến độ giáo trình</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                                            <div className="bg-orange-500 h-full" style={{ width: selectedClass.progress }}></div>
                                        </div>
                                        <span className="text-xs font-black text-white">{selectedClass.progress}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 mb-8">
                            <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Mục tiêu học tập</p>
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                "{selectedClass.description}"
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-500/20 uppercase text-xs">
                                Liên hệ gia sư
                            </button>
                            <button
                                onClick={() => setSelectedClass(null)}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl transition-all uppercase text-xs"
                            >
                                Đóng cửa sổ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}