import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { tutors } from "../data/tutors";

const SUBJECTS = [
  "English", "IELTS", "Math", "Chemistry", "Literature", "SAT"
];

export default function TutorListingPage() {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  // Lọc đơn giản
  const filtered = tutors.filter(t => {
    const matchKeyword = !keyword || t.name?.toLowerCase().includes(keyword.toLowerCase()) || t.subject?.toLowerCase().includes(keyword.toLowerCase());
    const matchSubject = !subject || t.subject === subject;
    return matchKeyword && matchSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Find Tutors</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input type="text" placeholder="Enter keywords" value={keyword} onChange={e => setKeyword(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-64" />
          <select value={subject} onChange={e => setSubject(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-48">
            <option value="">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-all">Search</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 font-semibold">No tutors found.</div>
          ) : (
            filtered.map(tutor => (
              <div key={tutor.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-3xl text-blue-600">
                  {tutor.avatar || tutor.initials || "👤"}
                </div>
                <div className="font-bold text-lg text-gray-900 mb-1">{tutor.name}</div>
                <div className="text-sm text-gray-500 mb-1">{tutor.location || "-"}</div>
                <div className="text-sm text-gray-500 mb-1">{tutor.university || "-"}</div>
                <div className="text-blue-600 font-bold mb-1">{tutor.pricePerHour ? tutor.pricePerHour.toLocaleString() + "/hour" : "-"}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{tutor.subject}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" onClick={() => navigate(`/tutors/${tutor.id}`)}>View Profile</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">Contact</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { tutors } from "../data/tutors";

const SUBJECTS = [
  "English", "IELTS", "Math", "Chemistry", "Literature", "SAT"
];

export default function TutorListingPage() {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  // Lọc đơn giản
  const filtered = tutors.filter(t => {
    const matchKeyword = !keyword || t.name?.toLowerCase().includes(keyword.toLowerCase()) || t.subject?.toLowerCase().includes(keyword.toLowerCase());
    const matchSubject = !subject || t.subject === subject;
    return matchKeyword && matchSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Find Tutors</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input type="text" placeholder="Enter keywords" value={keyword} onChange={e => setKeyword(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-64" />
          <select value={subject} onChange={e => setSubject(e.target.value)} className="border rounded-lg px-4 py-2 w-full md:w-48">
            <option value="">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-all">Search</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 font-semibold">No tutors found.</div>
          ) : (
            filtered.map(tutor => (
              <div key={tutor.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-3xl text-blue-600">
                  {tutor.avatar || tutor.initials || "👤"}
                </div>
                <div className="font-bold text-lg text-gray-900 mb-1">{tutor.name}</div>
                <div className="text-sm text-gray-500 mb-1">{tutor.location || "-"}</div>
                <div className="text-sm text-gray-500 mb-1">{tutor.university || "-"}</div>
                <div className="text-blue-600 font-bold mb-1">{tutor.pricePerHour ? tutor.pricePerHour.toLocaleString() + "/hour" : "-"}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{tutor.subject}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" onClick={() => navigate(`/tutors/${tutor.id}`)}>View Profile</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">Contact</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}