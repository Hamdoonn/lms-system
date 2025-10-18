import React, { useEffect, useState } from "react";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

const StudentDashboard = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:4000/api/enrollments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrolled(res.data.data);
      } catch (error) {
        toast.error("Failed to load enrolled courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  return (
    <>
      <Header />
      <StatsCard role="student" page="dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Continue Learning Section */}
        <div className="flex flex-col justify-start items-center min-h-[300px] border rounded-xl p-5 bg-white text-center w-full">
          <h1 className="w-full text-left text-2xl font-medium mb-6">
            Continue Learning
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading your courses...</p>
          ) : enrolled.length > 0 ? (
            <div className="w-full grid grid-cols-1 gap-4">
              {enrolled.map((item) => (
                <Card
                  key={item._id}
                  className="p-4 flex justify-between items-start border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">
                      {item.course?.title || "Untitled Course"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Instructor: {item.course?.instructor || "Unknown"}
                    </p>
                  </div>
                  <Button className="bg-[#4b0082] text-white hover:bg-[#4b0082d5]">
                    Continue
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 mt-6">
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
          )}
        </div>

        {/* Upcoming Assignment Section */}
        <div className="flex flex-col justify-start items-center min-h-[300px] border rounded-xl p-5 bg-white text-center">
          <h1 className="w-full text-left text-2xl font-medium mb-6">
            Upcoming Assignments
          </h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <Frown className="w-10 h-10 text-gray-500" />
            <h3 className="font-medium text-zinc-400">No Assignments</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
