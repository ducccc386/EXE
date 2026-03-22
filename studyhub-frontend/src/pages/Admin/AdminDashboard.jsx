import React, { useState } from 'react';
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const adminMenu = [
        { id: 'dashboard', label: 'Tổng quan hệ thống', icon: '🚀' },
        { id: 'ekyc', label: 'Duyệt hồ sơ eKYC', icon: '🛡️' },
        { id: 'users', label: 'Quản lý người dùng', icon: '👥' },
        { id: 'jobs', label: 'Điều phối lớp học', icon: '⚖️' },
        { id: 'finance', label: 'Báo cáo doanh thu', icon: '💰' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1">
                {/* SIDEBAR ADMIN */}
                <aside className="w-72 bg-slate-900/50 border-r border-slate-800 p-6 sticky top-[116px] h-[calc(100vh-116px)] flex flex-col">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Admin Control Panel</p>

                    <nav className="space-y-2 flex-1">
                        {adminMenu.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === item.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                        <p className="text-[10px] font-black text-blue-400 uppercase">System Version</p>
                        <p className="text-xs text-slate-400 font-bold">v2.4.0-build.2026</p>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-10 overflow-y-auto">
                    {activeTab === 'dashboard' && (
                        <section className="animate-in fade-in duration-500">
                            <header className="mb-10 flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase">
                                        StudyMate <span className="text-blue-500">Admin</span>
                                    </h1>
                                    <p className="text-slate-500 text-sm font-bold mt-1 tracking-widest uppercase">Hệ thống điều phối eKYC & Matching</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Server Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">Operational</span>
                                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></span>
                                    </div>
                                </div>
                            </header>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-colors">
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Người dùng mới</p>
                                    <p className="text-3xl font-black text-blue-400">+128</p>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Chờ duyệt eKYC</p>
                                    <p className="text-3xl font-black text-orange-400">1</p>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Lớp mới chờ Matching</p>
                                    <p className="text-3xl font-black text-purple-400">42</p>
                                </div>
                            </div>

                            {/* Queue Table (Code cũ của b lồng vào đây) */}
                            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
                                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                                    <h2 className="font-black text-xl text-white tracking-tight uppercase">Hàng đợi duyệt chứng chỉ</h2>
                                    <button className="text-xs font-black text-blue-500 hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-all uppercase tracking-widest">Duyệt nhanh tất cả</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-800/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                            <tr>
                                                <th className="p-6">Gia sư ứng tuyển</th>
                                                <th className="p-6">Loại tài liệu</th>
                                                <th className="p-6">Face Match</th>
                                                <th className="p-6 text-center">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr className="hover:bg-slate-800/30 transition-colors group">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-lg">DT</div>
                                                        <span className="font-bold text-sm">Đặng Tuấn (SV ĐHQG)</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-sm text-slate-300">CCCD Chip - ID: 031xxx</td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                                                            <div className="bg-green-500 h-full w-[95%]"></div>
                                                        </div>
                                                        <span className="text-xs font-black text-green-400">95%</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex justify-center gap-3">
                                                        <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-2.5 px-6 rounded-xl shadow-lg shadow-blue-900/30">APPROVE</button>
                                                        <button className="bg-slate-800 hover:bg-red-600 text-white text-[10px] font-black py-2.5 px-6 rounded-xl transition-all">REJECT</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'ekyc' && (
                        <div className="flex items-center justify-center h-full text-slate-500 italic font-bold">
                            🔍 Đang tải danh sách hồ sơ cần thẩm định...
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}