import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/usePreferences";

// ─── Tab: Account Setting ─────────────────────────────────────────────────────
function AccountTab({ user, text }) {
  return (
    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
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
      <main className="lg:col-span-8 space-y-5">
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">{text.profileInfo}</h3>
          <p className="text-sm text-gray-400 mt-1">{text.profileInfoSub}</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              {text.upload}
            </button>
          </div>
          <div className="mt-6 flex gap-3 items-end max-w-xl mx-auto">
            <label className="flex-1">
              <span className="text-sm font-medium text-gray-600">{text.username}</span>
              <input defaultValue={user?.fullName || ""} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            </label>
            <button className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">{text.save}</button>
          </div>
          <div className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            <p className="font-medium text-gray-700 mb-1">{text.currentEmail}</p>
            <p>{user?.email || "example@studyhub.vn"}</p>
          </div>
        </section>
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
function IDUploadBox({ label, preview, onUpload, uploadLabel }) {
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
            <svg viewBox="0 0 80 56" className="w-24 opacity-50" fill="none">
              <rect x="1" y="1" width="78" height="54" rx="5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2" />
              <circle cx="20" cy="28" r="10" fill="#93C5FD" />
              <rect x="36" y="18" width="32" height="4" rx="2" fill="#BAE6FD" />
              <rect x="36" y="28" width="24" height="4" rx="2" fill="#BAE6FD" />
              <rect x="36" y="38" width="28" height="4" rx="2" fill="#BAE6FD" />
            </svg>
            <span className="flex items-center gap-1.5 text-sm font-semibold bg-white/80 text-blue-600 px-4 py-1.5 rounded-full shadow-sm">
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              {uploadLabel}
            </span>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => onUpload(e.target.files[0])} />
      </div>
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep === s.n ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                : currentStep > s.n ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}>
              {currentStep > s.n ? (
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : s.n}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${currentStep === s.n ? "text-gray-800" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-3 ${currentStep > s.n ? "bg-green-300" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Profile (Identity Verification) ────────────────────────────────────
const TEACHING_STYLES = [
  "Friendly", "Funny", "Easygoing", "Patient", "Encouraging",
  "Serious", "Strict", "Structured", "Interactive", "Creative",
  "Practical", "Detail-oriented",
];

const SUBJECTS = [
  "Math", "Physics", "Chemistry", "Biology", "Literature",
  "English", "History", "Geography", "Computer Science", "Music", "Art",
];

function ProfileTab({ text }) {
  const [step, setStep] = useState(1);

  // Step 1 — ID
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

  // Step 2 — Resume
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [education, setEducation] = useState("");
  const [rate, setRate] = useState("");
  const [rateType, setRateType] = useState("session");
  const [selectedSubjs, setSelectedSubjs] = useState([]);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [styles, setStyles] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({ title: "", duration: "", desc: "" });
  const [showExpForm, setShowExpForm] = useState(false);
  const [certs, setCerts] = useState([]);
  const [newCert, setNewCert] = useState({ name: "", year: "" });
  const [showCertForm, setShowCertForm] = useState(false);

  // Step 3 — Schedule
  const [scheduleRows, setScheduleRows] = useState([]);
  const [newRow, setNewRow] = useState({ day: "", start: "", end: "" });

  const handleUpload = (file, side) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    side === "front" ? setFrontImg(url) : setBackImg(url);
  };

  const toggleStyle = (s) =>
    setStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleSubject = (s) =>
    setSelectedSubjs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const addExperience = () => {
    if (!newExp.title.trim()) return;
    setExperiences(prev => [...prev, { ...newExp, id: Date.now() }]);
    setNewExp({ title: "", duration: "", desc: "" });
    setShowExpForm(false);
  };

  const addCert = () => {
    if (!newCert.name.trim()) return;
    setCerts(prev => [...prev, { ...newCert, id: Date.now() }]);
    setNewCert({ name: "", year: "" });
    setShowCertForm(false);
  };

  const addScheduleRow = () => {
    if (!newRow.day || !newRow.start || !newRow.end) return;
    setScheduleRows(prev => [...prev, { ...newRow, id: Date.now() }]);
    setNewRow({ day: "", start: "", end: "" });
  };

  const steps = [
    { n: 1, label: text.stepIdentification },
    { n: 2, label: text.stepResume },
    { n: 3, label: text.stepSchedule },
  ];

  const inputCls = "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* ── Page header (Step 2 only shows full title) ── */}
        {step === 2 && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">{text.resumePageTitle}</h2>
            <p className="text-gray-400 text-sm mt-1">{text.resumePageSub}</p>
          </div>
        )}
        {step === 3 && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">{text.schedulePageTitle}</h2>
            <p className="text-gray-400 text-sm mt-1">{text.schedulePageSub}</p>
          </div>
        )}
        {step === 1 && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">{text.idVerificationTitle}</h2>
            <p className="text-gray-400 text-sm mt-1">{text.idVerificationSub}</p>
          </div>
        )}

        <StepIndicator steps={steps} currentStep={step} />

        {/* ══════════════ STEP 1: ID Upload ══════════════ */}
        {step === 1 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              {text.idUploadDesc1} <strong>{text.idUploadDescBold}</strong> {text.idUploadDesc2}{" "}
              <strong>{text.idUploadDescOptional}</strong> — {text.idUploadDesc3}
            </p>
            <div className="flex gap-4">
              <IDUploadBox label={text.frontSide} preview={frontImg} onUpload={f => handleUpload(f, "front")} uploadLabel={text.clickToUpload} />
              <IDUploadBox label={text.backSide} preview={backImg} onUpload={f => handleUpload(f, "back")} uploadLabel={text.clickToUpload} />
            </div>
            <div className="space-y-2 pt-2">
              <button onClick={() => setStep(2)} className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {text.uploadAndContinue}
              </button>
              <button onClick={() => setStep(2)} className="w-full rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-2.5 text-sm transition-colors">
                {text.skipForNow}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2: Resume Info ══════════════ */}
        {step === 2 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">

            {/* Full Name */}
            <div>
              <label className={labelCls}>{text.fullName}</label>
              <input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder={text.fullNamePlaceholder}
                className={inputCls}
              />
              <p className="text-xs text-gray-400 mt-1">{text.fullNameHint}</p>
            </div>

            {/* Location */}
            <div>
              <label className={labelCls}>{text.location}</label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder={text.locationPlaceholder}
                className={inputCls}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="teachMode" checked={onlineOnly} onChange={() => setOnlineOnly(true)}
                  className="w-4 h-4 accent-blue-500" />
                <span className="text-sm text-gray-700">{text.availableOnline}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 rounded" />
                <span className="text-sm text-gray-700">{text.emailNotif}</span>
              </label>
            </div>

            {/* Education */}
            <div>
              <label className={labelCls}>{text.education}</label>
              <input
                value={education}
                onChange={e => setEducation(e.target.value)}
                placeholder={text.educationPlaceholder}
                className={inputCls}
              />
            </div>

            {/* Rate + Rate Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{text.rate}</label>
                <input
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  placeholder={text.ratePlaceholder}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>{text.rateType}</label>
                <div className="flex items-center gap-4 mt-2.5">
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                    <input type="radio" name="rateType" value="hour" checked={rateType === "hour"} onChange={() => setRateType("hour")} className="accent-blue-500" />
                    {text.perHour}
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                    <input type="radio" name="rateType" value="session" checked={rateType === "session"} onChange={() => setRateType("session")} className="accent-blue-500" />
                    {text.perSession}
                  </label>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="relative">
              <label className={labelCls}>{text.subjects}</label>
              <button
                type="button"
                onClick={() => setSubjectOpen(o => !o)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-left flex justify-between items-center outline-none focus:ring-2 focus:ring-blue-400"
              >
                <span className={selectedSubjs.length ? "text-gray-800" : "text-gray-400"}>
                  {selectedSubjs.length ? selectedSubjs.join(", ") : text.selectSubjects}
                </span>
                <svg viewBox="0 0 20 20" className={`w-4 h-4 text-gray-400 transition-transform ${subjectOpen ? "rotate-180" : ""}`} fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {subjectOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-3 grid grid-cols-2 gap-1">
                  {SUBJECTS.map(s => (
                    <label key={s} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                      <input type="checkbox" checked={selectedSubjs.includes(s)} onChange={() => toggleSubject(s)} className="accent-blue-500 w-3.5 h-3.5" />
                      {s}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Teaching Style */}
            <div>
              <label className={labelCls}>{text.teachingStyle}</label>
              <p className="text-xs text-gray-400 mb-2">{text.teachingStyleHint}</p>
              <div className="flex flex-wrap gap-2">
                {TEACHING_STYLES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleStyle(s)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${styles.includes(s)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                      }`}
                  >
                    #{s}
                  </button>
                ))}
              </div>
            </div>

            {/* Teaching Experience */}
            <div>
              <label className={labelCls}>{text.teachingExp}</label>
              {experiences.length === 0 ? (
                <p className="text-sm text-gray-400">{text.noExpYet}</p>
              ) : (
                <div className="space-y-2 mb-2">
                  {experiences.map(exp => (
                    <div key={exp.id} className="flex items-start justify-between border border-gray-100 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{exp.title}</p>
                        {exp.duration && <p className="text-xs text-gray-400">{exp.duration}</p>}
                        {exp.desc && <p className="text-xs text-gray-500 mt-0.5">{exp.desc}</p>}
                      </div>
                      <button onClick={() => setExperiences(prev => prev.filter(e => e.id !== exp.id))} className="text-gray-300 hover:text-red-400 ml-3 shrink-0">
                        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showExpForm ? (
                <div className="border border-blue-100 bg-blue-50 rounded-xl p-4 space-y-2 mt-2">
                  <input placeholder={text.expTitle} value={newExp.title} onChange={e => setNewExp(p => ({ ...p, title: e.target.value }))} className={inputCls} />
                  <input placeholder={text.expDuration} value={newExp.duration} onChange={e => setNewExp(p => ({ ...p, duration: e.target.value }))} className={inputCls} />
                  <textarea rows={2} placeholder={text.expDesc} value={newExp.desc} onChange={e => setNewExp(p => ({ ...p, desc: e.target.value }))} className={`${inputCls} resize-none`} />
                  <div className="flex gap-2">
                    <button onClick={() => setShowExpForm(false)} className="flex-1 rounded-lg border border-gray-200 text-gray-500 py-2 text-sm hover:bg-white transition-colors">{text.cancel}</button>
                    <button onClick={addExperience} className="flex-1 rounded-lg bg-blue-500 text-white py-2 text-sm font-semibold hover:bg-blue-600 transition-colors">{text.addBtn}</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowExpForm(true)} className="mt-2 flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  {text.addExperience}
                </button>
              )}
            </div>

            {/* Certifications */}
            <div>
              <label className={labelCls}>{text.certifications}</label>
              {certs.length === 0 ? (
                <p className="text-sm text-gray-400">{text.noCertsYet}</p>
              ) : (
                <div className="space-y-2 mb-2">
                  {certs.map(c => (
                    <div key={c.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                        {c.year && <p className="text-xs text-gray-400">{c.year}</p>}
                      </div>
                      <button onClick={() => setCerts(prev => prev.filter(x => x.id !== c.id))} className="text-gray-300 hover:text-red-400 ml-3">
                        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showCertForm ? (
                <div className="border border-blue-100 bg-blue-50 rounded-xl p-4 space-y-2 mt-2">
                  <input placeholder={text.certName} value={newCert.name} onChange={e => setNewCert(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                  <input placeholder={text.certYear} value={newCert.year} onChange={e => setNewCert(p => ({ ...p, year: e.target.value }))} className={inputCls} />
                  <div className="flex gap-2">
                    <button onClick={() => setShowCertForm(false)} className="flex-1 rounded-lg border border-gray-200 text-gray-500 py-2 text-sm hover:bg-white transition-colors">{text.cancel}</button>
                    <button onClick={addCert} className="flex-1 rounded-lg bg-blue-500 text-white py-2 text-sm font-semibold hover:bg-blue-600 transition-colors">{text.addBtn}</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowCertForm(true)} className="mt-2 flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  {text.addCertification}
                </button>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <button className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 transition-colors">
                {text.saveResume}
              </button>
              <button onClick={() => setStep(3)} className="w-full rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 text-sm flex items-center justify-center gap-2 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                {text.createSchedule}
              </button>
              <button className="w-full rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 transition-colors">
                {text.publishProfile}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3: Availability Schedule ══════════════ */}
        {step === 3 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">

            {/* Add slot row */}
            <div className="grid grid-cols-3 gap-3 items-end">
              <div>
                <label className={labelCls}>{text.dayOfWeek}</label>
                <select
                  value={newRow.day}
                  onChange={e => setNewRow(p => ({ ...p, day: e.target.value }))}
                  className={inputCls}
                >
                  <option value="">{text.selectDay}</option>
                  {text.weekDaysFull.map(d => <option key={d.val} value={d.val}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>{text.startTime}</label>
                <input type="time" value={newRow.start} onChange={e => setNewRow(p => ({ ...p, start: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{text.endTime}</label>
                <input type="time" value={newRow.end} onChange={e => setNewRow(p => ({ ...p, end: e.target.value }))} className={inputCls} />
              </div>
            </div>

            <button
              onClick={addScheduleRow}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              disabled={!newRow.day || !newRow.start || !newRow.end}
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
              {text.addBtn}
            </button>

            {/* Current Schedule */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3">{text.currentSchedule}</h4>
              {scheduleRows.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl">
                  {text.noScheduleYet}
                </div>
              ) : (
                <div className="space-y-2">
                  {scheduleRows.map(row => (
                    <div key={row.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-800 w-8">{row.day}</span>
                        <span className="text-sm text-gray-500">{row.start} — {row.end}</span>
                      </div>
                      <button onClick={() => setScheduleRows(prev => prev.filter(r => r.id !== row.id))} className="text-gray-300 hover:text-red-400">
                        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={() => setStep(2)} className="flex-1 rounded-xl border border-gray-200 text-gray-600 font-medium py-2.5 text-sm hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                {text.backToResume}
              </button>
              <button className="flex-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 text-sm flex items-center justify-center gap-1.5 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {text.saveSchedule}
              </button>
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

function FriendsTab({ text }) {
  const [search, setSearch] = useState("");
  const [pendingSent] = useState(MOCK_PENDING_SENT);

  return (
    <div className="p-6 md:p-8 space-y-5 max-w-3xl mx-auto">
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{text.findFriendsTitle}</h3>
        <p className="text-sm text-gray-400 mb-4">{text.findFriendsSub}</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={text.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
            {text.searchBtn}
          </button>
        </div>
        {search.length > 0 && (
          <div className="mt-3 text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
            {text.noUsersFound.replace("{query}", search)}
          </div>
        )}
      </section>

      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{text.yourFriendsTitle}</h3>
        <p className="text-sm text-gray-400 mb-4">{text.yourFriendsSub}</p>
        <div className="text-sm text-gray-400 text-center py-8">{text.noFriendsYet}</div>
      </section>

      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-gray-900">{text.pendingTitle}</h3>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">{text.requestsToYou}</p>
          <p className="text-sm text-gray-400">{text.noIncoming}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">{text.requestsYouSent}</p>
          {pendingSent.length === 0 ? (
            <p className="text-sm text-gray-400">{text.noPending}</p>
          ) : (
            <div className="space-y-2">
              {pendingSent.map(u => (
                <div key={u.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={u.name} avatar={u.avatar} initials={u.initials} size={10} />
                    <span className="text-sm font-semibold text-gray-800">{u.name}</span>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-colors font-medium">
                    {text.cancel}
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
      // Page
      title: "Cài đặt hồ sơ",
      tabAccount: "Cài đặt tài khoản", tabProfile: "Hồ sơ", tabFriends: "Bạn bè",

      // Account tab
      role: "Vai trò", status: "Trạng thái", active: "Đang hoạt động",
      profileInfo: "Thông tin hồ sơ", profileInfoSub: "Quản lý ảnh đại diện, tên người dùng và email",
      upload: "Tải ảnh", username: "Tên người dùng", save: "Lưu", currentEmail: "Email hiện tại",
      changePass: "Đổi mật khẩu", changePassSub: "Cập nhật mật khẩu để bảo vệ tài khoản",
      currentPass: "Mật khẩu hiện tại", newPass: "Mật khẩu mới", confirmPass: "Xác nhận mật khẩu",
      submit: "Xác nhận", changeEmail: "Đổi email", changeEmailSub: "Cập nhật địa chỉ email",
      newEmail: "Email mới", confirmEmail: "Xác nhận email",

      // Profile tab — Step 1 (CCCD)
      idVerificationTitle: "Xác minh danh tính",
      idVerificationSub: "Tải lên CCCD để học viên tin tưởng bạn hơn (tùy chọn)",
      stepIdentification: "Xác minh CCCD", stepResume: "Thông tin CV", stepSchedule: "Lịch dạy",
      idUploadDesc1: "Tải lên ảnh", idUploadDescBold: "mặt trước và mặt sau",
      idUploadDesc2: "CCCD hoặc hộ chiếu để quản trị viên xác minh. Bước này",
      idUploadDescOptional: "không bắt buộc",
      idUploadDesc3: "trạng thái xác minh không ảnh hưởng đến tính năng khác.",
      frontSide: "Mặt trước", backSide: "Mặt sau", clickToUpload: "Nhấn để tải lên",
      uploadAndContinue: "Tải lên & Tiếp tục", skipForNow: "Bỏ qua lúc này",

      // Profile tab — Step 2 (Resume)
      resumePageTitle: "Tạo hồ sơ gia sư",
      resumePageSub: "Chia sẻ chuyên môn để học viên tìm thấy bạn",
      fullName: "Họ và tên", fullNamePlaceholder: "VD: Nguyễn Văn An",
      fullNameHint: "Vui lòng nhập đầy đủ họ tên (ít nhất 3 từ, viết hoa đúng chuẩn)",
      location: "Địa điểm", locationPlaceholder: "VD: Hà Nội, Ba Đình",
      availableOnline: "Có thể dạy online",
      emailNotif: "Nhận thông báo email về yêu cầu của học viên",
      education: "Học vấn", educationPlaceholder: "Nhập trường/đại học của bạn",
      rate: "Học phí", ratePlaceholder: "VD: 300.000 - 500.000",
      rateType: "Loại học phí", perHour: "Theo giờ", perSession: "Theo buổi",
      subjects: "Môn học bạn dạy", selectSubjects: "Chọn môn học",
      teachingStyle: "Phong cách giảng dạy",
      teachingStyleHint: "Chọn các phong cách mô tả cách bạn dạy học",
      teachingExp: "Kinh nghiệm giảng dạy", noExpYet: "Chưa có kinh nghiệm nào.",
      expTitle: "Vị trí / Tên công việc", expDuration: "Thời gian (VD: 2020 - 2023)",
      expDesc: "Mô tả chi tiết...", addExperience: "Thêm kinh nghiệm",
      certifications: "Chứng chỉ & Bằng cấp", noCertsYet: "Chưa có chứng chỉ nào.",
      certName: "Tên chứng chỉ (VD: IELTS 8.0)", certYear: "Năm cấp (VD: 2023)",
      addCertification: "Thêm chứng chỉ",
      saveResume: "Lưu hồ sơ",
      createSchedule: "Tạo lịch dạy",
      publishProfile: "Đăng hồ sơ",
      addBtn: "Thêm", cancel: "Hủy",

      // Profile tab — Step 3 (Schedule)
      schedulePageTitle: "Đặt lịch dạy của bạn",
      schedulePageSub: "Xác định các khung giờ dạy",
      dayOfWeek: "Ngày trong tuần", selectDay: "Chọn ngày",
      startTime: "Giờ bắt đầu", endTime: "Giờ kết thúc",
      currentSchedule: "Lịch hiện tại của bạn",
      noScheduleYet: "Chưa có lịch nào. Thêm khung giờ đầu tiên của bạn ở trên.",
      backToResume: "Quay lại CV", saveSchedule: "Lưu lịch",
      weekDaysFull: [
        { val: "T2", label: "Thứ 2" }, { val: "T3", label: "Thứ 3" },
        { val: "T4", label: "Thứ 4" }, { val: "T5", label: "Thứ 5" },
        { val: "T6", label: "Thứ 6" }, { val: "T7", label: "Thứ 7" },
        { val: "CN", label: "Chủ nhật" },
      ],

      // Friends tab
      findFriendsTitle: "Tìm bạn bè", findFriendsSub: "Tìm kiếm và kết nối với người dùng khác",
      searchPlaceholder: "Nhập tên người dùng của bạn bè", searchBtn: "Tìm kiếm",
      noUsersFound: "Không tìm thấy người dùng nào cho \"{query}\"",
      yourFriendsTitle: "Bạn bè của bạn", yourFriendsSub: "Quản lý kết nối và đánh giá gia sư",
      noFriendsYet: "Chưa có bạn bè nào",
      pendingTitle: "Lời mời kết bạn đang chờ",
      requestsToYou: "Lời mời gửi đến bạn", noIncoming: "Không có lời mời kết bạn nào.",
      requestsYouSent: "Lời mời bạn đã gửi", noPending: "Không có lời mời đang chờ.",
    }
    : {
      // Page
      title: "Profile Settings",
      tabAccount: "Account Setting", tabProfile: "Profile", tabFriends: "Friends",

      // Account tab
      role: "Role", status: "Status", active: "Active",
      profileInfo: "Profile Information", profileInfoSub: "Manage your profile picture, username, and email",
      upload: "Upload Photo", username: "Username", save: "Save", currentEmail: "Current Email",
      changePass: "Change Your Password", changePassSub: "Update your password to keep your account secure",
      currentPass: "Current Password", newPass: "New Password", confirmPass: "Confirm Password",
      submit: "Submit", changeEmail: "Change Your Email", changeEmailSub: "Update your email address",
      newEmail: "New Email", confirmEmail: "Confirm Email",

      // Profile tab — Step 1 (ID)
      idVerificationTitle: "Identity Verification",
      idVerificationSub: "Upload your ID to help students trust you (optional)",
      stepIdentification: "Identification", stepResume: "Resume Info", stepSchedule: "Availability Schedule",
      idUploadDesc1: "Upload a photo of the", idUploadDescBold: "front and back",
      idUploadDesc2: "of your national ID or passport so admins can verify your identity. This step is",
      idUploadDescOptional: "optional",
      idUploadDesc3: "your ID status does not affect any other features.",
      frontSide: "Front Side", backSide: "Back Side", clickToUpload: "Click to upload",
      uploadAndContinue: "Upload ID & Continue", skipForNow: "Skip for now",

      // Profile tab — Step 2 (Resume)
      resumePageTitle: "Create Your Tutor Resume",
      resumePageSub: "Share your expertise and help students find you",
      fullName: "Full Name", fullNamePlaceholder: "e.g. John Michael Smith",
      fullNameHint: "Please enter your full legal name (at least 3 words, properly capitalized)",
      location: "Location", locationPlaceholder: "Type to search location (e.g., Ha Noi, Ba Dinh)",
      availableOnline: "Available for Online Teaching",
      emailNotif: "Receive email notifications for student's requests",
      education: "Education", educationPlaceholder: "Enter your school/university",
      rate: "Rate", ratePlaceholder: "E.g: 300.000 - 500.000",
      rateType: "Rate Type", perHour: "Per Hour", perSession: "Per Session",
      subjects: "Subject(s) you tutor", selectSubjects: "Select subjects",
      teachingStyle: "Teaching Style",
      teachingStyleHint: "Select styles that describe how you teach",
      teachingExp: "Teaching Experience", noExpYet: "No teaching experience added yet.",
      expTitle: "Position / Job title", expDuration: "Duration (e.g. 2020 - 2023)",
      expDesc: "Describe your role...", addExperience: "Add Experience",
      certifications: "Certifications & Degrees", noCertsYet: "No certifications added yet.",
      certName: "Certificate name (e.g. IELTS 8.0)", certYear: "Year issued (e.g. 2023)",
      addCertification: "Add Certification",
      saveResume: "Save Resume",
      createSchedule: "Create Availability Schedule",
      publishProfile: "Publish Profile",
      addBtn: "Add", cancel: "Cancel",

      // Profile tab — Step 3 (Schedule)
      schedulePageTitle: "Set Your Teaching Availability",
      schedulePageSub: "Define your available teaching hours",
      dayOfWeek: "Day of Week", selectDay: "Select Day",
      startTime: "Start Time", endTime: "End Time",
      currentSchedule: "Your Current Schedule",
      noScheduleYet: "No schedule added yet. Add your first availability slot above.",
      backToResume: "Back to Resume", saveSchedule: "Save Schedule",
      weekDaysFull: [
        { val: "Mon", label: "Monday" }, { val: "Tue", label: "Tuesday" },
        { val: "Wed", label: "Wednesday" }, { val: "Thu", label: "Thursday" },
        { val: "Fri", label: "Friday" }, { val: "Sat", label: "Saturday" },
        { val: "Sun", label: "Sunday" },
      ],

      // Friends tab
      findFriendsTitle: "Find Your Friends", findFriendsSub: "Search and connect with other users",
      searchPlaceholder: "Enter your friend's username", searchBtn: "Search",
      noUsersFound: "No users found for \"{query}\"",
      yourFriendsTitle: "Your Friends", yourFriendsSub: "Manage your connections and rate your tutors",
      noFriendsYet: "No friends yet",
      pendingTitle: "Pending Friend Requests",
      requestsToYou: "Requests Sent to You", noIncoming: "No incoming friend requests.",
      requestsYouSent: "Requests You Sent", noPending: "No pending requests.",
    };

  const tabs = [
    { key: "account", label: text.tabAccount, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { key: "profile", label: text.tabProfile, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "friends", label: text.tabFriends, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">{text.title}</h1>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${activeTab === tab.key
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
          {activeTab === "account" && <AccountTab user={user} text={text} />}
          {activeTab === "profile" && <ProfileTab text={text} />}
          {activeTab === "friends" && <FriendsTab text={text} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}