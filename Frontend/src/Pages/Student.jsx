import React, { useState } from "react";
import { User, Bell, Bus, LogOut } from "lucide-react";
import mainLogo from "../assets/S2.png";

const Student = () => {
  // ----------- States (replace with API data later) ----------
  const [student] = useState({
    id: "SE1001",
    name: "John Doe",
    course: "BSc. Computer Science",
    hostel: "Room 205, Block B",
    bus: "Bus XZY (Route A) - ETA 5 mins",
    clubs: [
      { name: "Robotics Club", desc: "Engage in building and programming robots." },
      { name: "Debate Society", desc: "Hone public speaking and critical thinking skills." },
    ],
  });

  const [notices] = useState([
    {
      title: "Exam Schedule Updated",
      desc: "Check the academic portal for the revised final exam schedule.",
      date: "2024-07-28",
      new: true,
    },
    {
      title: "Club Fair Tomorrow!",
      desc: "Explore new opportunities at the annual Club Fair in the main hall.",
      date: "2024-07-27",
    },
    {
      title: "Library Hours Extension",
      desc: "Library will operate until 10 PM during exam period.",
      date: "2024-07-25",
    },
  ]);

  // ---------------- JSX ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 gap-3">
        <div className="flex items-center gap-3">
          <img src={mainLogo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Student Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
          <button className="hover:text-blue-400 transition">Dashboard</button>
          <button className="hover:text-blue-400 transition">Modules</button>
          <button className="hover:text-blue-400 transition">Clubs</button>
          <button className="hover:text-blue-400 flex items-center gap-1 transition">
            <User size={18} /> My Profile
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition shadow-md">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 flex-1">
        {/* Profile */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-blue-500/10 transition">
          <h2 className="font-semibold text-lg mb-3">My Profile</h2>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
            />
            <h3 className="mt-3 text-xl font-bold">{student.name}</h3>
            <p className="text-gray-400">
              Student ID: {student.id} | {student.course}
            </p>
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Hosteller
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Bus-Service
              </span>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-blue-500/10 transition">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bell size={18} /> Notice Board
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

        {/* Transportation */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-blue-500/10 transition">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bus size={18} /> Transportation & Accommodation
          </h2>
          <div className="w-full h-40 bg-gray-700/40 rounded-lg flex items-center justify-center mb-3">
            {/* Replace this div with your map later */}
            <span className="text-gray-400 text-sm">[ Map Integration Here ]</span>
          </div>
          <p>
            <span className="font-medium">Hostel Status:</span> {student.hostel}
          </p>
          <p className="mt-2">
            <span className="font-medium">Bus Tracking:</span> {student.bus}
          </p>
        </div>

        {/* My Clubs */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-blue-500/10 transition">
          <h2 className="font-semibold text-lg mb-3">My Clubs</h2>
          {student.clubs.map((club, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-blue-400 font-semibold">{club.name}</h3>
              <p className="text-gray-400 text-sm">{club.desc}</p>
              <button className="text-xs text-blue-500 hover:text-blue-300">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-blue-500/10 transition">
          <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-2 rounded-lg font-medium shadow-lg transition">
              Apply for Leave
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-2 rounded-lg font-medium shadow-lg transition">
              Submit Club Application
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-gray-700 text-gray-500 text-sm gap-2">
        <div className="flex gap-4">
          <a href="#">Company</a>
          <a href="#">Resources</a>
          <a href="#">Legal</a>
        </div>
        <div className="flex gap-3 text-lg">
          <span>🌐</span>
          <span>📘</span>
          <span>🐦</span>
        </div>
      </footer>
    </div>
  );
};

export default Student;
