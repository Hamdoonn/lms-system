import AdminDashboard from "@/pages/admin/AdminDashboard";
import InstructorDashboard from "@/pages/instructore/InstructorDashboard";
import StudentDashboard from "@/pages/student/StudentDashboard";
import React from "react";

const DashboardRouter = () => {
  const role = localStorage.getItem("role");

  if (!role) {
    window.location.href = "/auth/Login";
    return null;
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
