import React from "react";
import mainLogo from "../../../assets/S2.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

const userTypes = [
  { label: "Student", path: "/student/login", color: "blue" },
  { label: "Admin", path: "/admin/login", color: "red" },
  { label: "Faculty", path: "/faculty/login", color: "green" },
  { label: "Driver", path: "/driver/login", color: "yellow" },
];

const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/student/dashboard"); // after login, go to student dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        {/* Switch User Type */}
        <div className="mb-6 flex justify-center gap-2">
          {userTypes.map((type) => (
            <button
              key={type.label}
              type="button"
              onClick={() => navigate(type.path)}
              className={`px-4 py-2 rounded-lg font-semibold transition
                ${
                  location.pathname === type.path
                    ? `bg-${type.color}-600 text-white shadow`
                    : `bg-gray-800 text-gray-300 hover:bg-${type.color}-500 hover:text-white`
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={mainLogo} alt="Logo" className="w-32 mb-4 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold text-gray-100 tracking-wide">Student Login</h1>
          <p className="text-gray-400 text-center text-sm mt-2">Login to access your Student Dashboard</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="student@college.com"
            className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="********"
            className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>

        {/* Switch to signup */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/student/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
