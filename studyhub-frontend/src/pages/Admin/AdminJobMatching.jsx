import React, { useState } from 'react';

const pendingJobs = [
    {
        id: "JOB-2026-001",
        parentName: "Chị Lan (Quận 10)",
        subject: "Toán lớp 10",
        studentPersonality: "Hướng nội, cần gia sư kiên nhẫn",
        coords: { lat: 10.776, lng: 106.667 }, // Tọa độ Phụ huynh
        candidates: [
            {
                id: "TUT-9901",
                name: "Đặng Tuấn",
                dist: "1.2 km",
                personalityScore: 92,
                tutorCoords: { lat: 10.780, lng: 106.670 },
                tags: ["Kiên nhẫn", "Tâm lý"]
            },
            {
                id: "TUT-8824",
                name: "Lê Minh Anh",
                dist: "5.5 km",
                personalityScore: 75,
                tutorCoords: { lat: 10.823, lng: 106.629 },
                tags: ["Nghiêm túc", "Chuyên môn cao"]
            }
        ]
    }
];

export default function AdminJobMatching() {
    const [jobs, setJobs] = useState(pendingJobs);
    const [selectedJob, setSelectedJob] = useState(jobs[0]);

    const handleMatch = (jobId, tutorName) => {
        alert(`The Perfect Match: Đã kết nối thành công Gia sư ${tutorName} với lớp ${jobId}!`);
        const newJobs = jobs.filter(j => j.id !== jobId);
        setJobs(newJobs);
        setSelectedJob(newJobs.length > 0 ? newJobs[0] : null);
    };

    if (!selectedJob) return <div className="p-20 text-center text-slate-500 font-black uppercase italic">Hiện tại không có lớp học nào cần điều phối</div>;

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                    The <span className="text-blue-500">Perfect Match</span> Engine
                </h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Hệ thống gợi ý dựa trên Lat/Long & Tâm lý học</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* CỘT TRÁI: YÊU CẦU TỪ PHỤ HUYNH */}
                <div className="xl:col-span-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sticky top-32 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-orange-500/10">🏠</div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase">Mã lớp học</p>
                                <p className="text-lg font-black text-white tracking-tighter">{selectedJob.id}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 bg-slate-950/50 rounded-3xl border border-slate-800">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Đặc điểm học sinh</p>
                                <p className="text-sm text-slate-200 italic">"{selectedJob.studentPersonality}"</p>
                            </div>

                            <div className="p-5 bg-slate-950/50 rounded-3xl border border-slate-800">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Vị trí địa lý (GPS)</p>
                                <div className="flex justify-between items-center font-mono text-[10px] text-blue-400">
                                    <span>LAT: {selectedJob.coords.lat}</span>
                                    <span>LNG: {selectedJob.coords.lng}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: GIA SƯ ĐƯỢC ĐỀ XUẤT */}
                <div className="xl:col-span-8 space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Top ứng viên phù hợp nhất (AI Suggestion)</p>

                    {selectedJob.candidates.map((tutor) => (
                        <div key={tutor.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <p className="text-right text-[10px] font-black text-slate-500 uppercase mb-1">Match Score</p>
                                <p className={`text-4xl font-black tracking-tighter ${tutor.personalityScore > 80 ? 'text-green-500' : 'text-blue-500'}`}>
                                    {tutor.personalityScore}%
                                </p>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/40">
                                    {tutor.name.split(' ').pop().charAt(0)}
                                </div>
                                <div className="flex-1 pr-24">
                                    <h4 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                        {tutor.name}
                                    </h4>
                                    <div className="flex gap-2 mt-2">
                                        {tutor.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-black px-2 py-0.5 bg-white/5 rounded-md text-slate-400 uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800">
                                            <p className="text-[8px] font-black text-slate-600 uppercase">Khoảng cách</p>
                                            <p className="text-sm font-black text-white">🚗 {tutor.dist}</p>
                                        </div>
                                        <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800">
                                            <p className="text-[8px] font-black text-slate-600 uppercase">Tương hợp tính cách</p>
                                            <p className="text-sm font-black text-green-400">🔥 Rất cao</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3 border-t border-white/5 pt-6">
                                <button
                                    onClick={() => handleMatch(selectedJob.id, tutor.name)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all"
                                >
                                    Kết nối Perfect Match
                                </button>
                                <button className="px-8 bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl uppercase text-[10px]">
                                    Xem Hồ sơ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}