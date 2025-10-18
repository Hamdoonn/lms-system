import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const EnrolledCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:4000/api/enrollments/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // adjust based on API structure
        const validCourses = res.data.data.filter(
          (e) => e.course && e.course.title
        );
        setEnrolled(validCourses);
      } catch (error) {
        toast.error("Failed to load enrolled courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading enrolled courses...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Enrolled Courses</h1>

      {enrolled.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolled.map((item) => (
            <Card
              key={item._id}
              className="p-5 rounded-2xl border shadow-sm bg-white"
            >
              <img
                src={item.course?.image || "/placeholder.jpg"}
                alt={item.course?.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{item.course?.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Instructor: {item.course?.instructor}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Enrollment ID: {item.enrollmentId}
              </p>
              <Button className="bg-[#4b0082] text-white hover:bg-[#4b0082d5] w-full">
                Continue Course
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-20">
          You haven’t enrolled in any courses yet.
        </p>
      )}
    </div>
  );
};

export default EnrolledCourses;
