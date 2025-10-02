import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";

const StudentDashboard = () => {
  return (
    <>
      <Header
        title="Student Dashboard"
        subtitle="Continue your learning journey and achieve your goals."
        actionLabel="Explore Courses"
        actionPath="/student/courses/available"
      />
      <StatsCard />
    </>
  );
};

export default StudentDashboard;
