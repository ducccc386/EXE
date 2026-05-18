import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import {
  getMatchedTutors, bookTrialSession,
  getMyClasses, confirmSession,
  getEscrow, topUpEscrow,
  getAssessments
} from "../../services/parentService";

const SearchIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const BookIcon   = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ChartIcon  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ShieldIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;

const menuItems = [
  { id: 'perfect-match', label: 'Tìm gia sư',          Icon: SearchIcon },
  { id: 'lop-hoc',       label: 'Lớp học của con',      Icon: BookIcon   },
  { id: 'danh-gia',      label: 'Đánh giá học tập',     Icon: ChartIcon  },
  { id: 'thanh-toan',    label: 'Thanh toán & Ký quỹ',  Icon: ShieldIcon },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('thanh-toan');

  // Data state
  const [tutors, setTutors]           = useState([]);
  const [classes, setClasses]         = useState([]);
  const [escrow, setEscrow]           = useState(null);
  const [assessments, setAssessments] = useState([]);

  // UI state
  const [isScanning, setIsScanning]   = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showTopUp, setShowTopUp]     = useState(false);
  const [showRating, setShowRating]   = useState(false);
  const [rating, setRating]           = useState(0);

  useEffect(() => {
    getMyClasses().then(setClasses);
    getEscrow().then(setEscrow);
    getAssessments().then(setAssessments);
  }, []);

  useEffect(() => {
    if (activeTab === 'perfect-match' && tutors.length === 0) {
      setIsScanning(true);
      getMatchedTutors().then(data => {
        setTimeout(() => { setTutors(data); setIsScanning(false); }, 1800);
      });
    }
  }, [activeTab]);

  const handleBookTrial = async (tutorId) => { await bookTrialSession(tutorId); alert("Đã gửi yêu cầu hẹn dạy thử!"); };

  const handleConfirmSession = async () => {
    const cls = classes.find(c => c.pendingConfirm);
    if (!cls) return;
    await confirmSession(cls.id, cls.pendingSessionNumber);
    setIsConfirmed(true);
    setShowRating(true);
  };

  const activeClass = classes[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-[116px]">

        {/* SIDEBAR */}
        <aside className="w-60 bg-white border-r border-gray-100 flex flex-col sticky top-[116px] h-[calc(100vh-116px)] shadow-sm">
          <div className="px-5 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phụ huynh</p>
            <h2 className="text-base font-bold text-gray-900">StudyHub</h2>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {menuItems.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === id ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}>
                <span className={activeTab === id ? "text-orange-500" : "text-gray-400"}><Icon /></span>
                {label}
              </button>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-center">
              <p className="text-xs font-semibold text-orange-500 mb-0.5">Tiền ký quỹ (Escrow)</p>
              <p className="text-base font-extrabold text-gray-900">{escrow ? escrow.frozenAmount.toLocaleString() + 'đ' : '…'}</p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">

            {/* PERFECT MATCH */}
            {activeTab === 'perfect-match' && (
              <div>
                {isScanning ? (
                  <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-14 h-14 mb-4">
                      <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xl">🧠</div>
                    </div>
                    <p className="text-base font-bold text-gray-700">AI đang phân tích hồ sơ...</p>
                    <p className="text-sm text-gray-400 mt-1">Vui lòng chờ trong giây lát</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">The Perfect Match</h1>
                      <p className="text-sm text-gray-500 mt-1">Top gia sư phù hợp nhất dựa trên thuật toán AI Matching</p>
                    </div>
                    <div className="space-y-4">
                      {tutors.map(tutor => (
                        <div key={tutor.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold">{tutor.matchScore}% MATCH</div>
                          <div className="flex gap-5">
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <img src={tutor.avatar} className="w-16 h-16 rounded-2xl border border-gray-100 shadow-sm" alt="avatar" />
                              <span className="text-xs text-gray-400 font-medium">{tutor.distance}</span>
                            </div>
                            <div className="flex-1 pr-16">
                              <h3 className="text-lg font-bold text-gray-900 mb-1.5">{tutor.name}</h3>
                              <div className="flex gap-1.5 mb-3">{tutor.tags.map((tag, i) => <span key={i} className="text-xs font-medium px-2 py-0.5 bg-orange-50 rounded-full text-orange-600">{tag}</span>)}</div>
                              <p className="text-sm text-gray-600 mb-4">"{tutor.bio}"</p>
                              <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-orange-500">{tutor.price.toLocaleString()}đ/buổi</span>
                                <div className="flex gap-2">
                                  <button onClick={() => handleBookTrial(tutor.id)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors shadow-sm">Hẹn dạy thử</button>
                                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2 rounded-full text-sm transition-colors">Xem hồ sơ</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LỚP HỌC */}
            {activeTab === 'lop-hoc' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Lớp học của con</h2>
                  <p className="text-sm text-gray-500 mt-1">Theo dõi tiến độ và quản lý các lớp học đang hoạt động</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classes.map(cls => (
                    <div key={cls.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Hợp đồng #{cls.contractId}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cls.subject}</h3>
                      <p className="text-sm text-gray-500 mb-4">Gia sư: {cls.tutorName} • {cls.completedSessions}/{cls.totalSessions} buổi</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5"><span>Tiến độ</span><span>{cls.completedSessions}/{cls.totalSessions} buổi</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(cls.completedSessions / cls.totalSessions) * 100}%` }}></div></div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">Lịch biểu</button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors">Tài liệu</button>
                      </div>
                    </div>
                  ))}

                  {activeClass?.pendingConfirm && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2">Cần xác nhận</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Buổi học #{activeClass.pendingSessionNumber} — {activeClass.subject}</h3>
                      <p className="text-sm text-gray-500 mb-4">Gia sư {activeClass.tutorName} báo cáo hoàn thành • {activeClass.lastDate}</p>
                      {!isConfirmed ? (
                        <button onClick={handleConfirmSession} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm">Xác nhận & Giải ngân</button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-2.5 bg-green-50 rounded-xl border border-green-100">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-sm font-semibold text-green-700">Đã xác nhận & Giải ngân</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ĐÁNH GIÁ HỌC TẬP */}
            {activeTab === 'danh-gia' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Đánh giá học tập</h2>
                  <p className="text-sm text-gray-500 mt-1">Theo dõi tiến bộ và kết quả học tập của con</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Buổi học hoàn thành', val: '8',    color: 'text-blue-600' },
                    { label: 'Điểm kiểm tra TB',    val: '8.5',  color: 'text-green-600' },
                    { label: 'Tỷ lệ đi học',        val: '100%', color: 'text-orange-500' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 mb-2">{s.label}</p>
                      <p className={`text-3xl font-extrabold ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {assessments.map(a => (
                    <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{a.subject}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Gia sư {a.tutorName} • {a.date}</p>
                        </div>
                        <div className="flex gap-4 text-center">
                          {[['Chuyên cần', a.scores.attendance], ['Tiếp thu', a.scores.comprehension], ['Thái độ', a.scores.attitude]].map(([lbl, val]) => (
                            <div key={lbl}><p className="text-lg font-extrabold text-blue-600">{val}/10</p><p className="text-xs text-gray-400">{lbl}</p></div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm text-blue-800 leading-relaxed">"{a.feedback}"</p>
                        <p className="text-xs text-blue-400 font-semibold mt-2">Kế hoạch tiếp theo: {a.plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* THANH TOÁN */}
            {activeTab === 'thanh-toan' && escrow && (
              <div>
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Ví Ký quỹ An toàn</h2>
                    <p className="text-sm text-gray-500 mt-1">Hệ thống bảo vệ tài chính StudyHub Escrow</p>
                  </div>
                  <button onClick={() => setShowTopUp(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm">Nạp học phí mới</button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2">Đang đóng băng</p>
                    <p className="text-2xl font-extrabold text-gray-900">{escrow.frozenAmount.toLocaleString()}đ</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Đã giải ngân</p>
                    <p className="text-2xl font-extrabold text-gray-900">{escrow.releasedThisMonth.toLocaleString()}đ</p>
                  </div>
                  <div onClick={() => setShowTopUp(true)} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-orange-200 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <p className="text-sm font-semibold text-orange-500">Nạp học phí</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100"><h3 className="text-base font-bold text-gray-900">Hợp đồng đang bảo vệ</h3></div>
                  <div className="p-6 space-y-3">
                    {escrow.contracts.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                          <p className="text-xs font-mono text-blue-500 mb-1">{c.id}</p>
                          <p className="text-sm font-bold text-gray-900">{c.subject} — Gia sư {c.tutorName}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{c.completedSessions}/{c.totalSessions} buổi hoàn tất • {c.lastSession}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-extrabold text-gray-900 mb-1">{c.totalAmount.toLocaleString()}đ</p>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">Đang bảo vệ</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* TOP UP MODAL */}
      {showTopUp && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTopUp(false)}></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Nạp học phí</h3>
            <p className="text-sm text-gray-500 mb-5">Chọn số tiền muốn nạp vào ví ký quỹ</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[1000000, 2000000, 3000000, 5000000].map(amt => (
                <button key={amt} onClick={() => topUpEscrow(amt, 'momo')} className="py-3 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all">{amt.toLocaleString()}đ</button>
              ))}
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors mb-2 shadow-sm">Nạp tiền qua MoMo / ZaloPay</button>
            <button onClick={() => setShowTopUp(false)} className="w-full py-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">Huỷ bỏ</button>
          </div>
        </div>
      )}

      {/* RATING MODAL */}
      {showRating && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRating(false)}></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">Đánh giá gia sư</h3>
            <p className="text-sm text-gray-500 mb-5 text-center">Chia sẻ trải nghiệm của bạn</p>
            <div className="flex justify-center gap-2 mb-5">
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => setRating(star)} className={`text-3xl transition-transform hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-gray-200'}`}>★</button>
              ))}
            </div>
            <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 resize-none mb-4" rows={3} placeholder="Nhận xét về buổi học..."></textarea>
            <button onClick={() => setShowRating(false)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors mb-2 shadow-sm">Gửi đánh giá</button>
            <button onClick={() => setShowRating(false)} className="w-full py-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">Bỏ qua</button>
          </div>
        </div>
      )}
    </div>
  );
}
