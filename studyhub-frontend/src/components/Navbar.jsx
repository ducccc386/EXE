import { useState } from "react";
import { Link } from "react-router-dom";

import main_logo from "../assets/studyhub.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-amber-400 text-center py-2 px-4 text-sm font-medium text-gray-800">
        Are you a university or school student for an online tutoring partnership?{" "}
        <a
          href="#"
          className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-900 transition-colors"
        >
          Talk to us
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={main_logo}
              alt="StudyHub"
              className="w-20 h-20 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-medium text-orange-500 hover:text-orange-500"
            >
              Home
            </Link>

            <Link
              to="/news"
              className="text-sm font-medium text-gray-600 hover:text-orange-500"
            >
              News
            </Link>

            <Link
              to="/resources"
              className="text-sm font-medium text-gray-600 hover:text-orange-500"
            >
              Resources
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-600 hover:text-orange-500"
            >
              About us
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-gray-600 hover:text-orange-500"
            >
              Contact us
            </Link>

          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-2"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 bg-white">

            <Link to="/" className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-1">
              Home
            </Link>

            <Link to="/news" className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-1">
              News
            </Link>

            <Link to="/resources" className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-1">
              Resources
            </Link>

            <Link to="/about" className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-1">
              About us
            </Link>

            <Link to="/contact" className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-1">
              Contact us
            </Link>

            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                className="flex-1 text-center text-sm font-semibold text-gray-700 border border-gray-200 py-2 rounded-full hover:border-blue-400"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="flex-1 text-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-full hover:bg-blue-700"
              >
                Register
              </Link>
            </div>

          </div>
        )}
      </nav>
    </>
  );
}