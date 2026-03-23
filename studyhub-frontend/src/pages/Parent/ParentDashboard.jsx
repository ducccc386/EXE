import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function ParentDashboard() {
    const [activeTab, setActiveTab] = useState('thanh-toan');
    const [showTopUp, setShowTopUp] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isScanning, setIsScanning] = useState(true);

    const menuItems = [
        { id: 'perfect-match', label: 'Tìm gia sư AI', icon: '🧠' },
        { id: 'lop-hoc', label: 'Lớp học của con', icon: '📚' },
        { id: 'danh-gia', label: 'Đánh giá học tập', icon: '📊' },
        { id: 'thanh-toan', label: 'Thanh toán & Ký quỹ', icon: '🛡️' },
    ];

    // Giả lập hiệu ứng quét AI khi vào tab Perfect Match
    useEffect(() => {
        if (activeTab === 'perfect-match') {
            setIsScanning(true);
            const timer = setTimeout(() => setIsScanning(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [activeTab]);

    const handleConfirmSession = () => {
        setIsConfirmed(true);
        setShowRating(true);
    };

    const mockTutors = [
        {
            id: 1,
            name: "Đặng Tuấn",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
            matchScore: 98,
            tags: ["Tận tâm", "Toán 10", "Dạy dễ hiểu"],
            bio: "Sinh viên xuất sắc ĐH Bách Khoa, có 3 năm kinh nghiệm luyện thi.",
            distance: "2.5 km",
            price: "250.000đ/buổi"
        },
        {
            id: 2,
            name: "Lê Minh",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
            matchScore: 92,
            tags: ["Vui vẻ", "Toán 10", "Chuyên hình học"],
            bio: "Giáo viên tự do, chuyên trị các ca hổng kiến thức căn bản.",
            distance: "1.2 km",
            price: "300.000đ/buổi"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-orange-500/30">
            <Navbar />

            <div className="flex flex-1 pt-[116px]">
                {/* SIDEBAR */}
                <aside className="w-72 bg-black border-r border-white/5 p-6 flex flex-col sticky top-[116px] h-[calc(100vh-116px)]">
                    <div className="mb-10 px-2">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2 italic">Parent Control</p>
                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">STUDYMATE <span className="text-orange-600 font-serif">HQ</span></h2>
                    </div>

                    <nav className="space-y-3 flex-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] font-bold transition-all text-sm group ${activeTab === item.id
                                    ? "bg-orange-600 text-white shadow-2xl shadow-orange-900/30 translate-x-1"
                                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className="text-xl transition-transform group-hover:scale-110">{item.icon}</span>
                                <span className="tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-orange-500/20 mt-auto shadow-2xl">
                        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1 italic text-center text-shadow-sm">Tiền ký quỹ (Escrow)</p>
                        <p className="text-2xl font-black text-white italic tracking-tighter text-center">2.500.000đ</p>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-black to-orange-950/5">

                    {/* 1. TAB PERFECT MATCH AI (MỚI TÍCH HỢP) */}
                    {activeTab === 'perfect-match' && (
                        <div className="animate-in fade-in duration-700">
                            {isScanning ? (
                                <div className="h-[60vh] flex flex-col items-center justify-center">
                                    <div className="relative w-32 h-32 mb-8">
                                        <div className="absolute inset-0 border-4 border-orange-600 rounded-full animate-ping opacity-20"></div>
                                        <div className="absolute inset-0 border-2 border-orange-500/50 rounded-full animate-spin border-t-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-4xl">🧠</div>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">AI đang phân tích hồ sơ...</h3>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    <header>
                                        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">The <span className="text-orange-600">Perfect Match</span></h1>
                                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-4 italic underline decoration-orange-500/50 underline-offset-4">Top 2 gia sư phù hợp nhất dựa trên thuật toán Matching</p>
                                    </header>

                                    <div className="grid grid-cols-1 gap-8">
                                        {mockTutors.map(tutor => (
                                            <div key={tutor.id} className="bg-zinc-900 border border-white/5 rounded-[3.5rem] p-10 flex flex-col lg:flex-row gap-10 hover:border-orange-500/30 transition-all group relative">
                                                <div className="absolute top-0 right-0 bg-orange-600 text-white px-8 py-3 rounded-bl-[2rem] font-black italic">{tutor.matchScore}% MATCH</div>
                                                <div className="flex flex-col items-center">
                                                    <img src={tutor.avatar} className="w-28 h-28 rounded-3xl border-2 border-white/5 mb-3 shadow-2xl" alt="avatar" />
                                                    <span className="text-[10px] font-black text-zinc-600 uppercase italic tracking-widest">{tutor.distance}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">{tutor.name}</h3>
                                                    <div className="flex gap-2 mb-4">
                                                        {tutor.tags.map(tag => <span className="text-[8px] bg-white/5 px-3 py-1 rounded-full uppercase font-bold text-zinc-400 border border-white/5 tracking-tighter">{tag}</span>)}
                                                    </div>
                                                    <p className="text-sm text-zinc-400 italic max-w-xl mb-6">"{tutor.bio}"</p>
                                                    <div className="flex gap-4">
                                                        <button className="bg-white text-black font-black px-8 py-4 rounded-2xl text-[9px] uppercase tracking-widest shadow-xl">Hẹn lịch dạy thử</button>
                                                        <button className="bg-zinc-800 text-white font-black px-8 py-4 rounded-2xl text-[9px] uppercase tracking-widest border border-white/5 hover:bg-orange-600 transition-colors italic">Xem hồ sơ</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. TAB THANH TOÁN & KÝ QUỸ (GIỮ NGUYÊN CODE CŨ CỦA B) */}
                    {activeTab === 'thanh-toan' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <header className="mb-12 flex justify-between items-end">
                                <div>
                                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                        Ví <span className="text-orange-600 font-serif underline decoration-zinc-800 underline-offset-8">Escrow</span>
                                    </h1>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 italic">Bảo mật dòng tiền 100% cho phụ huynh</p>
                                </div>
                                <button
                                    onClick={() => setShowTopUp(true)}
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-black px-10 py-5 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-orange-900/40 transition-all active:scale-95"
                                >
                                    Nạp thêm học phí
                                </button>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                                <div className="lg:col-span-5 bg-zinc-900 p-10 rounded-[3.5rem] border border-orange-500/20 relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl group-hover:rotate-12 transition-transform duration-700">🛡️</div>
                                    <p className="text-[11px] font-black text-orange-500 uppercase mb-3 tracking-widest italic text-shadow-sm">Số dư đóng băng (Frozen Balance)</p>
                                    <p className="text-6xl font-black text-white tracking-tighter italic font-mono">2.500.000đ</p>
                                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-3 text-green-500">
                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Protected by StudyMate AI</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-7 bg-zinc-900/40 p-10 rounded-[3.5rem] border border-white/5 flex flex-col justify-center shadow-xl">
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">
                                        "Gia sư **Đặng Tuấn** vừa thông báo hoàn thành **Buổi học thứ 8 (23/03/2026)**. Vui lòng xác nhận để hệ thống giải ngân tiền học phí cho gia sư."
                                    </p>
                                    <div className="flex gap-3">
                                        <span className="text-[9px] font-black bg-orange-600/10 text-orange-500 px-4 py-2 rounded-full uppercase border border-orange-500/20 tracking-tighter">Cần xác nhận ngay</span>
                                        <span className="text-[9px] font-black bg-zinc-800 text-zinc-500 px-4 py-2 rounded-full uppercase tracking-tighter italic font-serif">Hợp đồng #SM-88201</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-900/80 rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                                <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Giao dịch chờ giải ngân</p>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase italic">Cập nhật 22:12</span>
                                </div>
                                <div className="p-10">
                                    <div className="flex flex-col md:flex-row justify-between items-center bg-black/50 p-10 rounded-[3rem] border border-white/5 hover:border-orange-500/30 transition-all group">
                                        <div className="mb-8 md:mb-0">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none font-serif">Toán 10 - GS. Đặng Tuấn</h3>
                                                <span className="bg-green-500/10 text-green-500 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter border border-green-500/20 animate-pulse font-sans">Đã dạy: Buổi 8</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">Tiến độ: 80% • Giá: 250k / Buổi • Giải ngân: 250.000đ</p>
                                        </div>

                                        <div className="flex gap-4">
                                            {!isConfirmed ? (
                                                <button
                                                    onClick={handleConfirmSession}
                                                    className="bg-orange-600 hover:bg-white hover:text-orange-600 text-white font-black px-12 py-5 rounded-[2rem] text-[11px] uppercase tracking-widest transition-all shadow-2xl shadow-orange-950/50 active:scale-95 border-2 border-orange-600 italic"
                                                >
                                                    Xác nhận & Giải ngân
                                                </button>
                                            ) : (
                                                <button className="bg-green-600 text-white font-black px-12 py-5 rounded-[2rem] text-[11px] uppercase tracking-widest cursor-default italic shadow-2xl shadow-green-950/20">
                                                    Đã giải ngân ✓
                                                </button>
                                            )}
                                            <button className="bg-zinc-800 hover:bg-red-600 text-white font-black px-8 py-5 rounded-[2rem] text-[11px] uppercase tracking-widest transition-all border border-white/5 font-sans">
                                                Khiếu nại
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB LỚP HỌC (GIỮ NGUYÊN CODE CŨ CỦA B) */}
                    {activeTab === 'lop-hoc' && (
                        <div className="animate-in fade-in duration-500">
                            <h2 className="text-4xl font-black italic uppercase mb-12 tracking-tighter leading-none">Lớp học <span className="text-blue-500">Active</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-zinc-900 p-10 rounded-[3.5rem] border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl group">
                                    <p className="text-[10px] font-black text-blue-500 uppercase mb-3 tracking-widest italic">Hợp đồng số #2026-A1</p>
                                    <p className="text-3xl font-black italic mb-8 leading-none tracking-tight group-hover:translate-x-2 transition-transform italic">Toán nâng cao 10</p>
                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-white text-black py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 hover:text-white transition-all">Lịch biểu</button>
                                        <button className="flex-1 bg-zinc-800 text-white py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest border border-white/5">Học liệu AI</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. TAB ĐÁNH GIÁ (GIỮ NGUYÊN CODE CŨ CỦA B) */}
                    {activeTab === 'danh-gia' && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-800 italic group">
                            <span className="text-[120px] mb-8 opacity-20 group-hover:scale-110 transition-transform duration-700">📊</span>
                            <h3 className="text-2xl font-black uppercase tracking-[0.4em] mb-3 text-white opacity-20 italic">Analytics Hub</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">StudyMate AI đang tổng hợp báo cáo tuần...</p>
                        </div>
                    )}
                </main>
            </div>

            {/* CÁC MODAL (NẠP TIỀN & RATING) GIỮ NGUYÊN CODE CŨ CỦA B */}
            {showTopUp && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-black/90" onClick={() => setShowTopUp(false)}></div>
                    <div className="bg-zinc-950 border border-white/10 p-12 rounded-[4.5rem] w-full max-w-xl relative z-10 shadow-[0_0_100px_rgba(234,88,12,0.1)] overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px]"></div>
                        <h3 className="text-3xl font-black text-white italic uppercase mb-2 text-center tracking-tighter leading-none">Gateway</h3>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] text-center mb-12 italic font-serif">Cổng thanh toán thông minh</p>

                        <div className="space-y-4 mb-12">
                            {['Ví điện tử MOMO', 'Cổng VNPay', 'Vietcombank Banking'].map((method, i) => (
                                <button key={i} className="w-full flex justify-between items-center bg-white/5 hover:bg-orange-600/10 hover:border-orange-500/50 border border-white/5 p-7 rounded-[2.5rem] transition-all group">
                                    <span className="text-[12px] font-bold text-zinc-400 group-hover:text-white group-hover:italic uppercase tracking-widest">{method}</span>
                                    <span className="text-xl group-hover:translate-x-3 transition-transform italic font-black text-orange-500">➔</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowTopUp(false)} className="w-full py-2 text-[9px] font-black uppercase text-zinc-700 hover:text-white transition-colors tracking-[0.5em] italic">[ Đóng trình nạp tiền ]</button>
                    </div>
                </div>
            )}

            {showRating && (
                <div className="fixed inset-0 z-[201] flex items-center justify-center p-6 backdrop-blur-3xl animate-in zoom-in-95 duration-300">
                    <div className="absolute inset-0 bg-black/95"></div>
                    <div className="bg-zinc-900 border border-white/10 p-14 rounded-[5rem] w-full max-w-2xl relative z-10 text-center shadow-2xl">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-[3rem] flex items-center justify-center text-5xl mx-auto mb-10 shadow-2xl animate-bounce">✓</div>
                        <h3 className="text-4xl font-black text-white italic uppercase mb-3 tracking-tighter leading-none font-serif">Tuyệt vời!</h3>
                        <p className="text-sm text-zinc-500 italic mb-12">Giải ngân thành công. Hãy dành ít giây đánh giá Gia sư Đặng Tuấn để AI học hỏi nhé.</p>

                        <div className="flex justify-center gap-6 mb-16">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button key={s} className="text-5xl hover:scale-125 transition-transform hover:text-orange-500 filter grayscale hover:grayscale-0">⭐</button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowRating(false)}
                            className="bg-white text-black font-black px-12 py-5 rounded-[2rem] text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-orange-600 hover:text-white"
                        >
                            Gửi đánh giá & Hoàn tất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}