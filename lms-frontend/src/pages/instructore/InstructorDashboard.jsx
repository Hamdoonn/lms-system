import React, { useEffect, useState } from "react";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";

const InstructorDashboard = () => {
  const [user, setUser] = useState(null);

  // 🔹 Fetch logged in user info
  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  if (!user) return null;

  return (
    <>
     
      <Header />

      <StatsCard role={user.role} page="dashboard" />
    </>
  );
};

export default InstructorDashboard;
