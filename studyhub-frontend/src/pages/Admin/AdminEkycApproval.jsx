import React, { useState, useEffect } from 'react';
import { getPendingEkyc, approveEkyc, rejectEkyc } from '../../services/adminService';

export default function AdminEkycApproval() {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [activePreview, setActivePreview] = useState('identity');
    const [showRejectModal, setShowRejectModal] = useState(false);

    useEffect(() => {
        getPendingEkyc().then(data => { setList(data); setSelected(data[0] ?? null); });
    }, []);

    const confirmAction = async (id, status, reason) => {
        if (status === 'approve') await approveEkyc(id);
        else await rejectEkyc(id, reason);
        alert(`Đã ${status === 'approve' ? 'CHẤP THUẬN' : 'TỪ CHỐI'} hồ sơ ${id}`);
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        setSelected(newList[0] ?? null);
        setShowRejectModal(false);
    };

    if (!selected) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg className="w-10 h-10 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-semibold text-gray-600">Tất cả hồ sơ đã được xử lý!</p>
        </div>
    );

    return (
        <div>
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Thẩm định hồ sơ gia sư</h2>
                    <p className="text-sm text-gray-500 mt-1">Đang xem: {selected.name} — #{selected.id}</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    {[{ key: 'identity', label: 'Định danh (eKYC)' }, { key: 'academic', label: 'Bằng cấp' }].map(({ key, label }) => (
                        <button key={key} onClick={() => setActivePreview(key)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activePreview === key ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-3">Hàng đợi ({list.length})</p>
                    {list.map(item => (
                        <div key={item.id} onClick={() => { setSelected(item); setActivePreview('identity'); }}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === item.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-mono text-blue-500">{item.id}</span>
                                <span className={`text-xs font-semibold ${item.matchScore > 80 ? 'text-green-600' : 'text-orange-500'}`}>{item.matchScore}%</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{item.school}</p>
                        </div>
                    ))}
                </div>

                <div className="col-span-9 grid grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-5 pb-3 border-b border-gray-100">Hồ sơ năng lực</p>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Trường & Chuyên ngành</p>
                                <p className="text-sm font-bold text-gray-900">{selected.school}</p>
                                <p className="text-xs text-blue-600 mt-0.5">{selected.major} • GPA: {selected.gpa}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Chứng chỉ xác thực</p>
                                <div className="space-y-2">
                                    {selected.certificates.map((cert, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-white p-2.5 px-3 rounded-lg border border-gray-100">
                                            <span className="text-sm font-medium text-gray-800">{cert.name}</span>
                                            <span className="text-sm font-bold text-green-600">{cert.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Số CCCD</p>
                                <p className="text-base font-bold text-gray-900 font-mono tracking-widest">{selected.idNumber}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => confirmAction(selected.id, 'approve')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-sm">Phê duyệt</button>
                            <button onClick={() => setShowRejectModal(true)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl text-sm transition-colors">Từ chối</button>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        {activePreview === 'identity' ? (
                            <div className="space-y-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">So sánh Selfie & CCCD</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <img src={selected.selfieImg} className="rounded-xl border border-gray-100 aspect-[3/4] object-cover w-full" alt="selfie" />
                                    <img src={selected.cardImg} className="rounded-xl border border-gray-100 aspect-[3/4] object-cover w-full" alt="id" />
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">AI Face Match Score</p>
                                    <p className={`text-3xl font-extrabold ${selected.matchScore > 80 ? 'text-green-600' : 'text-orange-500'}`}>{selected.matchScore}%</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-4">Bằng cấp / Chứng minh học vấn</p>
                                <div className="flex-1 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 min-h-[280px]">
                                    <img src={selected.degreeImg} className="w-full h-full object-contain" alt="degree" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showRejectModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRejectModal(false)}></div>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl">
                        <h3 className="text-base font-bold text-gray-900 mb-4">Lý do từ chối hồ sơ</h3>
                        <div className="space-y-2 mb-5">
                            {['Ảnh thẻ không rõ nét', 'Bằng cấp không trùng khớp', 'Chứng chỉ đã hết hạn', 'Nghi vấn giả mạo khuôn mặt'].map((reason, i) => (
                                <button key={i} onClick={() => confirmAction(selected.id, 'reject', reason)} className="w-full text-left bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-100 p-3.5 rounded-xl text-sm font-medium text-gray-700 transition-all">
                                    {reason}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowRejectModal(false)} className="w-full py-2.5 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors">Huỷ bỏ</button>
                    </div>
                </div>
            )}
        </div>
    );
}
