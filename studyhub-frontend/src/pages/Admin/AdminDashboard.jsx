import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import AdminEkycApproval from "./AdminEkycApproval";
import AdminJobMatching from "./AdminJobMatching";
import { getAdminStats, getUsers } from "../../services/adminService";
import AdminFinance from "./AdminFinance";

const LayoutIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg>;
const ShieldIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const BoltIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const WalletIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>;
const UsersIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

const adminMenu = [
  { id: 'dashboard', label: 'Tổng quan', Icon: LayoutIcon },
  { id: 'ekyc', label: 'Duyệt hồ sơ eKYC', Icon: ShieldIcon },
  { id: 'jobs', label: 'Perfect Match', Icon: BoltIcon },
  { id: 'finance', label: 'Thanh toán Escrow', Icon: WalletIcon },
  { id: 'users', label: 'Quản lý người dùng', Icon: UsersIcon },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  useEffect(() => { getUsers().then(setUsers); }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-[116px]">
        {/* SIDEBAR */}
        <aside className="w-60 bg-white border-r border-gray-100 flex flex-col sticky top-[116px] h-[calc(100vh-116px)] shadow-sm">
          <div className="px-5 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Quản trị viên</p>
            <h2 className="text-base font-bold text-gray-900">StudyHub Admin</h2>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {adminMenu.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === id ? "text-blue-600" : "text-gray-400"}><Icon /></span>
                {label}
              </button>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-green-50">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
              <div>
                <p className="text-xs font-semibold text-green-700">Hệ thống ổn định</p>
                <p className="text-xs text-green-500">Uptime 99.9%</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold text-gray-900">Tổng quan hệ thống</h1>
                  <p className="text-sm text-gray-500 mt-1">Chào buổi sáng, Admin — hệ thống đang vận hành ổn định.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Người dùng mới', val: '+128', sub: 'Tuần này', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Chờ duyệt eKYC', val: '15', sub: 'Cần xử lý', color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Lớp cần Match', val: '01', sub: 'Đang chờ', color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Tiền ký quỹ', val: '5.5M', sub: 'Tổng cộng', color: 'text-purple-600', bg: 'bg-purple-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 mb-2">{stat.label}</p>
                      <p className={`text-3xl font-extrabold ${stat.color} mb-1.5`}>{stat.val}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>{stat.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">Hàng đợi ưu tiên</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Các yêu cầu cần xử lý ngay</p>
                    </div>
                    <button onClick={() => setActiveTab('jobs')} className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                      Mở trình Matching
                    </button>
                  </div>
                  <div className="p-4">
                    <div
                      onClick={() => setActiveTab('ekyc')}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Yêu cầu duyệt eKYC mới</p>
                          <p className="text-xs text-gray-400 mt-0.5">Gia sư: Đặng Tuấn • 95% Match • Vừa xong</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 group-hover:underline flex-shrink-0">Xử lý ngay →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ekyc' && <AdminEkycApproval />}
            {activeTab === 'jobs' && <AdminJobMatching />}
            {activeTab === 'finance' && <AdminFinance />}

            {/* USERS */}
            {activeTab === 'users' && (
              <div>
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Quản lý người dùng</h2>
                    <p className="text-sm text-gray-500 mt-1">Cơ sở dữ liệu người dùng tập trung</p>
                  </div>
                  <div className="flex gap-3">
                    <input type="text" placeholder="Tìm kiếm ID hoặc tên..." className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-56" />
                    <button className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-blue-700 transition-colors">Xuất CSV</button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['Thành viên', 'Liên lạc', 'Vai trò', 'Trạng thái', 'Thao tác'].map(h => (
                          <th key={h} className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">{user.name.charAt(0)}</div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <p className="text-xs text-blue-500 font-mono">{user.id}</p>
                                  {user.eKYC && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100 font-semibold">Đã xác minh</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-700">{user.email}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{user.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === 'Tutor' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>{user.role}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.status === 'Approved' || user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{user.status}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
