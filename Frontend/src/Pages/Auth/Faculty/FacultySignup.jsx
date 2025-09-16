import React from "react";
import mainLogo from "../../../assets/S2.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

const userTypes = [
  { label: "Student", path: "/student/signup", color: "blue" },
  { label: "Admin", path: "/admin/signup", color: "red" },
  { label: "Faculty", path: "/faculty/signup", color: "green" },
  { label: "Driver", path: "/driver/signup", color: "yellow" },
];

const FacultySignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = (e) => {
    e.preventDefault();
    // signup logic
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
          <h1 className="text-3xl font-extrabold text-gray-100 tracking-wide">Faculty Sign Up</h1>
          <p className="text-gray-400 text-center text-sm mt-2">Create your faculty account</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100" />
          <input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100" />
          <input type="text" placeholder="Employee ID" className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100" />
          <input type="text" placeholder="Department" className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100" />
          <input type="password" placeholder="Password" className="w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100" />
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition">
            Sign Up
          </button>
        </form>

        {/* Switch to login */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/faculty/login" className="text-green-400 hover:text-green-300">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default FacultySignup;
