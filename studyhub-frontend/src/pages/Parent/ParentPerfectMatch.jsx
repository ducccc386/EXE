import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";

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

export default function ParentPerfectMatch() {
    const [isScanning, setIsScanning] = useState(true);

    // Giả lập hiệu ứng AI đang quét dữ liệu
    useEffect(() => {
        const timer = setTimeout(() => setIsScanning(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-orange-500/30">
            <Navbar />

            <div className="flex flex-1 pt-[116px]">
                {/* SIDEBAR - GIỮ NGUYÊN STYLE ĐÃ LÀM */}
                <aside className="w-72 bg-black border-r border-white/5 p-6 flex flex-col sticky top-[116px] h-[calc(100vh-116px)]">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-10 italic">AI Matching System</p>
                    <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-orange-500/20 shadow-2xl">
                        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1 italic text-center">Tiêu chí con bạn</p>
                        <div className="space-y-2 mt-4">
                            <div className="text-[10px] bg-white/5 p-2 rounded-xl border border-white/5 text-zinc-400 font-bold tracking-tight">🎯 Mục tiêu: Lấy lại gốc Toán</div>
                            <div className="text-[10px] bg-white/5 p-2 rounded-xl border border-white/5 text-zinc-400 font-bold tracking-tight">🧠 Tính cách: Hướng nội</div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-black to-orange-950/5">

                    {isScanning ? (
                        /* HIỆU ỨNG AI ĐANG QUÉT (WOW EFFECT CHO DEMO) */
                        <div className="h-full flex flex-col items-center justify-center animate-pulse">
                            <div className="relative w-40 h-40 mb-10">
                                <div className="absolute inset-0 border-4 border-orange-600 rounded-full animate-ping opacity-20"></div>
                                <div className="absolute inset-0 border-2 border-orange-500/50 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🧠</div>
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">StudyMate <span className="text-orange-600">AI Scanning...</span></h2>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] italic">Đang phân tích 35,000 hồ sơ gia sư phù hợp</p>
                        </div>
                    ) : (
                        /* DANH SÁCH GIA SƯ PERFECT MATCH */
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <header className="mb-12">
                                <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                    The <span className="text-orange-600 font-serif">Perfect Match</span>
                                </h1>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-4 italic">AI đã tìm thấy các gia sư có chỉ số tương thích cao nhất với con bạn</p>
                            </header>

                            <div className="grid grid-cols-1 gap-8">
                                {mockTutors.map((tutor) => (
                                    <div key={tutor.id} className="bg-zinc-900 border border-white/5 rounded-[3.5rem] p-10 flex flex-col lg:flex-row gap-10 hover:border-orange-500/30 transition-all group relative overflow-hidden">

                                        {/* Badge % Match */}
                                        <div className="absolute top-0 right-0 bg-orange-600 text-white px-8 py-3 rounded-bl-[2rem] font-black italic text-xl shadow-2xl">
                                            {tutor.matchScore}% MATCH
                                        </div>

                                        {/* Avatar & Info */}
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/5 mb-4 group-hover:border-orange-500/20 transition-all">
                                                <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">{tutor.distance} Cách bạn</p>
                                        </div>

                                        {/* Bio & Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h3 className="text-3xl font-black italic uppercase tracking-tighter">{tutor.name}</h3>
                                                <div className="flex gap-2">
                                                    {tutor.tags.map((tag, i) => (
                                                        <span key={i} className="text-[8px] font-black bg-white/5 px-3 py-1 rounded-full text-zinc-400 uppercase border border-white/5">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-zinc-400 text-sm italic leading-relaxed mb-8 max-w-2xl">
                                                "{tutor.bio}"
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Giá / Buổi</p>
                                                    <p className="text-sm font-black text-orange-500 italic">{tutor.price}</p>
                                                </div>
                                                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Xác minh</p>
                                                    <p className="text-[10px] font-black text-green-500 uppercase">Đã eKYC ✓</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col justify-center gap-4 min-w-[200px]">
                                            <button className="bg-white text-black font-black py-5 rounded-[2rem] text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-black/50 italic">
                                                Xem Hồ Sơ Chi Tiết
                                            </button>
                                            <button className="bg-zinc-800 text-white font-black py-5 rounded-[2rem] text-[10px] uppercase tracking-widest border border-white/5 hover:border-orange-500/50 transition-all italic">
                                                Dạy Thử 01 Buổi
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            {/* LƯU Ý VỀ ESCROW TẠI ĐÂY */}
                            <div className="mt-12 p-8 bg-orange-600/5 border border-orange-500/10 rounded-[3rem] flex items-center gap-6">
                                <div className="text-4xl animate-bounce">🛡️</div>
                                <div>
                                    <p className="text-sm font-black text-white italic uppercase tracking-tight">Học thử an toàn với Escrow</p>
                                    <p className="text-xs text-zinc-500 font-bold italic">Khoản tiền dạy thử sẽ được giữ bởi hệ thống và chỉ giải ngân nếu bạn hài lòng với buổi dạy đầu tiên.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}