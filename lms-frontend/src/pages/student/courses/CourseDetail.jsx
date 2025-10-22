import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, CheckCircle } from "lucide-react";
import { toast } from "sonner"; // assuming you're using sonner

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to enroll in a course");
      return;
    }

    // Redirect to checkout with courseId as query param
    window.location.href = `/student/checkout?courseId=${courseId}`;
  };

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!course)
    return (
      <div className="p-10 text-center text-gray-500">Course not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-12 transition-all duration-300 hover:shadow-lg">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6 md:p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#4b0082]" />
              {course.category}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4b0082]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              {course.rating} / 5
            </span>
            <span className="flex items-center gap-2 font-medium text-gray-800">
              👨‍🏫 {course.instructor}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#4b0082]">
              ${course.price}
            </h2>

            <Button onClick={() => handleEnroll(course._id)}>Enroll</Button>
          </div>
        </div>
      </div>

      {/* Learning Points */}
      {course.learningPoints?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#4b0082]">
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.learningPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-lg p-2"
              >
                <CheckCircle className="w-5 h-5 text-[#4b0082]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {course.requirements?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#4b0082]">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {course.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Curriculum */}
      {course.curriculum?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#4b0082]">
            Course Curriculum
          </h2>
          <div className="divide-y">
            {course.curriculum.map((lesson, i) => (
              <div key={i} className="py-3">
                <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{lesson.content}</p>
                <p className="text-xs text-gray-400">
                  Duration: {lesson.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-right w-full">
        <Link to="/student/courses/available">
          <Button className="border border-[#4b0082] text-[#4b0082] bg-transparent hover:bg-[#4b0082] hover:text-white px-6 py-2 rounded-md">
            Back to Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
