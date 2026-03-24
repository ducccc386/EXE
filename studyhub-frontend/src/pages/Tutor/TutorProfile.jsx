import React from "react";

export default function TutorProfile() {
    const certifications = [
        { title: "IELTS Academic 8.5", issuer: "", year: "2024", icon: "🇬🇧" },
        { title: "Sư phạm Toán học", issuer: "ĐH Sư Phạm HN", year: "2022", icon: "📐" },
        { title: "Tư duy sáng tạo", issuer: "StudyMate Academy", year: "2025", icon: "🧠" }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                        Expert <span className="text-indigo-500 font-serif underline decoration-zinc-800 underline-offset-8">Portfolio</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 italic">Quản lý bằng cấp và thương hiệu cá nhân</p>
                </div>
                <button className="bg-indigo-600 text-white font-black px-10 py-5 rounded-[2rem] text-[10px] uppercase tracking-widest shadow-2xl hover:bg-white hover:text-indigo-600 transition-all italic">Cập nhật hồ sơ</button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* THÔNG TIN CƠ BẢN */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-zinc-900 p-8 rounded-[3.5rem] border border-white/5 text-center relative overflow-hidden group">
                        <div className="w-32 h-32 bg-indigo-600 rounded-[3rem] mx-auto mb-6 flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-6 transition-transform">👩‍🏫</div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Dr. Teresa Thompson</h3>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2 italic">Gia sư Cao cấp • 5 năm kn</p>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-black italic text-white font-mono">4.9</p>
                                <p className="text-[8px] font-black text-zinc-600 uppercase italic tracking-widest">Rating</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black italic text-white font-mono">98%</p>
                                <p className="text-[8px] font-black text-zinc-600 uppercase italic tracking-widest">Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BẰNG CẤP & CHỨNG CHỈ */}
                <div className="lg:col-span-8 space-y-8">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] italic ml-4">Chứng chỉ & Bằng cấp đã xác minh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all flex items-center gap-6 group">
                                <span className="text-4xl group-hover:scale-110 transition-transform">{cert.icon}</span>
                                <div>
                                    <h4 className="text-lg font-black italic uppercase text-white leading-tight">{cert.title}</h4>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1 tracking-tighter">{cert.issuer} • {cert.year}</p>
                                </div>
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex items-center justify-center p-8 hover:border-indigo-500/50 cursor-pointer group transition-all">
                            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-indigo-500">+ Thêm chứng chỉ mới</span>
                        </div>
                    </div>

                    {/* GIỚI THIỆU BẢN THÂN */}
                    <div className="bg-indigo-600/5 border border-indigo-500/10 p-10 rounded-[3.5rem] relative shadow-inner">
                        <h3 className="text-sm font-black italic uppercase text-indigo-500 mb-4 tracking-tighter">Triết lý giảng dạy</h3>
                        <p className="text-zinc-400 italic leading-relaxed text-sm">
                            "Tôi tin rằng mỗi học sinh đều có một 'điểm chạm' tư duy riêng. Thay vì ép buộc theo khuôn mẫu, tôi tập trung vào việc kích thích sự tò mò và ứng dụng AI để cá nhân hóa lộ trình học tập, giúp học sinh không chỉ giỏi kiến thức mà còn thành thạo kỹ năng tự học."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}