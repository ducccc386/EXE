import React, { useState, useEffect } from "react";
import { getMyProfile } from "../../services/tutorService";

export default function TutorProfile() {
    const [profile, setProfile] = useState(null);
    useEffect(() => { getMyProfile().then(setProfile); }, []);
    if (!profile) return <div className="text-center py-20 text-gray-400 text-sm">Đang tải hồ sơ…</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Hồ sơ năng lực</h2>
                    <p className="text-sm text-gray-500 mt-1">Quản lý bằng cấp và thương hiệu cá nhân</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm">Cập nhật hồ sơ</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">👩‍🏫</div>
                        <h3 className="text-lg font-bold text-gray-900">{profile.fullName}</h3>
                        <p className="text-sm text-blue-600 font-medium mt-1">{profile.role} • {profile.experience}</p>
                        <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <div><p className="text-2xl font-extrabold text-gray-900">{profile.rating}</p><p className="text-xs text-gray-400 font-medium mt-0.5">Đánh giá TB</p></div>
                            <div><p className="text-2xl font-extrabold text-gray-900">{profile.successRate}%</p><p className="text-xs text-gray-400 font-medium mt-0.5">Tỷ lệ thành công</p></div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-blue-800 mb-3">Triết lý giảng dạy</h3>
                        <p className="text-sm text-blue-700 leading-relaxed">"{profile.bio}"</p>
                    </div>
                </div>
                <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Chứng chỉ & Bằng cấp đã xác minh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.certifications.map((cert, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                                <span className="text-2xl flex-shrink-0">{cert.icon}</span>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{cert.title}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{cert.issuer && `${cert.issuer} • `}{cert.year}</p>
                                </div>
                                <svg className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                        ))}
                        <button className="border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-5 hover:border-blue-300 cursor-pointer group transition-all">
                            <span className="text-sm font-semibold text-gray-400 group-hover:text-blue-500">+ Thêm chứng chỉ mới</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
