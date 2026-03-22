import React from 'react';

const assessments = [
    {
        id: 1,
        subject: "Toán giải tích lớp 12",
        student: "Lê Minh Anh",
        tutor: "Gia sư Trần Trung",
        date: "22/03/2026",
        scores: { attendance: 10, comprehension: 8, attitude: 9 },
        feedback: "Em Anh nắm vững công thức đạo hàm, tuy nhiên phần khảo sát hàm số cần chú ý kỹ hơn các điểm cực trị. Bài tập về nhà hoàn thành đầy đủ.",
        plan: "Buổi tới sẽ tập trung luyện đề thi thử đại học phần Hàm số."
    },
    {
        id: 2,
        subject: "Tiếng Anh Giao tiếp",
        student: "Lê Minh Anh",
        tutor: "Gia sư Sarah",
        date: "20/03/2026",
        scores: { attendance: 9, comprehension: 9, attitude: 10 },
        feedback: "Phát âm (Pronunciation) có tiến bộ rõ rệt, đặc biệt là các âm đuôi. Phản xạ nghe nói tự nhiên hơn.",
        plan: "Mở rộng từ vựng chủ đề Travel và Work."
    }
];

export default function LearningAssessment() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    Đánh giá học tập <span className="text-orange-500">/ Theo tuần</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {assessments.map((item) => (
                    <div key={item.id} className="bg-zinc-900/80 border border-white/5 p-6 rounded-3xl hover:border-orange-500/30 transition-all">
                        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                            <div>
                                <p className="text-orange-500 text-xs font-black uppercase mb-1">{item.subject}</p>
                                <h3 className="text-xl font-bold text-white">Học sinh: {item.student}</h3>
                                <p className="text-gray-500 text-sm font-medium">Gia sư: {item.tutor}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-2xl flex gap-6 px-6 self-start">
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Chuyên cần</p>
                                    <p className="text-lg font-black text-white">{item.scores.attendance}/10</p>
                                </div>
                                <div className="text-center border-x border-white/10 px-6">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Hiểu bài</p>
                                    <p className="text-lg font-black text-white">{item.scores.comprehension}/10</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Thái độ</p>
                                    <p className="text-lg font-black text-white">{item.scores.attitude}/10</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-xs font-black text-blue-400 uppercase mb-2">Nhận xét từ gia sư</p>
                                <p className="text-sm text-gray-300 leading-relaxed italic">"{item.feedback}"</p>
                            </div>

                            <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
                                <p className="text-xs font-black text-orange-500 uppercase mb-2">Kế hoạch cải thiện</p>
                                <p className="text-sm text-white font-medium">🎯 {item.plan}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <p className="text-[10px] text-gray-600 font-bold uppercase">Ngày đánh giá: {item.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}