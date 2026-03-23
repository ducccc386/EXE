import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const mockTutors = [
    { id: "GS-9901", name: "Dr. Teresa Thompson PhD", email: "teresa.t@university.edu", phone: "(+1) 123-321-1234", status: "Approved", joinDate: "2026-03-20", eKYC: true },
    { id: "GS-9902", name: "Nguyễn Văn Tú", email: "tu.nguyen@gmail.com", phone: "(+84) 901-234-567", status: "Pending", joinDate: "2026-03-22", eKYC: false },
    { id: "GS-9903", name: "Lê Thị Hồng Hạnh", email: "hanh.le@outlook.com", phone: "(+84) 988-777-666", status: "Approved", joinDate: "2026-03-15", eKYC: true },
    { id: "GS-9904", name: "Trần Minh Tâm", email: "tam.tran@tutor.vn", phone: "(+84) 912-000-111", status: "Rejected", joinDate: "2026-03-10", eKYC: true },
    { id: "GS-9905", name: "Somesh Great", email: "somesh.great@company.com", phone: "(+91) 987-654-3210", status: "Pending", joinDate: "2026-03-23", eKYC: false },
];

export default function AdminUserManagement() {
    const [filter, setFilter] = useState('All');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Pending': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 pt-[116px]">
                {/* SIDEBAR ADMIN */}
                <aside className="w-72 bg-black border-r border-white/5 p-6 flex flex-col sticky top-[116px] h-[calc(100vh-116px)]">
                    <div className="mb-10 px-2">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 italic">Security Core</p>
                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Admin <span className="text-zinc-500 font-serif">Control</span></h2>
                    </div>

                    <nav className="space-y-2">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold bg-white/5 text-white border border-white/10">
                            <span>👥</span> Quản lý Gia sư
                        </button>
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-white/5 transition-all text-sm">
                            <span>🛡️</span> Duyệt định danh eKYC
                        </button>
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-white/5 transition-all text-sm">
                            <span>💸</span> Đối soát Escrow
                        </button>
                    </nav>

                    <div className="mt-auto bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-[2rem]">
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic">Hệ thống dữ liệu</p>
                        <p className="text-sm font-bold text-zinc-400 leading-tight">35,000+ Hồ sơ đã được làm sạch bởi AI</p>
                    </div>
                </aside>

                {/* MAIN PANEL */}
                <main className="flex-1 p-12 bg-gradient-to-br from-black to-indigo-950/10">
                    <header className="mb-12 flex justify-between items-start">
                        <div>
                            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
                                Tutor <span className="text-indigo-500">Directory</span>
                            </h1>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                                <span>Tổng 1,240 Gia sư</span>
                                <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                                <span className="text-orange-500">42 Đang chờ duyệt</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-zinc-900 border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-3">
                                <span className="text-zinc-500 italic text-xs">Search ID:</span>
                                <input type="text" placeholder="GS-XXXX" className="bg-transparent border-none outline-none text-sm font-mono w-24 text-indigo-400" />
                            </div>
                            <button className="bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all italic">Xuất báo cáo CSV</button>
                        </div>
                    </header>

                    {/* TABLE AREA */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-8 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Gia sư / Định danh</th>
                                    <th className="p-8 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Liên lạc</th>
                                    <th className="p-8 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Ngày tham gia</th>
                                    <th className="p-8 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Trạng thái</th>
                                    <th className="p-8 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockTutors.map((tutor) => (
                                    <tr key={tutor.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all border border-white/5">👤</div>
                                                <div>
                                                    <p className="font-black text-white italic tracking-tight">{tutor.name}</p>
                                                    <p className="text-[10px] font-mono text-indigo-400/70">{tutor.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <p className="text-xs font-bold text-zinc-400 mb-1">{tutor.email}</p>
                                            <p className="text-[10px] font-mono text-zinc-600">{tutor.phone}</p>
                                        </td>
                                        <td className="p-8 text-xs font-black text-zinc-500 italic">
                                            {tutor.joinDate}
                                        </td>
                                        <td className="p-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border tracking-tighter ${getStatusColor(tutor.status)}`}>
                                                {tutor.status}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex gap-2">
                                                <button className="p-3 bg-zinc-800 hover:bg-indigo-600 rounded-xl transition-all border border-white/5" title="Duyệt hồ sơ">✔️</button>
                                                <button className="p-3 bg-zinc-800 hover:bg-red-600 rounded-xl transition-all border border-white/5" title="Từ chối">✖️</button>
                                                <button className="p-3 bg-zinc-800 hover:bg-white hover:text-black rounded-xl transition-all border border-white/5 text-[10px] font-black">CHI TIẾT</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* PHÂN TRANG GIẢ LẬP */}
                        <div className="p-8 bg-black/20 border-t border-white/5 flex justify-between items-center">
                            <p className="text-[10px] font-black text-zinc-600 uppercase italic">Hiển thị 5 trên 1,240 kết quả</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs opacity-50 italic cursor-not-allowed">Trước</button>
                                <button className="px-4 py-2 bg-indigo-600 border border-indigo-500 rounded-lg text-xs font-black">1</button>
                                <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-black">2</button>
                                <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-black">...</button>
                                <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-black italic">Sau</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}