import React, { useState } from "react";
import Navbar from "../../components/Navbar";
// Giữ nguyên các sub-pages quan trọng của bạn
import AdminEkycApproval from "./AdminEkycApproval";
import AdminJobMatching from "./AdminJobMatching";
import AdminFinance from "./AdminFinance";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock Data cho phần Quản lý người dùng (Đúng quy tắc định danh của bạn)
    const mockUsers = [
        { id: "GS-9901", name: "Dr. Teresa Thompson PhD", email: "teresa.t@university.edu", phone: "(+1) 123-321-1234", role: "Tutor", status: "Approved", eKYC: true },
        { id: "PH-2024", name: "Nguyễn Văn Tú", email: "tu.nguyen@gmail.com", phone: "(+84) 901-234-567", role: "Parent", status: "Active", eKYC: false },
        { id: "GS-9905", name: "Somesh Great", email: "somesh.great@company.com", phone: "(+91) 987-654-3210", role: "Tutor", status: "Pending", eKYC: false },
    ];

    const adminMenu = [
        { id: 'dashboard', label: 'Tổng quan hệ thống', icon: '📊' },
        { id: 'ekyc', label: 'Duyệt hồ sơ eKYC', icon: '🛡️' },
        { id: 'jobs', label: 'The Perfect Match', icon: '🎯' },
        { id: 'finance', label: 'Thanh toán Escrow', icon: '💸' },
        { id: 'users', label: 'Quản lý người dùng', icon: '👥' },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
            <Navbar />

            <div className="flex flex-1 pt-[116px]">
                {/* SIDEBAR SIÊU CẤP - GIỮ NGUYÊN */}
                <aside className="w-80 bg-slate-900/40 border-r border-white/5 p-8 sticky top-[116px] h-[calc(100vh-116px)] flex flex-col shadow-2xl backdrop-blur-xl z-20">
                    <div className="mb-10 px-2">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1 italic">Control Center</p>
                        <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">StudyMate <span className="text-slate-500">HQ</span></h2>
                    </div>

                    <nav className="space-y-3 flex-1">
                        {adminMenu.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-bold transition-all text-sm group ${activeTab === item.id
                                    ? "bg-blue-600 text-white shadow-2xl shadow-blue-900/40 translate-x-2"
                                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                                    }`}
                            >
                                <span className={`text-xl transition-transform group-hover:scale-110 ${activeTab === item.id ? 'animate-pulse' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Trạng thái Server - GIỮ NGUYÊN */}
                    <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 mt-auto">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Server Health</p>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-500 uppercase">Uptime</span>
                                <span className="text-green-400">99.9%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[99%]"></div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-transparent to-blue-900/5">

                    {/* TAB: DASHBOARD TỔNG QUAN - GIỮ NGUYÊN */}
                    {activeTab === 'dashboard' && (
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            <header className="mb-12">
                                <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
                                    Morning, <span className="text-blue-600">Admin</span>
                                </h1>
                                <p className="text-slate-500 text-sm font-bold mt-4 tracking-[0.2em] uppercase opacity-70 border-l-2 border-blue-600 pl-4">
                                    Hệ thống đang vận hành với 3 node ổn định
                                </p>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                                {[
                                    { label: 'Người dùng', val: '+128', color: 'text-blue-500', icon: '📈' },
                                    { label: 'Chờ duyệt eKYC', val: '15', color: 'text-orange-500', icon: '🛡️' },
                                    { label: 'Lớp cần Match', val: '01', color: 'text-green-500', icon: '🎯' },
                                    { label: 'Tiền ký quỹ', val: '5.5M', color: 'text-purple-500', icon: '💰' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-2xl">{stat.icon}</span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <p className={`text-4xl font-black ${stat.color} group-hover:scale-105 transition-transform origin-left tracking-tighter`}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-900/80 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                                <div className="p-10 border-b border-white/5 flex justify-between items-center">
                                    <div>
                                        <h2 className="font-black text-2xl text-white tracking-tight uppercase italic">Hàng đợi ưu tiên</h2>
                                        <p className="text-xs text-slate-500 font-bold mt-1">Các yêu cầu cần xử lý ngay lập tức</p>
                                    </div>
                                    <button onClick={() => setActiveTab('jobs')} className="bg-white text-black text-[10px] font-black px-8 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest">
                                        Mở trình Matching
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="bg-slate-950/50 rounded-3xl p-8 flex items-center justify-between border border-white/5 hover:bg-white/5 transition-all cursor-pointer" onClick={() => setActiveTab('ekyc')}>
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-xl text-orange-500">🛡️</div>
                                            <div>
                                                <p className="font-black text-white text-lg tracking-tight uppercase">Yêu cầu duyệt eKYC mới</p>
                                                <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">Gia sư: Đặng Tuấn • 95% Match • Vừa xong</p>
                                            </div>
                                        </div>
                                        <span className="text-blue-500 font-black text-[10px] tracking-widest uppercase group-hover:underline">Xử lý ngay →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SWITCH CASE CHO CÁC SUB-PAGES CŨ - GIỮ NGUYÊN */}
                    {activeTab === 'ekyc' && <AdminEkycApproval />}
                    {activeTab === 'jobs' && <AdminJobMatching />}
                    {activeTab === 'finance' && <AdminFinance />}

                    {/* TÍCH HỢP: QUẢN LÝ NGƯỜI DÙNG VÀO TAB USERS */}
                    {activeTab === 'users' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <header className="mb-10 flex justify-between items-end">
                                <div>
                                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">User <span className="text-blue-500">Management</span></h2>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Cơ sở dữ liệu tập trung v3.0</p>
                                </div>
                                <div className="flex gap-4">
                                    <input type="text" placeholder="Tìm ID: GS-XXXX..." className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500/50 w-64" />
                                    <button className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all italic">Xuất CSV</button>
                                </div>
                            </header>

                            <div className="bg-slate-900/80 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-md">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/5">
                                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Thành viên / ID</th>
                                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Liên lạc</th>
                                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Vai trò</th>
                                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Trạng thái</th>
                                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest italic text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {mockUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="p-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-lg grayscale group-hover:grayscale-0">👤</div>
                                                        <div>
                                                            <p className="font-black text-white italic tracking-tight">{user.name}</p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-[10px] font-mono text-blue-400/70">{user.id}</p>
                                                                {user.eKYC && <span className="text-[7px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded border border-green-500/20 font-black">VERIFIED</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <p className="text-[11px] font-bold text-slate-400">{user.email}</p>
                                                    <p className="text-[10px] font-mono text-slate-600 italic">{user.phone}</p>
                                                </td>
                                                <td className="p-8 italic font-black text-xs text-slate-500 uppercase tracking-widest">{user.role}</td>
                                                <td className="p-8">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border tracking-tighter ${user.status === 'Approved' || user.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-orange-500 bg-orange-500/10 border-orange-500/20'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="p-8">
                                                    <div className="flex justify-center gap-2">
                                                        <button className="p-3 bg-slate-800 hover:bg-blue-600 rounded-xl transition-all border border-white/5">⚙️</button>
                                                        <button className="p-3 bg-slate-800 hover:bg-red-600 rounded-xl transition-all border border-white/5">🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}