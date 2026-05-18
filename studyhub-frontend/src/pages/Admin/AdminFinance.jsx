import React, { useState, useEffect } from 'react';
import { getTransactions, releasePayment, resolveDispute } from '../../services/adminService';

const statusConfig = {
    HELD:     { label: 'Đang giữ',    cls: 'bg-amber-50 text-amber-600 border-amber-100' },
    RELEASED: { label: 'Đã giải ngân', cls: 'bg-green-50 text-green-600 border-green-100' },
    DISPUTE:  { label: 'Tranh chấp',   cls: 'bg-red-50 text-red-600 border-red-100' },
};

export default function AdminFinance() {
    const [txs, setTxs] = useState([]);

    useEffect(() => { getTransactions().then(setTxs); }, []);

    const handleRelease = async (id) => { await releasePayment(id); alert(`Đã giải ngân ${id}`); };
    const handleResolve = async (id) => { await resolveDispute(id); alert(`Đang xử lý tranh chấp ${id}`); };

    const totalHeld = txs.filter(t => t.status === 'HELD').reduce((s, t) => s + t.amount, 0);
    const disputes  = txs.filter(t => t.status === 'DISPUTE').length;
    const released  = txs.filter(t => t.status === 'RELEASED').reduce((s, t) => s + t.amount, 0);

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Thanh toán trung gian</h2>
                <p className="text-sm text-gray-500 mt-1">Quản lý ký quỹ & bảo vệ dòng tiền (Escrow Service)</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tổng đang ký quỹ</p>
                    <p className="text-2xl font-extrabold text-gray-900">{totalHeld.toLocaleString()}đ</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cần xử lý tranh chấp</p>
                    <p className="text-2xl font-extrabold text-red-500">{disputes > 0 ? `${disputes < 10 ? '0' : ''}${disputes} giao dịch` : '—'}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Đã giải ngân</p>
                    <p className="text-2xl font-extrabold text-green-600">{released.toLocaleString()}đ</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Danh sách giao dịch</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>{['Mã GD / Lớp', 'Phụ huynh', 'Gia sư', 'Số tiền', 'Tiến độ', 'Trạng thái', 'Thao tác'].map(h => (
                            <th key={h} className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {txs.map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4"><p className="text-xs font-mono font-semibold text-blue-500">{tx.id}</p><p className="text-xs text-gray-500 mt-0.5">{tx.subject}</p></td>
                                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{tx.parent}</td>
                                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{tx.tutor}</td>
                                <td className="px-5 py-4 text-sm font-bold text-gray-900">{tx.amount.toLocaleString()}đ</td>
                                <td className="px-5 py-4 text-sm text-gray-500">{tx.progress}</td>
                                <td className="px-5 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig[tx.status].cls}`}>{statusConfig[tx.status].label}</span></td>
                                <td className="px-5 py-4">
                                    {tx.status === 'HELD'     && <button onClick={() => handleRelease(tx.id)} className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors">Giải ngân</button>}
                                    {tx.status === 'DISPUTE'  && <button onClick={() => handleResolve(tx.id)} className="text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-1.5 rounded-lg transition-colors border border-red-100">Xử lý</button>}
                                    {tx.status === 'RELEASED' && <span className="text-xs text-gray-400 font-medium">Hoàn tất</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
