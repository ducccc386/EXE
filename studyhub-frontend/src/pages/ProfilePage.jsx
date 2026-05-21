import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/usePreferences";

export default function ProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const text = lang === "vi"
    ? {
      title: "Cài đặt hồ sơ",
      subtitle: "Quản lý thông tin cá nhân, tài khoản và bảo mật",
      tabAccount: "Cài đặt tài khoản",
      tabProfile: "Hồ sơ",
      tabFriends: "Bạn bè",
      role: "Vai trò",
      status: "Trạng thái",
      active: "Đang hoạt động",
      profileInfo: "Thông tin hồ sơ",
      profileInfoSub: "Quản lý ảnh đại diện, tên người dùng và email",
      upload: "Tải ảnh",
      username: "Tên người dùng",
      save: "Lưu",
      currentEmail: "Email hiện tại",
      changePass: "Đổi mật khẩu",
      changePassSub: "Cập nhật mật khẩu để bảo vệ tài khoản",
      currentPass: "Mật khẩu hiện tại",
      newPass: "Mật khẩu mới",
      confirmPass: "Xác nhận mật khẩu",
      submit: "Xác nhận",
      changeEmail: "Đổi email",
      changeEmailSub: "Cập nhật địa chỉ email",
      newEmail: "Email mới",
      confirmEmail: "Xác nhận email",
    }
    : {
      title: "Profile Settings",
      subtitle: "Manage your account, security, and personal details",
      tabAccount: "Account Setting",
      tabProfile: "Profile",
      tabFriends: "Friends",
      role: "Role",
      status: "Status",
      active: "Active",
      profileInfo: "Profile Information",
      profileInfoSub: "Manage your profile picture, username, and email",
      upload: "Upload Photo",
      username: "Username",
      save: "Save",
      currentEmail: "Current Email",
      changePass: "Change Your Password",
      changePassSub: "Update your password to keep your account secure",
      currentPass: "Current Password",
      newPass: "New Password",
      confirmPass: "Confirm Password",
      submit: "Submit",
      changeEmail: "Change Your Email",
      changeEmailSub: "Update your email address",
      newEmail: "New Email",
      confirmEmail: "Confirm Email",
    };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{text.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{text.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/60">
            <div className="text-center py-4 bg-white dark:bg-slate-900 text-gray-900 dark:text-white">{text.tabAccount}</div>
            <div className="text-center py-4">{text.tabProfile}</div>
            <div className="text-center py-4">{text.tabFriends}</div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-3xl font-black mx-auto shadow-lg">
                  {(user?.fullName || "U").split(" ").slice(-1)[0]?.[0] || "U"}
                </div>
                <h2 className="text-xl font-extrabold text-center text-gray-900 dark:text-white mt-4">{user?.fullName || "StudyHub User"}</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">{user?.email || "example@studyhub.vn"}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl bg-blue-50 dark:bg-slate-800 p-4">
                    <p className="text-xs text-gray-500">{text.role}</p>
                    <p className="font-bold text-blue-700 dark:text-blue-300 mt-1">{user?.role || "member"}</p>
                  </div>
                  <div className="rounded-2xl bg-orange-50 dark:bg-slate-800 p-4">
                    <p className="text-xs text-gray-500">{text.status}</p>
                    <p className="font-bold text-orange-700 dark:text-orange-300 mt-1">{text.active}</p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-8 space-y-6">
              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{text.profileInfo}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{text.profileInfoSub}</p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl text-slate-500">👤</div>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">{text.upload}</button>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end max-w-2xl mx-auto">
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{text.username}</span>
                    <input defaultValue={user?.fullName || "Son Giang"} className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  </label>
                  <button className="px-4 py-3 rounded-2xl bg-blue-500 text-white font-semibold">{text.save}</button>
                </div>
                <div className="mt-6 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-400">
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{text.currentEmail}</p>
                  <p>{user?.email || "example@studyhub.vn"}</p>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{text.changePass}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{text.changePassSub}</p>
                <div className="mt-6 space-y-4 max-w-4xl">
                  <input placeholder={text.currentPass} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder={text.newPass} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder={text.confirmPass} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <button className="w-full rounded-2xl bg-blue-400 text-white font-semibold py-3">{text.submit}</button>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{text.changeEmail}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{text.changeEmailSub}</p>
                <div className="mt-6 space-y-4 max-w-4xl">
                  <input placeholder={text.newEmail} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder={text.confirmEmail} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder={text.confirmPass} className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <button className="w-full rounded-2xl bg-blue-400 text-white font-semibold py-3">{text.submit}</button>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
