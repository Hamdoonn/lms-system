import React from "react";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
const InstructorDashboard = () => {
  

  return (

    <>
      <Header
        title="Instructor Dashboard"
        subtitle="Manage your courses and track student progress."
        actionLabel="Manage Courses"
        actionPath="/instructor/courses/manage"
      />
      <StatsCard/>
    </>
  )

};

export default InstructorDashboard;
