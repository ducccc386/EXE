import React, { useState } from 'react';

const escrowTransactions = [
    {
        id: "TRX-88201",
        parent: "Nguyễn Văn A",
        tutor: "Đặng Tuấn",
        amount: 2500000,
        status: "HELD", // Đang giữ tiền
        subject: "Toán 10",
        date: "2026-03-20",
        progress: "0/10 buổi"
    },
    {
        id: "TRX-88202",
        parent: "Trần Thị B",
        tutor: "Lê Minh Anh",
        amount: 1800000,
        status: "RELEASED", // Đã giải ngân
        subject: "Tiếng Anh",
        date: "2026-03-15",
        progress: "12/12 buổi"
    },
    {
        id: "TRX-88203",
        parent: "Lê Văn C",
        tutor: "Trần Hoàng Nam",
        amount: 3000000,
        status: "DISPUTE", // Đang khiếu nại
        subject: "Vật Lý",
        date: "2026-03-22",
        progress: "2/10 buổi"
    }
];

export default function AdminFinance() {
    const [txs, setTxs] = useState(escrowTransactions);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'HELD': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'RELEASED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'DISPUTE': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500';
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                    Hệ thống <span className="text-blue-500">Thanh toán trung gian</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Quản lý ký quỹ & Bảo vệ dòng tiền (Escrow Service)</p>
            </div>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Tổng tiền đang ký quỹ</p>
                    <p className="text-2xl font-black text-white">5.500.000đ</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Cần xử lý khiếu nại</p>
                    <p className="text-2xl font-black text-red-500 text-nowrap">01 Giao dịch</p>
                </div>
            </div>

            {/* Danh sách giao dịch */}
            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-800/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <tr>
                            <th className="p-6">Mã giao dịch / Lớp</th>
                            <th className="p-6">Phụ huynh (Người gửi)</th>
                            <th className="p-6">Gia sư (Thụ hưởng)</th>
                            <th className="p-6">Số tiền</th>
                            <th className="p-6">Trạng thái</th>
                            <th className="p-6 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {txs.map((tx) => (
                            <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6">
                                    <p className="text-xs font-black text-blue-400 mb-1">{tx.id}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{tx.subject}</p>
                                </td>
                                <td className="p-6 text-sm font-bold text-slate-200">{tx.parent}</td>
                                <td className="p-6 text-sm font-bold text-slate-200">{tx.tutor}</td>
                                <td className="p-6 font-black text-white">{tx.amount.toLocaleString()}đ</td>
                                <td className="p-6">
                                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-full border ${getStatusStyle(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    {tx.status === 'HELD' && (
                                        <button className="text-[10px] font-black bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-900/40 uppercase">Giải ngân</button>
                                    )}
                                    {tx.status === 'DISPUTE' && (
                                        <button className="text-[10px] font-black bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-red-900/40 uppercase tracking-tighter">Xử lý tranh chấp</button>
                                    )}
                                    {tx.status === 'RELEASED' && (
                                        <span className="text-[10px] font-black text-slate-600 italic">Hoàn tất</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}