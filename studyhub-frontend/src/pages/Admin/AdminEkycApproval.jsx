import React, { useState } from 'react';

const pendingEkyc = [
    {
        id: "TUT-9901",
        name: "Nguyễn Thị Phương Thảo",
        role: "Gia sư Sinh viên",
        school: "Đại học Quốc gia TP.HCM",
        major: "Business Administration",
        gpa: "3.8/4.0",
        matchScore: 95,
        idNumber: "031092001234",
        certificates: [
            { name: "IELTS Academic", score: "8.0", issueDate: "2025", provider: "British Council" },
            { name: "Giải Nhì Toán Tỉnh", score: "9.5", issueDate: "2023", provider: "Sở GD&ĐT" }
        ],
        selfieImg: "https://nld.mediacdn.vn/zoom/594_371/291774122806476800/2023/9/6/edit-hinh2-1694005434985814384572.png",
        cardImg: "https://images2.thanhnien.vn/528068263637045248/2023/11/27/doi-ten-the-can-cuoc-1701048226664995346108.jpg",
        degreeImg: "https://lambangdaihocphoithat.com/wp-content/uploads/2022/08/Lam-bang-Dai-hoc-Quoc-gia-TPHCM.jpg", // Ảnh Thẻ SV
        requestDate: "2026-03-23 09:45"
    },
    {
        id: "TUT-8824",
        name: "Lê Minh Anh",
        role: "Giáo viên tự do",
        school: "Đại học Sư Phạm TP.HCM",
        major: "Sư phạm Tiếng Anh",
        gpa: "3.9/4.0",
        matchScore: 89,
        idNumber: "079095005678",
        certificates: [
            { name: "TESOL Certificate", score: "Distinction", issueDate: "2024", provider: "Madison University" },
            { name: "IELTS Academic", score: "8.5", issueDate: "2024", provider: "IDP" }
        ],
        selfieImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
        cardImg: "https://images.unsplash.com/photo-1610123590390-eb41da009c34?w=600&h=400&fit=crop",
        degreeImg: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&h=400&fit=crop", // Ảnh Bằng ĐH
        requestDate: "2026-03-23 10:20"
    },
    {
        id: "TUT-7750",
        name: "Trần Hoàng Nam",
        role: "Gia sư Sinh viên",
        school: "Đại học Bách Khoa",
        major: "Điện - Điện tử",
        gpa: "3.2/4.0",
        matchScore: 52, // Trường hợp cần admin soi kỹ vì điểm thấp
        idNumber: "001095009999",
        certificates: [
            { name: "Giải Ba Vật Lý Quốc Gia", score: "8.75", issueDate: "2022", provider: "Bộ GD&ĐT" }
        ],
        selfieImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        cardImg: "https://images.unsplash.com/photo-1610123590390-eb41da009c34?w=600&h=400&fit=crop",
        degreeImg: "https://images.unsplash.com/photo-1621460249265-276632c0211a?w=600&h=400&fit=crop",
        requestDate: "2026-03-23 11:05"
    }
];

export default function AdminEkycApproval() {
    const [list, setList] = useState(pendingEkyc);
    const [selected, setSelected] = useState(list[0]);
    const [activePreview, setActivePreview] = useState('identity');
    const [showRejectModal, setShowRejectModal] = useState(false);

    const handleAction = (id, status) => {
        if (status === 'reject') {
            setShowRejectModal(true);
            return;
        }
        confirmAction(id, 'approve');
    };

    const confirmAction = (id, status) => {
        alert(`Hệ thống: Đã ${status === 'approve' ? 'CHẤP THUẬN' : 'TỪ CHỐI'} hồ sơ ${id}`);
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        setSelected(newList.length > 0 ? newList[0] : null);
        setShowRejectModal(false);
    };

    if (!selected) return (
        <div className="flex flex-col items-center justify-center h-[500px] text-slate-500 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
            <span className="text-6xl mb-4">✅</span>
            <p className="font-black uppercase tracking-widest italic text-center px-10">Tất cả hồ sơ đã được xử lý xong!</p>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700 relative">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
                        Thẩm định <span className="text-blue-500">Hồ sơ gia sư tổng thể</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">
                        Đang duyệt hồ sơ: {selected.name} - #{selected.id}
                    </p>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
                    <button
                        onClick={() => setActivePreview('identity')}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activePreview === 'identity' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Định danh (eKYC)
                    </button>
                    <button
                        onClick={() => setActivePreview('academic')}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activePreview === 'academic' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Năng lực (Academic)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* DANH SÁCH CHỜ (CỘT TRÁI) */}
                <div className="xl:col-span-3 space-y-3">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 px-2">Hàng đợi ({list.length})</p>
                    {list.map(item => (
                        <div
                            key={item.id}
                            onClick={() => { setSelected(item); setActivePreview('identity'); }}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer ${selected?.id === item.id ? "bg-blue-600/10 border-blue-500" : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-black text-blue-400">{item.id}</span>
                                <span className={`text-[9px] font-black ${item.matchScore > 80 ? "text-green-400" : "text-orange-500"}`}>
                                    {item.matchScore}% Match
                                </span>
                            </div>
                            <h4 className="font-bold text-white text-sm">{item.name}</h4>
                            <p className="text-[9px] text-slate-500 font-bold uppercase truncate">{item.school}</p>
                        </div>
                    ))}
                </div>

                {/* CHI TIẾT ĐỐI CHIẾU (CỘT GIỮA & PHẢI) */}
                <div className="xl:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Thông tin Text */}
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 italic border-b border-white/5 pb-2">Hồ sơ năng lực</p>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trường & Chuyên ngành</p>
                                <p className="text-lg font-black text-white tracking-tighter uppercase leading-tight">{selected.school}</p>
                                <p className="text-xs text-blue-400 font-bold italic">{selected.major}</p>
                            </div>

                            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Chứng chỉ đã xác thực</p>
                                <div className="space-y-3">
                                    {selected.certificates.map((cert, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-white/5 p-2 px-3 rounded-xl">
                                            <span className="text-xs font-bold text-white">{cert.name}</span>
                                            <span className="text-xs font-black text-green-400">{cert.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Số CCCD khớp với giấy tờ</p>
                                <p className="text-lg font-black text-white tracking-[0.2em]">{selected.idNumber}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button onClick={() => confirmAction(selected.id, 'approve')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/40">Phê duyệt</button>
                            <button onClick={() => setShowRejectModal(true)} className="flex-1 bg-slate-800 hover:bg-red-600 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest transition-all">Từ chối</button>
                        </div>
                    </div>

                    {/* Hình ảnh */}
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8">
                        {activePreview === 'identity' ? (
                            <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest mb-2">So sánh Selfie & CCCD</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <img src={selected.selfieImg} className="rounded-2xl border-2 border-slate-800 aspect-[3/4] object-cover" alt="selfie" />
                                        <img src={selected.cardImg} className="rounded-2xl border-2 border-slate-800 aspect-[3/4] object-cover" alt="id" />
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">AI Face Match Score</p>
                                    <p className={`text-4xl font-black ${selected.matchScore > 80 ? 'text-green-500' : 'text-orange-500'}`}>{selected.matchScore}%</p>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-in zoom-in-95 duration-300 h-full flex flex-col">
                                <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest mb-4">Chứng minh học vấn / Bằng cấp</p>
                                <div className="flex-1 rounded-[2rem] overflow-hidden border-2 border-slate-800 bg-black shadow-inner">
                                    <img src={selected.degreeImg} className="w-full h-full object-contain" alt="degree" />
                                </div>
                                <p className="text-[10px] text-slate-500 italic text-center mt-4">Bấm để xem ảnh gốc khổ lớn</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* REJECT MODAL (POPUP PHỤ) */}
            {showRejectModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowRejectModal(false)}></div>
                    <div className="bg-slate-900 border border-white/10 p-8 rounded-[3rem] w-full max-w-md relative z-10">
                        <h3 className="text-xl font-black text-white italic uppercase mb-6 text-center">Lý do từ chối hồ sơ</h3>
                        <div className="space-y-3 mb-8">
                            {['Ảnh thẻ không rõ nét', 'Bằng cấp không trùng khớp', 'Chứng chỉ đã hết hạn', 'Nghi vấn giả mạo khuôn mặt'].map((reason, i) => (
                                <button key={i} onClick={() => confirmAction(selected.id, 'reject')} className="w-full text-left bg-white/5 hover:bg-red-500/10 hover:border-red-500 border border-transparent p-4 rounded-2xl text-xs font-bold text-slate-300 transition-all">
                                    🚫 {reason}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowRejectModal(false)} className="w-full py-4 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">Quay lại</button>
                    </div>
                </div>
            )}
        </div>
    );
}