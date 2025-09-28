import AdminDashboard from "@/pages/admin/AdminDashboard";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import InstructorDashboard from "@/pages/instructore/InstructorDashboard";
import Onboarding from "@/pages/Onboarding";
import StudentDashboard from "@/pages/student/StudentDashboard";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />

        {/* auth */}
        <Route path="/auth/Login" element={<LoginPage />} />
        <Route path="/auth/Signup" element={<SignupPage />} />

        {/* dashboard */}
        <Route
          path="/student/student-dashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="/instructore/instructor-dashboard"
          element={<InstructorDashboard />}
        />
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
