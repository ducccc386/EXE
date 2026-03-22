import React, { useState } from 'react';
import Navbar from "../../components/Navbar";

export default function TutorDashboard() {
    const [activeTab, setActiveTab] = useState('my-classes');

    const tutorMenu = [
        { id: 'my-classes', label: 'Lớp học của tôi', icon: '👨‍🏫' },
        { id: 'find-jobs', label: 'Tìm lớp mới', icon: '🔍' },
        { id: 'schedule', label: 'Lịch dạy tuần này', icon: '📅' },
        { id: 'earnings', label: 'Thu nhập & Đối soát', icon: '💸' },
        { id: 'profile', label: 'Hồ sơ năng lực', icon: '📄' },
    ];

    // Dữ liệu fix cứng Lớp học đang dạy
    const activeClasses = [
        {
            id: 101,
            student: "Nguyễn Thế Anh",
            subject: "Toán lớp 10",
            nextLesson: "24/03/2026 (19:00)",
            progress: "12/24 buổi",
            status: "Đang dạy"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1">
                {/* SIDEBAR GIA SƯ */}
                <aside className="w-72 bg-zinc-900/30 border-r border-white/5 p-6 sticky top-[116px] h-[calc(100vh-116px)] flex flex-col">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-8 italic">Tutor Workspace</p>

                    <nav className="space-y-2 flex-1">
                        {tutorMenu.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === item.id
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                                        : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="bg-indigo-600/10 p-4 rounded-2xl border border-indigo-500/20">
                        <p className="text-[10px] font-black text-indigo-400 uppercase">Trạng thái hồ sơ</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <p className="text-xs text-white font-bold tracking-tight text-nowrap">Đã xác minh eKYC</p>
                        </div>
                    </div>
                </aside>

                {/* NỘI DUNG CHÍNH */}
                <main className="flex-1 p-10 overflow-y-auto">
                    {activeTab === 'my-classes' && (
                        <section className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-between items-center mb-10">
                                <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none">
                                    Lớp học <span className="text-indigo-500">Đang dạy</span>
                                </h1>
                                <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
                                    <p className="text-[10px] font-black text-gray-500 uppercase">Tổng số giờ dạy</p>
                                    <p className="text-xl font-black text-white">48h</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {activeClasses.map((cls) => (
                                    <div key={cls.id} className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] hover:border-indigo-500/40 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>

                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">{cls.subject}</p>
                                                <h3 className="text-2xl font-bold text-white tracking-tight">{cls.student}</h3>
                                            </div>
                                            <span className="bg-indigo-500 text-[10px] font-black px-3 py-1 rounded-full uppercase italic">
                                                {cls.status}
                                            </span>
                                        </div>

                                        <div className="space-y-4 mb-8 relative z-10">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-bold">📅 Buổi học kế tiếp:</span>
                                                <span className="text-white font-black tracking-tight">{cls.nextLesson}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                                                    <span>Tiến độ khóa học</span>
                                                    <span>{cls.progress}</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-500 h-full w-[50%]"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 relative z-10">
                                            <button className="flex-1 bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase hover:bg-indigo-500 hover:text-white transition-all">
                                                Ghi chú buổi học
                                            </button>
                                            <button className="flex-1 bg-white/5 text-white font-black py-4 rounded-2xl text-[10px] uppercase border border-white/5 hover:bg-white/10 transition-all">
                                                Báo cáo định kỳ
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Card Thêm lớp (Dạng Dash/Border) */}
                                <button className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-8 hover:bg-white/5 hover:border-indigo-500/20 transition-all group">
                                    <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">➕</span>
                                    <p className="font-black uppercase text-[10px] text-gray-500 tracking-widest">Tìm thêm lớp mới</p>
                                </button>
                            </div>
                        </section>
                    )}

                    {activeTab === 'earnings' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <p className="text-5xl">💰</p>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Số dư: 12.500.000 VNĐ</h2>
                            <button className="bg-green-600 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-green-900/20">Rút tiền về ví</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}