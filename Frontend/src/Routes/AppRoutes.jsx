import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import all pages (Login + Signup)
import StudentLogin from "../Pages/Auth/Student/StudentLogin";
import StudentSignup from "../Pages/Auth/Student/StudentSignup";
import FacultyLogin from "../Pages/Auth/Faculty/FacultyLogin";
import FacultySignup from "../Pages/Auth/Faculty/FacultySignup";
import DriverLogin from "../Pages/Auth/Driver/DriverLogin";
import DriverSignup from "../Pages/Auth/Driver/DriverSignup";
import AdminLogin from "../Pages/Auth/Admin/AdminLogin";
import AdminSignup from "../Pages/Auth/Admin/AdminSignup";

// ✅ Import your already-created panels
import Student from "../Pages/Student";
import Faculty from "../Pages/Faculty";
import Driver from "../Pages/Driver";
import Admin from "../Pages/Admin";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* ==== Student ==== */}
        <Route path="/" element={<StudentLogin />} /> {/* Default route */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student" element={<Student />} />

        {/* ==== Faculty ==== */}
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route path="/faculty/signup" element={<FacultySignup />} />
        <Route path="/faculty" element={<Faculty />} />

        {/* ==== Driver ==== */}
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/signup" element={<DriverSignup />} />
        <Route path="/driver" element={<Driver />} />

        {/* ==== Admin ==== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
