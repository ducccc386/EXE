import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import TutorProfile from "./TutorProfile";
import {
  getMyStats, getMyClasses, getMySchedule,
  getMyEarnings, getPendingReport, reportSessionComplete
} from "../../services/tutorService";

const HomeIcon  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const CalIcon   = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const WalletIcon= () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>;
const UserIcon  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

const menuItems = [
  { id: 'dashboard', label: 'Bảng điều khiển', Icon: HomeIcon },
  { id: 'schedule',  label: 'Lịch dạy & Lớp học', Icon: CalIcon },
  { id: 'earnings',  label: 'Thu nhập & Ví tiền',  Icon: WalletIcon },
  { id: 'profile',   label: 'Hồ sơ năng lực',      Icon: UserIcon },
];

export default function TutorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats]               = useState(null);
  const [classes, setClasses]           = useState([]);
  const [schedule, setSchedule]         = useState([]);
  const [earnings, setEarnings]         = useState([]);
  const [pendingReport, setPendingReport] = useState(null);
  const [isReported, setIsReported]     = useState(false);

  useEffect(() => {
    getMyStats().then(setStats);
    getMyClasses().then(setClasses);
    getMySchedule().then(setSchedule);
    getMyEarnings().then(setEarnings);
    getPendingReport().then(setPendingReport);
  }, []);

  const handleReportSession = async () => {
    if (!pendingReport) return;
    await reportSessionComplete(pendingReport.classId, pendingReport.sessionNumber);
    setIsReported(true);
    alert("Báo cáo hoàn thành buổi học thành công! Đang chờ Phụ huynh xác nhận giải ngân.");
  };

  const todaySession = schedule.find(s => s.date === "Hôm nay");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-[116px]">

        {/* SIDEBAR */}
        <aside className="w-60 bg-white border-r border-gray-100 flex flex-col sticky top-[116px] h-[calc(100vh-116px)] shadow-sm">
          <div className="px-5 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Gia sư</p>
            <h2 className="text-base font-bold text-gray-900">Dr. Teresa Thompson</h2>
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
              <p className="text-xs font-semibold text-orange-500 mb-0.5">Số dư khả dụng</p>
              <p className="text-base font-extrabold text-gray-900">{stats ? stats.availableBalance.toLocaleString() + 'đ' : '…'}</p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Chào, Dr. Teresa Thompson</h1>
                    <p className="text-sm text-gray-500 mt-1">Hệ thống đang vận hành ổn định • 24/03/2026</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-semibold text-green-700">Đang trực tuyến</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats && [
                    { label: 'Lớp đang dạy',        val: `${String(stats.activeClasses).padStart(2,'0')}`,   color: 'text-blue-600' },
                    { label: 'Đánh giá trung bình',  val: stats.avgRating, sub: '/5',                         color: 'text-green-600' },
                    { label: 'Giờ dạy tháng này',    val: stats.monthlyHours, sub: 'h',                       color: 'text-orange-500' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 mb-2">{s.label}</p>
                      <p className={`text-3xl font-extrabold ${s.color}`}>{s.val}<span className="text-lg font-bold text-gray-400">{s.sub}</span></p>
                    </div>
                  ))}
                </div>

                {pendingReport && (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-base font-bold text-gray-900">Công việc cần xử lý</h2>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-bold text-gray-900">{pendingReport.subject} — Học sinh: {pendingReport.student}</h3>
                            <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-orange-100">Buổi {pendingReport.sessionNumber}: Hoàn tất</span>
                          </div>
                          <p className="text-xs text-gray-500">Thời gian: {pendingReport.time} • Trạng thái: Chờ báo cáo để nhận tiền</p>
                        </div>
                        {!isReported ? (
                          <button onClick={handleReportSession} className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors shadow-sm">Báo cáo hoàn thành</button>
                        ) : (
                          <span className="flex-shrink-0 flex items-center gap-1.5 text-green-600 font-semibold text-sm bg-green-50 px-4 py-2 rounded-full border border-green-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Đã báo cáo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">Lịch dạy & Lớp học</h1>
                  <p className="text-sm text-gray-500 mt-1">Quản lý thời gian và lớp học trực tuyến</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lớp đang đảm nhận</h3>
                    {classes.map(cls => (
                      <div key={cls.id} className="bg-white border-l-4 border-orange-500 rounded-r-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs text-gray-400 font-mono mb-1">{cls.id} • {cls.completedSessions}/{cls.totalSessions} BUỔI</p>
                        <h4 className="text-base font-bold text-gray-900">{cls.subject}</h4>
                        <p className="text-sm text-gray-500 mt-1">Học viên: {cls.student}</p>
                      </div>
                    ))}
                    <button className="w-full py-3.5 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-semibold text-sm hover:border-orange-300 hover:text-orange-500 transition-all">+ Đăng ký thêm lớp mới</button>
                  </div>
                  <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    {todaySession ? (
                      <div className="flex items-center gap-5 p-5 rounded-xl bg-orange-500 text-white">
                        <div className="text-center min-w-[72px] border-r border-white/30 pr-5">
                          <p className="text-xs font-semibold text-orange-100 uppercase">{todaySession.date}</p>
                          <p className="text-xl font-extrabold">{todaySession.displayDate}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold leading-tight">{todaySession.subject} — {todaySession.student}</h4>
                          <p className="text-xs text-orange-100 mt-0.5">{todaySession.time} • Online</p>
                        </div>
                        <button className="flex-shrink-0 bg-white text-orange-600 font-semibold px-4 py-2 rounded-full text-sm hover:shadow-md transition-all">Vào dạy ngay</button>
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-10 text-sm">Không có lịch dạy hôm nay</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EARNINGS */}
            {activeTab === 'earnings' && stats && (
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Ví Thu nhập</h1>
                    <p className="text-sm text-gray-500 mt-1">StudyHub Payment Gateway</p>
                  </div>
                  <button className="bg-gray-900 hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm">Rút tiền về ATM</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Số dư khả dụng',         val: stats.availableBalance.toLocaleString() + 'đ',   cls: 'bg-white border-gray-100',     color: 'text-gray-900' },
                    { label: 'Đang ký quỹ (Escrow)',    val: stats.escrowBalance.toLocaleString() + 'đ',     cls: 'bg-blue-50 border-blue-100',   color: 'text-blue-600' },
                    { label: 'Thu nhập tháng này',      val: stats.monthlyEarnings.toLocaleString() + 'đ',   cls: 'bg-green-50 border-green-100', color: 'text-green-600' },
                  ].map((s, i) => (
                    <div key={i} className={`rounded-2xl border p-5 shadow-sm ${s.cls}`}>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{s.label}</p>
                      <p className={`text-2xl font-extrabold ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">Tiến độ giải ngân hợp đồng</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    {earnings.map(e => (
                      <div key={e.contractId} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{e.subject} — {e.student}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Mã HĐ: #{e.contractId} • Đã dạy {e.completedSessions}/{e.totalSessions} buổi</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-extrabold text-blue-600 mb-1">{e.amount.toLocaleString()}đ</p>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${isReported ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                            {isReported ? 'Đã báo cáo – Chờ giải ngân' : 'Chờ PH xác nhận'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && <TutorProfile />}
          </div>
        </main>
      </div>
    </div>
  );
}
