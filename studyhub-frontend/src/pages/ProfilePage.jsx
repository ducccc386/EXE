import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/usePreferences";

export default function ProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const text = lang === "vi"
    ? { title: "Cài đặt hồ sơ", subtitle: "Quản lý thông tin cá nhân, tài khoản và bảo mật" }
    : { title: "Profile Settings", subtitle: "Manage your account, security, and personal details" };

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
            <div className="text-center py-4 bg-white dark:bg-slate-900 text-gray-900 dark:text-white">Account Setting</div>
            <div className="text-center py-4">Profile</div>
            <div className="text-center py-4">Friends</div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-3xl font-black mx-auto shadow-lg">
                  {(user?.fullName || "U").split(" ").slice(-1)[0]?.[0] || "U"}
                </div>
                <h2 className="text-xl font-extrabold text-center text-gray-900 dark:text-white mt-4">{user?.fullName || "StudyHub User"}</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">{user?.email || "example@studyhub.vn"}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl bg-blue-50 dark:bg-slate-800 p-4">
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-bold text-blue-700 dark:text-blue-300 mt-1">{user?.role || "member"}</p>
                  </div>
                  <div className="rounded-2xl bg-orange-50 dark:bg-slate-800 p-4">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-bold text-orange-700 dark:text-orange-300 mt-1">Active</p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-8 space-y-6">
              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Profile Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your profile picture, username, and email</p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl text-slate-500">👤</div>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Upload Photo</button>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end max-w-2xl mx-auto">
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Username</span>
                    <input defaultValue={user?.fullName || "Son Giang"} className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  </label>
                  <button className="px-4 py-3 rounded-2xl bg-blue-500 text-white font-semibold">Save</button>
                </div>
                <div className="mt-6 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-400">
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Current Email</p>
                  <p>{user?.email || "example@studyhub.vn"}</p>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Change Your Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your password to keep your account secure</p>
                <div className="mt-6 space-y-4 max-w-4xl">
                  <input placeholder="Current Password" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder="New Password" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder="Confirm Password" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <button className="w-full rounded-2xl bg-blue-400 text-white font-semibold py-3">Submit</button>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Change Your Email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your email address</p>
                <div className="mt-6 space-y-4 max-w-4xl">
                  <input placeholder="New Email" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder="Confirm Email" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input placeholder="Confirm Password" className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400" />
                  <button className="w-full rounded-2xl bg-blue-400 text-white font-semibold py-3">Submit</button>
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
