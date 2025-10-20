import React, { useState, useMemo, useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast, Toaster } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";

const AvailableCourses = () => {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/courses");
        setAllCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

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

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token"); //store token after login

      if (!token) {
        toast.error("Please login first to enroll in a course");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/enrollments",
        { courseId }, // send courseId
        {
          headers: {
            Authorization: `Bearer ${token}`, //send JWT in header
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        toast.success("Enrolled successfully!");
      } else {
        toast.error(response.data.message || "Failed to enroll");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error enrolling in course");
    }
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
        {/* Search Input */}
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

        {/* Category Select */}
        <Select
          onValueChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          value={category}
        >
          <SelectTrigger className="h-11 w-[180px] px-3 rounded-md border text-sm bg-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Level Select */}
        <Select
          onValueChange={(value) => {
            setLevel(value);
            setPage(1);
          }}
          value={level}
        >
          <SelectTrigger className="h-11 w-[180px] px-3 rounded-md border text-sm bg-white">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Cards */}
      {currentCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <Card
                key={course._id}
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
                  <Link to={`/student/courses/${course._id}`}>
                    <h3 className="text-lg font-semibold hover:text-[#4b0082] transition-colors duration-200">
                      {course.title}
                    </h3>
                  </Link>
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

                <div className="flex gap-3 px-5 mb-5">
                  <Button
                    onClick={() => handleEnroll(course._id)}
                    className="flex-1 bg-[#4b0082] text-white font-medium cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#4c0082b8]"
                  >
                    Enroll Now
                  </Button>

                  <Button
                    onClick={() =>
                      (window.location.href = `/student/courses/${course._id}`)
                    }
                    variant="ghost"
                    className=" cursor-pointer flex-1 border-[#4b0082] text-zinc-400 hover:bg-[#4c00821a] hover:text-[#4b0082] transition-all duration-300"
                  >
                    View Details
                  </Button>
                </div>
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
