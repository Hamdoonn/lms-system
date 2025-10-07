import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EnrolledCourses = () => {
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolled(data);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Enrolled Courses</h1>
      {enrolled.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolled.map((course) => (
            <Card
              key={course.id}
              className="p-5 rounded-2xl border shadow-sm bg-white"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Instructor: {course.instructor}
              </p>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
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
