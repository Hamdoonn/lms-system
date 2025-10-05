import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import Onboarding from "@/pages/Onboarding";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppSidebar from "@/components/app-sidebar";

// Student Pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import AvailaibleCourses from "@/pages/student/courses/AvailaibleCourses";
import EnrolledCourses from "@/pages/student/courses/EnrolledCourses";
import Assignments from "@/pages/student/Assignments";
import Grades from "@/pages/student/Grades";
import Profile from "@/pages/student/Profile";
import Settings from "@/pages/student/Settings";

//Dashboard Router
import DashboardRouter from "@/pages/dashboard/DashboardRouter";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Courses from "@/pages/admin/Courses";
import Reports from "@/pages/admin/Reports";
import Users from "@/pages/admin/Users";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/auth/Login" element={<LoginPage />} />
        <Route path="/auth/Signup" element={<SignupPage />} />

        {/* dashboard router */}
        <Route path="/dashboard" element={<DashboardRouter />} />

        {/* Student Dashboard Layout */}
        <Route path="/student" element={<AppSidebar />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses/available" element={<AvailaibleCourses />} />
          {/* /student/courses/available */}
          <Route path="courses/enrolled" element={<EnrolledCourses />} />
          {/* /student/courses/enrolled */}
          <Route path="assignments" element={<Assignments />} />
          {/* /student/assignments */}
          <Route path="grades" element={<Grades />} />
          <Route path="profile" element={<Profile />} />
          {/* /student/profile */}
          <Route path="settings" element={<Settings />} />
          {/* /student/settings */}
        </Route>
        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AppSidebar/>}>
         <Route index element={<AdminDashboard/>}/>
         <Route path="/admin/courses" element={< Courses />}/>
         <Route path="/admin/reports" element={< Reports/>}/>
         <Route path="/admin/users" element={<Users/>}/>
          <Route path="/admin/settings" element={<Settings/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default Router;
