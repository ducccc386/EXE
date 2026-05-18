import React, { useState, useEffect } from 'react';
import { getPendingJobs, matchJob } from '../../services/adminService';

export default function AdminJobMatching() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => { getPendingJobs().then(data => { setJobs(data); setSelectedJob(data[0] ?? null); }); }, []);

    const handleMatch = async (jobId, tutorId, tutorName) => {
        await matchJob(jobId, tutorId);
        alert(`Perfect Match: Đã kết nối Gia sư ${tutorName} với lớp ${jobId}!`);
        const newJobs = jobs.filter(j => j.id !== jobId);
        setJobs(newJobs);
        setSelectedJob(newJobs[0] ?? null);
    };

    if (!selectedJob) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="font-semibold text-gray-600">Hiện tại không có lớp nào cần điều phối</p>
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">The Perfect Match Engine</h2>
                <p className="text-sm text-gray-500 mt-1">Hệ thống gợi ý dựa trên vị trí địa lý & tính cách</p>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-32">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Mã lớp học</p><p className="text-sm font-bold text-gray-900">{selectedJob.id}</p></div>
                        </div>
                        <div className="space-y-4">
                            <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phụ huynh</p><p className="text-sm font-semibold text-gray-800">{selectedJob.parentName}</p></div>
                            <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Môn học</p><p className="text-sm font-semibold text-gray-800">{selectedJob.subject}</p></div>
                            <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Đặc điểm học sinh</p><p className="text-sm text-gray-700 italic">"{selectedJob.studentPersonality}"</p></div>
                            <div className="bg-blue-50 rounded-xl p-4"><p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Vị trí GPS</p><p className="text-xs font-mono text-blue-700">LAT: {selectedJob.coords.lat} • LNG: {selectedJob.coords.lng}</p></div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8 space-y-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Top ứng viên phù hợp nhất</p>
                    {selectedJob.candidates.map(tutor => (
                        <div key={tutor.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-lg text-blue-600 flex-shrink-0">{tutor.name.split(' ').pop().charAt(0)}</div>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">{tutor.name}</h4>
                                        <div className="flex gap-1.5 mt-1">{tutor.tags.map(tag => <span key={tag} className="text-xs font-medium px-2 py-0.5 bg-blue-50 rounded-full text-blue-600">{tag}</span>)}</div>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Match Score</p>
                                    <p className={`text-3xl font-extrabold ${tutor.personalityScore > 80 ? 'text-green-600' : 'text-blue-600'}`}>{tutor.personalityScore}%</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-5">
                                <div className="bg-gray-50 rounded-xl p-3.5"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Khoảng cách</p><p className="text-sm font-bold text-gray-800">{tutor.dist}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3.5"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Tương hợp tính cách</p><p className={`text-sm font-bold ${tutor.personalityScore > 80 ? 'text-green-600' : 'text-gray-700'}`}>{tutor.personalityScore > 80 ? 'Rất cao' : 'Khá tốt'}</p></div>
                            </div>
                            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                                <button onClick={() => handleMatch(selectedJob.id, tutor.id, tutor.name)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm">Kết nối Perfect Match</button>
                                <button className="px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors">Xem hồ sơ</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
