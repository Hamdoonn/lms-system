import React from "react";

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Student 👋</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Courses</h2>
          <p className="text-gray-600">Enrolled: 5</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-gray-600">Pending: 2</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Grades</h2>
          <p className="text-gray-600">Average: A-</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Submitted Assignment 1 for Web Development</li>
          <li>Joined new course: Data Structures</li>
          <li>Scored 85% in Database Quiz</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
