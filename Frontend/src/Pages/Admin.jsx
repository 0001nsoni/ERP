import React, { useState } from "react";
import { Users, Bell, BarChart2, LogOut, Settings, ClipboardList } from "lucide-react";
import mainLogo from "../assets/S2.png";

const Admin = () => {
  // -------- Mock Data (replace with API later) --------
  const [stats] = useState({
    students: 1200,
    faculty: 85,
    drivers: 20,
    clubs: 12,
  });

  const [notices] = useState([
    {
      title: "System Maintenance",
      desc: "Portal will be down for maintenance on Aug 2nd, 1 AM - 4 AM.",
      date: "2024-07-28",
      new: true,
    },
    {
      title: "New Club Approved",
      desc: "Photography Club has been officially registered.",
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
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
          <button className="hover:text-blue-400 transition">Dashboard</button>
          <button className="hover:text-blue-400 transition">Users</button>
          <button className="hover:text-blue-400 transition">Notices</button>
          <button className="hover:text-blue-400 transition">Reports</button>
          <button className="hover:text-blue-400 flex items-center gap-1 transition">
            <Settings size={18} /> Settings
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition shadow-md">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 flex-1">
        {/* Analytics Overview */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-5 text-center">
            <h3 className="text-gray-400 text-sm">Students</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.students}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-5 text-center">
            <h3 className="text-gray-400 text-sm">Faculty</h3>
            <p className="text-2xl font-bold text-green-400">{stats.faculty}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-5 text-center">
            <h3 className="text-gray-400 text-sm">Drivers</h3>
            <p className="text-2xl font-bold text-yellow-400">{stats.drivers}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-5 text-center">
            <h3 className="text-gray-400 text-sm">Clubs</h3>
            <p className="text-2xl font-bold text-purple-400">{stats.clubs}</p>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bell size={18} /> System Notices
          </h2>
          <ul className="space-y-3">
            {notices.map((n, idx) => (
              <li key={idx} className="border-b border-gray-700 pb-2">
                <h3 className="font-medium text-gray-200 flex items-center gap-2">
                  {n.title}{" "}
                  {n.new && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm">{n.desc}</p>
                <span className="text-gray-500 text-xs">Published: {n.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* User Management */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Users size={18} /> User Management
          </h2>
          <ul className="text-gray-300 space-y-2">
            <li>👨‍🎓 Manage Students</li>
            <li>👩‍🏫 Manage Faculty</li>
            <li>🚌 Manage Drivers</li>
          </ul>
        </div>

        {/* Reports */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <BarChart2 size={18} /> Reports & Analytics
          </h2>
          <p className="text-gray-400 text-sm">
            Generate reports on attendance, transport, academic performance, and more.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <ClipboardList size={18} /> Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 py-2 rounded-lg font-medium shadow-lg transition">
              Broadcast Notice
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 py-2 rounded-lg font-medium shadow-lg transition">
              Approve Leave Requests
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 py-2 rounded-lg font-medium shadow-lg transition">
              Manage Clubs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
