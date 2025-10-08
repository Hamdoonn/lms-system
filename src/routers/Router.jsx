import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import Onboarding from "@/pages/Onboarding";
import Settings from "@/pages/settings/Settings";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppSidebar from "@/components/app-sidebar";

// Student Pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import AvailaibleCourses from "@/pages/student/courses/AvailaibleCourses";
import EnrolledCourses from "@/pages/student/courses/EnrolledCourses";
import Assignments from "@/pages/student/Assignments";
import Grades from "@/pages/student/Grades";
import StudentAttendance from "@/pages/student/Attendance";

//Dashboard Router
import DashboardRouter from "@/pages/dashboard/DashboardRouter";
//admin routes
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Reports from "@/pages/admin/Reports";
import Users from "@/pages/admin/Users";
import Courses from "@/pages/admin/Courses";
// InstructorDashboard
import InstructorDashboard from "@/pages/instructore/InstructorDashboard";
import AddCourses from "@/pages/instructore/courses/AddCourses";
import ManageCourses from "@/pages/instructore/courses/ManageCourses";
import Students from "@/pages/instructore/Students";
import InstructorAssignments from "@/pages/instructore/Assignments";
import InstructorGrades from "@/pages/instructore/Grades";

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

        {/* Shared Settings for all roles */}
        <Route path="/student" element={<AppSidebar />}>
          <Route path="/student/settings" element={<Settings />} />
        </Route>

        <Route path="/instructore" element={<AppSidebar />}>
          <Route path="/instructore/settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<AppSidebar />}>
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* Instructor Dashboard Layout */}
        <Route path="/instructor" element={<AppSidebar />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses/add" element={<AddCourses />} />
          <Route path="courses/manage" element={<ManageCourses />} />
          <Route
            path="/instructor/assignments"
            element={<InstructorAssignments />}
          />
          <Route path="/instructor/grades" element={<InstructorGrades />} />
          <Route path="/instructor/students" element={<Students />} />
          <Route path="/instructor/settings" element={<Settings />} />
        </Route>

        {/* Student Dashboard Layout */}
        <Route path="/student" element={<AppSidebar />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses/available" element={<AvailaibleCourses />} />
          <Route path="courses/enrolled" element={<EnrolledCourses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="grades" element={<Grades />} />
          <Route path="attendance" element={<StudentAttendance />} />
        </Route>

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AppSidebar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/courses" element={<Courses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
