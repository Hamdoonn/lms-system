import React from "react";
import { TrendingUp, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button"; // optional, if you use shadcn/ui
import StatsCard from "@/components/dashboard/StatsCard";

const GradesPage = () => {
  const coursePerformance = [
    {
      title: "Introduction to React",
      assignments: 2,
      progress: 84.5,
      grade: "B+",
    },
    { title: "Advanced JavaScript", assignments: 2, progress: 85, grade: "B+" },
    {
      title: "UI/UX Design Principles",
      assignments: 1,
      progress: 88,
      grade: "A-",
    },
  ];

  const gradeTrend = [
    {
      title: "React Components Assignment",
      course: "Introduction to React",
      grade: "B",
      score: "85/100",
      icon: "📘",
      color: "bg-blue-500",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      grade: "B",
      score: "42/50",
      icon: "❓",
      color: "bg-pink-500",
    },
    {
      title: "Async Programming Project",
      course: "Advanced JavaScript",
      grade: "A",
      score: "92/100",
      icon: "🚀",
      color: "bg-green-500",
    },
  ];

  const allGrades = [
    {
      title: "React Components Assignment",
      course: "Introduction to React",
      submitted: "Mar 18, 2024",
      graded: "Mar 19, 2024",
      grade: "B",
      score: "85/100",
      percentage: "85%",
      icon: "📘",
      color: "bg-blue-500",
      feedback:
        "Excellent work on component structure. Consider adding PropTypes for better type safety.",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      submitted: "Mar 10, 2024",
      graded: "Mar 10, 2024",
      grade: "B",
      score: "42/50",
      percentage: "84%",
      icon: "❓",
      color: "bg-pink-500",
      feedback: "Good understanding of useState and useEffect hooks.",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      submitted: "Mar 10, 2024",
      graded: "Mar 10, 2024",
      grade: "B",
      score: "42/50",
      percentage: "84%",
      icon: "❓",
      color: "bg-pink-500",
      feedback: "Good understanding of useState and useEffect hooks.",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      submitted: "Mar 10, 2024",
      graded: "Mar 10, 2024",
      grade: "B",
      score: "42/50",
      percentage: "84%",
      icon: "❓",
      color: "bg-pink-500",
      feedback: "Good understanding of useState and useEffect hooks.",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      submitted: "Mar 10, 2024",
      graded: "Mar 10, 2024",
      grade: "B",
      score: "42/50",
      percentage: "84%",
      icon: "❓",
      color: "bg-pink-500",
      feedback: "Good understanding of useState and useEffect hooks.",
    },
    {
      title: "State Management Quiz",
      course: "Introduction to React",
      submitted: "Mar 10, 2024",
      graded: "Mar 10, 2024",
      grade: "B",
      score: "42/50",
      percentage: "84%",
      icon: "❓",
      color: "bg-pink-500",
      feedback: "Good understanding of useState and useEffect hooks.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Grades & Performance</h1>
        <p className="text-zinc-500">
          Track your academic progress and performance across all courses
        </p>
      </div>

      {/* Stats Summary */}
      <StatsCard role="student" page="grades" />

      {/* Course Performance + Grade Trend */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Course Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-[#7F2F82]" />
            <h2 className="text-lg font-semibold">Course Performance</h2>
          </div>

          {coursePerformance.map((course, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    {course.assignments} assignments completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#7F2F82]">
                    {course.progress}%
                  </p>
                  <span className="text-sm text-gray-500">{course.grade}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-[#7F2F82] rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Grade Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-500" />
            <h2 className="text-lg font-semibold">Grade Trend</h2>
          </div>

          <div className="space-y-4">
            {gradeTrend.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 text-sm rounded-full text-white ${
                      item.grade === "A"
                        ? "bg-green-500"
                        : item.grade === "B"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {item.grade}
                  </span>
                  <p className="text-sm text-gray-500">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Grades Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm mt-2">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-[#7F2F82]" />
          <h2 className="text-lg font-semibold">All Grades</h2>
        </div>

        <div className="flex flex-col gap-6">
          {allGrades.map((grade, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${grade.color}`}
                  >
                    {grade.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{grade.title}</h3>
                    <p className="text-sm text-gray-500">{grade.course}</p>
                    <p className="text-sm text-gray-400">
                      Submitted: {grade.submitted} &nbsp;•&nbsp; Graded:{" "}
                      {grade.graded}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 text-sm rounded-full text-white ${
                      grade.grade === "A"
                        ? "bg-green-500"
                        : grade.grade === "B"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {grade.grade}
                  </span>
                  <p className="font-semibold text-blue-600">{grade.score}</p>
                  <p className="text-sm text-gray-500">{grade.percentage}</p>
                </div>
              </div>

              {/* Feedback */}
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-1">Instructor Feedback:</p>
                <p className="text-gray-600 text-sm">{grade.feedback}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button className="cursor-pointer border bg-[#4b0082] text-white px-4 py-2 rounded-lg hover:bg-[#4c0082b1] text-sm">
                  View Details
                </Button>
                <Button className="cursor-pointer border bg-white  text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
                  Request Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GradesPage;
