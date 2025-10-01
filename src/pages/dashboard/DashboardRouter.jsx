import { useRole } from "@/context/RoleContext";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import InstructorDashboard from "@/pages/instructore/InstructorDashboard";
import StudentDashboard from "@/pages/student/StudentDashboard";
import { Navigate } from "react-router-dom";
import React from "react";
import AppSidebar from "@/components/app-sidebar";

const DashboardRouter = () => {
  const { role } = useRole();

  if (!role) {
    return <Navigate to="/auth/Login" replace />;
  }

  switch (role) {
    case "student":
      return <StudentDashboard />;
    case "instructor":
      return <InstructorDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <p>Unauthorized</p>;
  }
};

export default DashboardRouter;
