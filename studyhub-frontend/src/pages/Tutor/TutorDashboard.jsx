import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function TutorDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isReported, setIsReported] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '🏠' },
        { id: 'schedule', label: 'Lịch dạy & Lớp học', icon: '📅' },
        { id: 'earnings', label: 'Thu nhập & Ví tiền', icon: '💰' },
        { id: 'profile', label: 'Hồ sơ năng lực', icon: '🎓' },
    ];

    const handleReportSession = () => {
        setIsReported(true);
        alert("Báo cáo hoàn thành buổi 8 thành công! Đang chờ Phụ huynh xác nhận giải ngân.");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-indigo-500/30">
            <Navbar />

            <div className="flex flex-1 pt-[116px]">
                {/* SIDEBAR GIA SƯ - ĐỒNG BỘ STYLE VỚI PARENT */}
                <aside className="w-72 bg-black border-r border-white/5 p-6 flex flex-col sticky top-[116px] h-[calc(100vh-116px)]">
                    <div className="mb-10 px-2">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2 italic">Tutor Pro</p>
                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">StudyMate <span className="text-indigo-500">Expert</span></h2>
                    </div>

                    <nav className="space-y-3 flex-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] font-bold transition-all text-sm group ${activeTab === item.id
                                    ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-900/30 translate-x-1"
                                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className="text-xl transition-transform group-hover:scale-110">{item.icon}</span>
                                <span className="tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Quick Earnings View */}
                    <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 mt-auto shadow-2xl">
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic text-center">Số dư khả dụng</p>
                        <p className="text-2xl font-black text-white italic tracking-tighter text-center">12.500.000đ</p>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-black to-indigo-950/5">

                    {/* 1. TAB DASHBOARD (TỔNG QUAN) */}
                    {activeTab === 'dashboard' && (
                        <div className="animate-in fade-in duration-700">
                            <header className="mb-12 flex justify-between items-end">
                                <div>
                                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                        Chào, <span className="text-indigo-500 underline decoration-zinc-800 underline-offset-8">Dr. Teresa Thompson PhD</span>
                                    </h1>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 italic font-serif">Hệ thống đang vận hành ổn định • 23/03/2026</p>
                                </div>
                                <div className="bg-zinc-900 p-5 rounded-[2rem] border border-white/5 flex items-center gap-4 shadow-xl">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Đang trực tuyến</p>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div className="bg-zinc-900 p-8 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all group shadow-2xl">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Lớp đang dạy</p>
                                    <p className="text-5xl font-black text-white group-hover:scale-105 transition-transform origin-left italic font-mono">04</p>
                                </div>
                                <div className="bg-zinc-900 p-8 rounded-[3rem] border border-white/5 hover:border-green-500/30 transition-all group shadow-2xl">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Đánh giá TB</p>
                                    <p className="text-5xl font-black text-green-500 group-hover:scale-105 transition-transform origin-left italic font-mono text-shadow-sm">4.9<span className="text-sm">/5</span></p>
                                </div>
                                <div className="bg-zinc-900 p-8 rounded-[3rem] border border-white/5 hover:border-purple-500/30 transition-all group shadow-2xl">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Giờ dạy tháng này</p>
                                    <p className="text-5xl font-black text-purple-400 group-hover:scale-105 transition-transform origin-left italic font-mono">120<span className="text-sm">h</span></p>
                                </div>
                            </div>

                            {/* LỊCH DẠY & HÀNH ĐỘNG CẤP BÁCH */}
                            <div className="bg-zinc-900/80 rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                                <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Công việc cần xử lý ngay</p>
                                </div>
                                <div className="p-10 space-y-6">
                                    <div className="flex flex-col md:flex-row justify-between items-center bg-black/50 p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all group">
                                        <div className="mb-6 md:mb-0">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Toán 10 - Học sinh: Thế Anh</h3>
                                                <span className="bg-indigo-500/10 text-indigo-500 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter border border-indigo-500/20 animate-pulse">Buổi 8: Hoàn tất</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic font-serif">Thời gian: 19:00 - 21:00 • Trạng thái: Chờ báo cáo để nhận tiền</p>
                                        </div>

                                        <div className="flex gap-4">
                                            {!isReported ? (
                                                <button
                                                    onClick={handleReportSession}
                                                    className="bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black px-12 py-5 rounded-[2rem] text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-950/50 active:scale-95 italic border-2 border-indigo-600"
                                                >
                                                    Báo cáo hoàn thành
                                                </button>
                                            ) : (
                                                <button className="bg-zinc-800 text-zinc-500 font-black px-12 py-5 rounded-[2rem] text-[11px] uppercase tracking-widest cursor-default italic border border-white/5">
                                                    Đã báo cáo ✓
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. TAB THU NHẬP (QUAN TRỌNG CHO ESCROW) */}
                    {activeTab === 'earnings' && (
                        <div className="animate-in slide-in-from-right-4 duration-700">
                            <header className="mb-12 flex justify-between items-end">
                                <div>
                                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                        Ví <span className="text-indigo-500 font-serif">Thu nhập</span>
                                    </h1>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 italic font-serif underline decoration-zinc-800 underline-offset-4">StudyMate Payment Gateway v2.0</p>
                                </div>
                                <button className="bg-white hover:bg-indigo-500 hover:text-white text-black font-black px-10 py-5 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 italic font-mono">
                                    Rút tiền về ATM
                                </button>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                                {/* Tiền khả dụng */}
                                <div className="bg-zinc-900 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl group-hover:scale-110 transition-transform">💰</div>
                                    <p className="text-[11px] font-black text-zinc-500 uppercase mb-3 tracking-widest italic font-serif">Số dư khả dụng</p>
                                    <p className="text-5xl font-black text-white tracking-tighter italic font-mono">12.500.000đ</p>
                                </div>

                                {/* Tiền đang treo (Escrow) */}
                                <div className="bg-zinc-900 p-10 rounded-[3.5rem] border border-indigo-500/20 shadow-2xl relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl group-hover:rotate-12 transition-transform italic">⏳</div>
                                    <p className="text-[11px] font-black text-indigo-400 uppercase mb-3 tracking-widest italic font-serif">Đang ký quỹ (Escrow)</p>
                                    <p className="text-5xl font-black text-zinc-400 tracking-tighter italic font-mono">2.500.000đ</p>
                                    <p className="text-[9px] text-zinc-600 mt-4 font-bold uppercase tracking-tighter italic font-sans leading-relaxed">
                                        * Phụ huynh đã nạp tiền. Tiền sẽ về ví sau khi bạn dạy xong & được xác nhận.
                                    </p>
                                </div>

                                {/* Tổng tháng này */}
                                <div className="bg-zinc-900 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl group-hover:scale-110 transition-transform">📈</div>
                                    <p className="text-[11px] font-black text-green-500 uppercase mb-3 tracking-widest italic font-serif">Thu nhập tháng 03</p>
                                    <p className="text-5xl font-black text-green-500 tracking-tighter italic font-mono">15.000.000đ</p>
                                </div>
                            </div>

                            {/* BẢNG LỊCH SỬ GIẢI NGÂN CHI TIẾT */}
                            <div className="bg-zinc-900/80 rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                                <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Tiến độ giải ngân hợp đồng</p>
                                </div>
                                <div className="p-10 space-y-6">
                                    <div className="flex justify-between items-center p-8 bg-black/50 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group">
                                        <div className="flex items-center gap-8">
                                            <div className="w-16 h-16 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-3xl shadow-inner group-hover:rotate-6 transition-transform">🎯</div>
                                            <div>
                                                <p className="text-xl font-black text-white tracking-tight italic uppercase font-serif">Toán 10 - Thế Anh</p>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic font-sans">Mã HĐ: #SM-88201 • Đã dạy 8/10 buổi</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-indigo-400 italic mb-1 font-mono tracking-tighter">2.500.000đ</p>
                                            <span className="text-[9px] font-black bg-orange-600/10 text-orange-500 px-4 py-1.5 rounded-full border border-orange-500/20 uppercase italic tracking-tighter">
                                                Chờ PH xác nhận buổi 8
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CÁC TAB CÒN LẠI (PLACEHOLDER GIỐNG PARENT) */}
                    {['schedule', 'profile'].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-800 italic group">
                            <span className="text-[120px] mb-8 opacity-20 group-hover:scale-110 transition-transform duration-700">⚙️</span>
                            <h3 className="text-2xl font-black uppercase tracking-[0.4em] mb-3 text-white opacity-20 italic font-serif">Module {activeTab}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">Dữ liệu đang được đồng bộ hóa...</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}