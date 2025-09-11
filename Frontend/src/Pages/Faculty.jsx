import React, { useState } from "react";
import { User, Bell, BookOpen, LogOut, FileText } from "lucide-react";
import mainLogo from "../assets/S2.png";

const Faculty = () => {
  // -------- Mock Data (replace with API later) --------
  const [faculty] = useState({
    id: "FAC202",
    name: "Dr. Emily Smith",
    dept: "Computer Science",
    designation: "Associate Professor",
    courses: ["Data Structures", "AI Fundamentals", "Operating Systems"],
    office: "Room 312, Block C",
  });

  const [notices] = useState([
    {
      title: "Faculty Meeting",
      desc: "Mandatory department meeting in Conference Hall A at 3 PM.",
      date: "2024-07-29",
      new: true,
    },
    {
      title: "Grade Submission Reminder",
      desc: "Submit grades for Semester VI courses before Aug 5th.",
      date: "2024-07-27",
    },
  ]);

  // ---------------- JSX ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 gap-3">
        <div className="flex items-center gap-3">
          <img src={mainLogo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Faculty Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
          <button className="hover:text-blue-400 transition">Dashboard</button>
          <button className="hover:text-blue-400 transition">My Courses</button>
          <button className="hover:text-blue-400 transition">Research</button>
          <button className="hover:text-blue-400 flex items-center gap-1 transition">
            <User size={18} /> Profile
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition shadow-md">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 flex-1">
        {/* Profile */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3">My Profile</h2>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
            />
            <h3 className="mt-3 text-xl font-bold">{faculty.name}</h3>
            <p className="text-gray-400">
              {faculty.designation}, {faculty.dept}
            </p>
            <p className="text-gray-400 text-sm">Faculty ID: {faculty.id}</p>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bell size={18} /> Department Notices
          </h2>
          <ul className="space-y-3">
            {notices.map((n, idx) => (
              <li key={idx} className="border-b border-gray-700 pb-2">
                <h3 className="font-medium text-gray-200 flex items-center gap-2">
                  {n.title}{" "}
                  {n.new && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm">{n.desc}</p>
                <span className="text-gray-500 text-xs">
                  Published: {n.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <BookOpen size={18} /> Courses Taught
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {faculty.courses.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 py-2 rounded-lg font-medium shadow-lg transition">
              Upload Grades
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 py-2 rounded-lg font-medium shadow-lg transition">
              Request Leave
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 py-2 rounded-lg font-medium shadow-lg transition">
              Research Proposal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Faculty;
