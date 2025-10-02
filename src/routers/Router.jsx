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
// Instructor Pages
import InstructorDashboard from "@/pages/instructore/InstructorDashboard";
import AddCourses from "@/pages/instructore/courses/AddCourses";
import ManageCourses from "@/pages/instructore/courses/ManageCourses";
import InstructorAssignments from "@/pages/instructore/Assignments";
import InstructorGrades from "@/pages/instructore/Grades";
import Students from "@/pages/instructore/Students";
import InstructorSettings from "@/pages/instructore/Setting";



//Dashboard Router
import DashboardRouter from "@/pages/dashboard/DashboardRouter";

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
        {/* Instructor Dashboard Layout */}
        <Route path="/instructor" element={<AppSidebar />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses/add" element={<AddCourses />} />
          <Route path="courses/manage" element={<ManageCourses />} />
          <Route path="assignments" element={<InstructorAssignments />} />
          <Route path="grades" element={<InstructorGrades />} />
          <Route path="students" element={<Students />} />
          <Route path="settings" element={<InstructorSettings />} />
        </Route>

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
