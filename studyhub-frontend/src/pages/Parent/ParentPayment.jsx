import React, { useState } from 'react';

const escrowData = [
    {
        id: "INV-2026-001",
        tutor: "Đặng Tuấn",
        subject: "Toán 10",
        totalAmount: 2500000,
        remainingAmount: 500000, // Số tiền còn lại trong khoá
        status: "Đang bảo vệ",
        sessions: "8/10 buổi hoàn tất",
        lastSession: "22/03/2026"
    }
];

export default function ParentPayment() {
    const [showTopUp, setShowTopUp] = useState(false);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Thanh toán */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        Ví <span className="text-orange-600">Ký quỹ An toàn</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Hệ thống bảo vệ tài chính StudyMate Escrow</p>
                </div>
                <button
                    onClick={() => setShowTopUp(true)}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-orange-900/40 transition-all active:scale-95"
                >
                    Nạp học phí mới
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CỘT TRÁI: TỔNG QUAN VÍ */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900 p-8 rounded-[3rem] border border-orange-500/20 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform">🛡️</div>
                        <p className="text-[10px] font-black text-orange-500 uppercase mb-2 italic">Số dư đang đóng băng</p>
                        <p className="text-5xl font-black text-white tracking-tighter">2.500.000đ</p>
                        <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-zinc-500 uppercase tracking-widest">Đang bảo mật cho</span>
                                <span className="text-white uppercase tracking-tighter">01 Gia sư</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-zinc-500 uppercase tracking-widest">Trạng thái ví</span>
                                <span className="text-green-500 uppercase tracking-tighter italic">Đã kích hoạt</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 italic text-[10px] text-zinc-500 leading-relaxed font-medium">
                        <span className="text-orange-500 font-black">LƯU Ý:</span> Hệ thống StudyMate sẽ tự động giải ngân cho gia sư sau 24h kể từ khi buổi học kết thúc nếu bạn không có khiếu nại. Bạn có thể bấm "Tạm dừng thanh toán" nếu buổi học có vấn đề.
                    </div>
                </div>

                {/* CỘT PHẢI: CHI TIẾT CÁC LỚP ĐANG KÝ QUỸ */}
                <div className="lg:col-span-2 space-y-6">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-4">Các giao dịch đang hoạt động</p>

                    {escrowData.map(item => (
                        <div key={item.id} className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 hover:border-orange-500/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">{item.subject}</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">Gia sư: {item.tutor}</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-orange-600/10 text-orange-500 text-[9px] font-black px-3 py-1.5 rounded-full border border-orange-500/20 uppercase italic">Protected</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Tổng khoá</p>
                                    <p className="text-xs font-black text-white">{item.totalAmount.toLocaleString()}đ</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Còn lại</p>
                                    <p className="text-xs font-black text-orange-500">{item.remainingAmount.toLocaleString()}đ</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Tiến độ</p>
                                    <p className="text-xs font-black text-white">{item.sessions}</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Ngày học cuối</p>
                                    <p className="text-xs font-black text-white">{item.lastSession}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-white hover:bg-zinc-200 text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all">
                                    Lịch sử buổi học
                                </button>
                                <button className="flex-1 bg-zinc-800 hover:bg-red-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all">
                                    Khiếu nại / Hoàn tiền
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL NẠP TIỀN (DEMO NHANH) */}
            {showTopUp && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-black/80" onClick={() => setShowTopUp(false)}></div>
                    <div className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-lg relative z-10 shadow-3xl">
                        <h3 className="text-2xl font-black text-white italic uppercase mb-2 text-center">Nạp tiền ký quỹ</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center mb-8">StudyMate Smart Payment Gateway</p>

                        <div className="space-y-4 mb-10">
                            {['Thanh toán qua Ví MOMO', 'Thanh toán qua VNPay', 'Chuyển khoản Ngân hàng'].map((method, i) => (
                                <button key={i} className="w-full flex justify-between items-center bg-white/5 hover:bg-orange-600/10 hover:border-orange-500 border border-transparent p-5 rounded-3xl transition-all group">
                                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white">{method}</span>
                                    <span className="text-xl">➔</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowTopUp(false)} className="w-full py-4 text-[10px] font-black uppercase text-zinc-500 hover:text-white">Hủy bỏ</button>
                    </div>
                </div>
            )}
        </div>
    );
}