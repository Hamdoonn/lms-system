import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, BookOpen } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React for Beginners",
      instructor: "Ali Khan",
      category: "Web Development",
      description: "Learn React and build interactive web apps.",
    },
    {
      id: 2,
      title: "UI/UX Design Essentials",
      instructor: "Sarah Khan",
      category: "Design",
      description: "Master modern design principles and usability.",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Bilal Anwar",
      category: "Marketing",
      description: "Complete guide to online marketing strategies.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [searchQuery, courses]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-semibold flex items-center gap-2">
            
            Course Management
          </h2>
          <p className="text-muted-foreground">
            View and manage all courses on the platform.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 w-full sm:w-1/2">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4C0082]" />
        <Input
          type="text"
          placeholder="Search courses by title, instructor, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-[#4C0082]"
        />
      </div>

      {/* Course Table */}
      <div className="overflow-x-auto border rounded-lg bg-card shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#4C0082]/10 border-b border-border text-[#4C0082]">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Instructor</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b last:border-none hover:bg-muted/30 transition"
                >
                  <td className="px-6 py-3 font-medium">{course.title}</td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-3">{course.category}</td>
                  <td className="px-6 py-3 text-muted-foreground text-sm">
                    {course.description || "—"}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-[#4C0082] hover:bg-[#3b0068] text-white px-3 py-1.5 rounded-md text-sm transition"
                        title="Edit (disabled for now)"
                        disabled
                      >
                        <Edit className="h-4 w-4 opacity-60" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                        title="Delete course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-muted-foreground"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
