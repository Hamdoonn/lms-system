"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Search, Users } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast, Toaster } from "sonner";

const AvailableCourses = () => {
  // Sample 25 demo courses
  const allCourses = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      "Introduction to React",
      "Advanced JavaScript",
      "UI/UX Design Principles",
      "Python for Beginners",
      "Database Design",
      "Cybersecurity Fundamentals",
      "API Development",
      "Machine Learning Basics",
      "Fullstack Development",
      "DevOps Essentials",
    ][i % 10],
    instructor: [
      "John Smith",
      "Sarah Johnson",
      "Mike Chen",
      "Alex Lee",
      "Emma Davis",
    ][i % 5],
    description: "Learn the fundamentals of modern web development and design.",
    price: ["$79", "$99", "$149"][i % 3],
    level: ["Beginner", "Intermediate", "Advanced"][i % 3],
    category: ["Web Development", "Programming", "Design", "Data Science"][
      i % 4
    ],
    rating: (4 + Math.random()).toFixed(1),
    students: Math.floor(Math.random() * 400) + 100,
    duration: `${6 + (i % 6)} weeks`,
    image: [
      "/assets/web-development.jpg",
      "/assets/js.jpg",
      "/assets/ux-ui.jpg",
    ][i % 3],
  }));

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "All",
    "Web Development",
    "Programming",
    "Design",
    "Data Science",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filtering logic
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || course.category === category;
      const matchesLevel = level === "All" || course.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level, allCourses]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleEnroll = (course) => {
    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    // Check if course already enrolled
    const alreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (alreadyEnrolled) {
      toast.error("Enrollment Failed ❌", {
        description: "You are already enrolled in this course.",
        duration: 3000,
      });
      return;
    }

    // Add new course with enrollment details
    const updatedCourse = {
      id: course.id,
      courseName: course.title,
      instructor: course.instructor,
      description: course.description,
      category: course.category,
      duration: course.duration,
      dateEnrolled: new Date().toISOString().split("T")[0],
      level: course.level,
      image: course.image,
    };

    const updatedCourses = [...enrolledCourses, updatedCourse];
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));

    // Success toast
    toast.success("Course Enrolled Successfully 🎉", {
      description: "You can view it anytime in 'Enrolled Courses'.",
      duration: 4000,
    });
  };

  return (
    <section>
      {/* Header */}
      <Toaster position="top-center" richColors />

      <div className="mb-8 space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Available Courses
        </h1>
        <p className="text-gray-500">
          Discover and enroll in courses to expand your knowledge
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 h-11 bg-white"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="h-11 px-3 rounded-md border text-sm bg-white"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            setPage(1);
          }}
          className="h-11 px-3 rounded-md border text-sm bg-white"
        >
          {levels.map((lvl) => (
            <option key={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      {currentCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <Card
                key={course.id}
                className="group p-0 rounded-2xl overflow-hidden border hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Level Tag */}
                  <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium text-white bg-[#4b0082]`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    by {course.instructor}
                  </p>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>

                {/* Stats */}
                <div className="px-5 flex flex-wrap gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    ⭐ {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {course.duration}
                  </div>
                </div>

                {/* Category Tag */}
                <div className="px-5">
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">
                    {course.category}
                  </span>
                </div>

                <Button
                  onClick={() => handleEnroll(course)}
                  className="mx-5 mb-5 bg-[#4b0082] text-white font-medium cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#4c0082b8]"
                >
                  Enroll now
                </Button>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination className="mt-8 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No courses match your filters.
        </p>
      )}
    </section>
  );
};

export default AvailableCourses;
