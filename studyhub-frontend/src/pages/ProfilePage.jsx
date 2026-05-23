import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/usePreferences";

// ─── Tab: Account Setting ─────────────────────────────────────────────────────
function AccountTab({ user, text }) {
  return (
    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-black mx-auto shadow-lg">
            {(user?.fullName || "U").split(" ").pop()?.[0]?.toUpperCase() || "U"}
          </div>
          <h2 className="text-lg font-extrabold text-gray-900 mt-3">{user?.fullName || "StudyHub User"}</h2>
          <p className="text-gray-400 text-sm">{user?.email || "example@studyhub.vn"}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-blue-50 p-3">
              <p className="text-xs text-gray-400">{text.role}</p>
              <p className="font-bold text-blue-600 mt-0.5 text-sm">{user?.role || "member"}</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-3">
              <p className="text-xs text-gray-400">{text.status}</p>
              <p className="font-bold text-orange-600 mt-0.5 text-sm">{text.active}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:col-span-8 space-y-5">
        {/* Profile Info */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">{text.profileInfo}</h3>
          <p className="text-sm text-gray-400 mt-1">{text.profileInfoSub}</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              {text.upload}
            </button>
          </div>
          <div className="mt-6 flex gap-3 items-end max-w-xl mx-auto">
            <label className="flex-1">
              <span className="text-sm font-medium text-gray-600">{text.username}</span>
              <input
                defaultValue={user?.fullName || ""}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <button className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              {text.save}
            </button>
          </div>
          <div className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            <p className="font-medium text-gray-700 mb-1">{text.currentEmail}</p>
            <p>{user?.email || "example@studyhub.vn"}</p>
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">{text.changePass}</h3>
          <p className="text-sm text-gray-400 mt-1">{text.changePassSub}</p>
          <div className="mt-5 space-y-3 max-w-xl">
            <input type="password" placeholder={text.currentPass} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="password" placeholder={text.newPass} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="password" placeholder={text.confirmPass} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 text-sm transition-colors">{text.submit}</button>
          </div>
        </section>

        {/* Change Email */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">{text.changeEmail}</h3>
          <p className="text-sm text-gray-400 mt-1">{text.changeEmailSub}</p>
          <div className="mt-5 space-y-3 max-w-xl">
            <input type="email" placeholder={text.newEmail} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="email" placeholder={text.confirmEmail} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="password" placeholder={text.confirmPass} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 text-sm transition-colors">{text.submit}</button>
          </div>
        </section>
      </main>
    </div>
  );
}

// ─── ID Upload Box ────────────────────────────────────────────────────────────
function IDUploadBox({ label, preview, onUpload }) {
  const ref = useRef();
  return (
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div
        onClick={() => ref.current.click()}
        className="relative cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors overflow-hidden"
        style={{ height: 200 }}
      >
        {preview ? (
          <img src={preview} alt="ID" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-blue-400">
            {/* Card illustration */}
            <svg viewBox="0 0 80 56" className="w-24 opacity-50" fill="none">
              <rect x="1" y="1" width="78" height="54" rx="5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2"/>
              <circle cx="20" cy="28" r="10" fill="#93C5FD"/>
              <rect x="36" y="18" width="32" height="4" rx="2" fill="#BAE6FD"/>
              <rect x="36" y="28" width="24" height="4" rx="2" fill="#BAE6FD"/>
              <rect x="36" y="38" width="28" height="4" rx="2" fill="#BAE6FD"/>
            </svg>
            <span className="flex items-center gap-1.5 text-sm font-semibold bg-white/80 text-blue-600 px-4 py-1.5 rounded-full shadow-sm">
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
              Click to upload
            </span>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => onUpload(e.target.files[0])} />
      </div>
    </div>
  );
}

// ─── Tab: Profile (Identity Verification) ────────────────────────────────────
function ProfileTab() {
  const [step, setStep] = useState(1);
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

  const handleUpload = (file, side) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    side === "front" ? setFrontImg(url) : setBackImg(url);
  };

  const steps = [
    { n: 1, label: "Identification" },
    { n: 2, label: "Resume Info" },
    { n: 3, label: "Availability Schedule" },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Identity Verification</h2>
          <p className="text-gray-400 text-sm mt-1">Upload your ID to help students trust you (optional)</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === s.n ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                  : step > s.n ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.n ? (
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : s.n}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${step === s.n ? "text-gray-800" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${step > s.n ? "bg-green-300" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: ID Upload */}
        {step === 1 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload a photo of the <strong>front and back</strong> of your national ID or passport so that admins can verify your identity.
              This step is <strong>optional</strong> — your ID status does not affect any other features.
            </p>
            <div className="flex gap-4">
              <IDUploadBox label="Front Side" preview={frontImg} onUpload={f => handleUpload(f, "front")} />
              <IDUploadBox label="Back Side" preview={backImg} onUpload={f => handleUpload(f, "back")} />
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                Upload ID &amp; Continue
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-2.5 text-sm transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Resume Info */}
        {step === 2 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900">Resume Information</h3>
            <p className="text-sm text-gray-400">Tell students about your qualifications and experience.</p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Education</label>
                <input placeholder="e.g. Bachelor of Science in Mathematics — VNU" className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Teaching Experience</label>
                <textarea rows={3} placeholder="Describe your teaching background..." className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Certifications</label>
                <input placeholder="e.g. IELTS 8.0, TOEIC 980..." className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-gray-200 text-gray-600 font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 text-sm transition-colors">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Availability Schedule */}
        {step === 3 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-gray-900">Availability Schedule</h3>
            <p className="text-sm text-gray-400">Select the days and time slots you're available to teach.</p>
            <div className="grid grid-cols-7 gap-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
                <label key={day} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                  <span className="text-xs font-semibold text-gray-600">{day}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-600">From</label>
                <input type="time" className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">To</label>
                <input type="time" className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(2)} className="flex-1 rounded-xl border border-gray-200 text-gray-600 font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors">Back</button>
              <button className="flex-1 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 text-sm transition-colors">Submit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Friends ─────────────────────────────────────────────────────────────
const MOCK_PENDING_SENT = [
  { id: 1, name: "Hải Minh Lê", avatar: null, initials: "HL" },
];

function UserAvatar({ name, avatar, initials, size = 10 }) {
  if (avatar) return <img src={avatar} alt={name} className={`w-${size} h-${size} rounded-full object-cover`} />;
  return (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold`}>
      {initials || name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

function FriendsTab() {
  const [search, setSearch] = useState("");
  const [pendingSent] = useState(MOCK_PENDING_SENT);

  return (
    <div className="p-6 md:p-8 space-y-5 max-w-3xl mx-auto">
      {/* Find Friends */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Find Your Friends</h3>
        <p className="text-sm text-gray-400 mb-4">Search and connect with other users</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter your friend's username"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
            Search
          </button>
        </div>
        {search.length > 0 && (
          <div className="mt-3 text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
            No users found for "{search}"
          </div>
        )}
      </section>

      {/* Your Friends */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Your Friends</h3>
        <p className="text-sm text-gray-400 mb-4">Manage your connections and rate your tutors</p>
        <div className="text-sm text-gray-400 text-center py-8">
          No friends yet
        </div>
      </section>

      {/* Pending Requests */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-gray-900">Pending Friend Requests</h3>

        {/* Requests sent to you */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Requests Sent to You</p>
          <p className="text-sm text-gray-400">No incoming friend requests.</p>
        </div>

        {/* Requests you sent */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Requests You Sent</p>
          {pendingSent.length === 0 ? (
            <p className="text-sm text-gray-400">No pending requests.</p>
          ) : (
            <div className="space-y-2">
              {pendingSent.map(u => (
                <div key={u.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={u.name} avatar={u.avatar} initials={u.initials} size={10} />
                    <span className="text-sm font-semibold text-gray-800">{u.name}</span>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-colors font-medium">
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("account");

  const text = lang === "vi"
    ? {
      title: "Cài đặt hồ sơ", subtitle: "Quản lý thông tin cá nhân, tài khoản và bảo mật",
      tabAccount: "Cài đặt tài khoản", tabProfile: "Hồ sơ", tabFriends: "Bạn bè",
      role: "Vai trò", status: "Trạng thái", active: "Đang hoạt động",
      profileInfo: "Thông tin hồ sơ", profileInfoSub: "Quản lý ảnh đại diện, tên người dùng và email",
      upload: "Tải ảnh", username: "Tên người dùng", save: "Lưu", currentEmail: "Email hiện tại",
      changePass: "Đổi mật khẩu", changePassSub: "Cập nhật mật khẩu để bảo vệ tài khoản",
      currentPass: "Mật khẩu hiện tại", newPass: "Mật khẩu mới", confirmPass: "Xác nhận mật khẩu",
      submit: "Xác nhận", changeEmail: "Đổi email", changeEmailSub: "Cập nhật địa chỉ email",
      newEmail: "Email mới", confirmEmail: "Xác nhận email",
    }
    : {
      title: "Profile Settings", subtitle: "Manage your account, security, and personal details",
      tabAccount: "Account Setting", tabProfile: "Profile", tabFriends: "Friends",
      role: "Role", status: "Status", active: "Active",
      profileInfo: "Profile Information", profileInfoSub: "Manage your profile picture, username, and email",
      upload: "Upload Photo", username: "Username", save: "Save", currentEmail: "Current Email",
      changePass: "Change Your Password", changePassSub: "Update your password to keep your account secure",
      currentPass: "Current Password", newPass: "New Password", confirmPass: "Confirm Password",
      submit: "Submit", changeEmail: "Change Your Email", changeEmailSub: "Update your email address",
      newEmail: "New Email", confirmEmail: "Confirm Email",
    };

  const tabs = [
    { key: "account",  label: text.tabAccount,  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { key: "profile",  label: text.tabProfile,  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "friends",  label: text.tabFriends,  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">{text.title}</h1>
        </div>

        {/* Tab bar */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 border-b-2 border-blue-500"
                    : "bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "account" && <AccountTab user={user} text={text} />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "friends" && <FriendsTab />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
