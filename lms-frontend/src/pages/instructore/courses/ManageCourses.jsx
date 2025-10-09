import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "John Doe",
      category: "Development",
      duration: "12 Weeks",
      students: 45,
      status: "Published",
      updated: "2025-10-01",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Sarah Khan",
      category: "Design",
      duration: "8 Weeks",
      students: 32,
      status: "Draft",
      updated: "2025-09-28",
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Michael Lee",
      category: "Data Science",
      duration: "10 Weeks",
      students: 60,
      status: "Published",
      updated: "2025-09-25",
    },
  ]);

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const toggleStatus = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "Published" ? "Draft" : "Published",
            }
          : course
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#562c78]">Manage Courses</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-[#562c78]">
                  {course.title}
                </CardTitle>
                <Badge
                  variant={course.status === "Published" ? "default" : "secondary"}
                  className={`${
                    course.status === "Published"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white`}
                >
                  {course.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Students Enrolled:</strong> {course.students}</p>
              <p className="text-gray-500 text-xs">
                Last Updated: {course.updated}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-3 border-t">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus(course.id)}
                  className="border-[#562c78] text-[#562c78] hover:bg-[#562c78] hover:text-white"
                >
                  {course.status === "Published" ? "Unpublish" : "Publish"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(course.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-lg">No courses available.</p>
          <p className="text-sm">Add a new course to manage here.</p>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
