import React from "react";
import mainLogo from "../assets/S2.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // you can add API validation logic here before redirect
    navigate("/student"); // redirects to student page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={mainLogo} alt="AttendeX Logo" className="w-32 sm:w-40 mb-4 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold text-gray-100 tracking-wide">Welcome Back</h1>
          <p className="text-gray-400 text-center text-sm mt-2 max-w-xs">
            Enter your credentials to access your <span className="text-gray-200 font-semibold">AttendeX</span> account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@attendex.com"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800/60 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transform hover:scale-[1.02] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
