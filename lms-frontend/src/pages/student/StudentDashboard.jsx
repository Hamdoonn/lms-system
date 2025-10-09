import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <>
      <Header />
      <StatsCard role="student" page="dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* continue learning block */}
        <div className="flex flex-col justify-start items-center min-h-[300px] border rounded-xl p-5 bg-white text-center">
          <h1 className="w-full text-left text-2xl font-medium mb-6">
            Continue Learning
          </h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <BookOpen className="w-10 h-10 text-gray-500" />
            <h3 className="font-medium text-zinc-400">
              No enrolled courses yet
            </h3>
            <Link to="/student/courses/available">
              <Button className="cursor-pointer bg-white border text-zinc-500 hover:bg-[#4b0082] hover:text-white transition-all ease-in-out duration-300">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* upcoming assignment block */}
        <div className="flex flex-col justify-start items-center min-h-[300px] border rounded-xl p-5 bg-white text-center">
          <h1 className="w-full text-left text-2xl font-medium mb-6">
            Upcoming Assignments
          </h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <Frown className="w-10 h-10 text-gray-500" />
            <h3 className="font-medium text-zinc-400">No Assigments</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
