import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import DashboardRouter from "./DashboardRouter";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardRouter />
    </DashboardLayout>
  );
};

export default Dashboard;
