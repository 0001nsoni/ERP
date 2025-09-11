import React, { useState } from "react";
import { User, Bell, Bus, LogOut, MapPin } from "lucide-react";
import mainLogo from "../assets/S2.png";

const Driver = () => {
  // -------- Mock Data --------
  const [driver] = useState({
    id: "DRV301",
    name: "Rajesh Kumar",
    busNo: "Bus 12 - Route A",
    contact: "+91 9876543210",
    shift: "Morning (6 AM - 2 PM)",
  });

  const [notices] = useState([
    {
      title: "Route Change",
      desc: "Temporary detour near Main Street due to construction.",
      date: "2024-07-28",
      new: true,
    },
    {
      title: "Maintenance Reminder",
      desc: "Bus inspection scheduled for Aug 1st at depot.",
      date: "2024-07-26",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 gap-3">
        <div className="flex items-center gap-3">
          <img src={mainLogo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Driver Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
          <button className="hover:text-blue-400 transition">Dashboard</button>
          <button className="hover:text-blue-400 transition">My Routes</button>
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
              src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
              alt="driver"
              className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md"
            />
            <h3 className="mt-3 text-xl font-bold">{driver.name}</h3>
            <p className="text-gray-400">Driver ID: {driver.id}</p>
            <p className="text-gray-400">{driver.contact}</p>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bell size={18} /> Notices
          </h2>
          <ul className="space-y-3">
            {notices.map((n, idx) => (
              <li key={idx} className="border-b border-gray-700 pb-2">
                <h3 className="font-medium text-gray-200 flex items-center gap-2">
                  {n.title}{" "}
                  {n.new && (
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
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

        {/* Bus Info */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Bus size={18} /> My Bus
          </h2>
          <p>
            <span className="font-medium">Bus:</span> {driver.busNo}
          </p>
          <p className="mt-2">
            <span className="font-medium">Shift:</span> {driver.shift}
          </p>
          <div className="w-full h-40 bg-gray-700/40 rounded-lg flex items-center justify-center mt-3">
            <span className="text-gray-400 text-sm">
              [ GPS Map Integration Here ]
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-5">
          <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <button className="bg-gradient-to-r from-green-500 to-green-600 py-2 rounded-lg font-medium shadow-lg transition">
              Start Route
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 py-2 rounded-lg font-medium shadow-lg transition">
              Report Issue
            </button>
            <button className="bg-gradient-to-r from-red-500 to-red-600 py-2 rounded-lg font-medium shadow-lg transition">
              End Shift
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Driver;
