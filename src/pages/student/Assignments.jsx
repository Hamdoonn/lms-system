import StatsCard from "@/components/dashboard/StatsCard";
import React, { useState } from "react";
import { Clock, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Assignments = () => {
  const [assignments, setAssignments] = useState({
    pending: [
      { id: 1, title: "React Components Project", dueDate: "Oct 10, 2025" },
      { id: 2, title: "UI/UX Wireframe Design", dueDate: "Oct 12, 2025" },
    ],
    inProgress: [
      { id: 3, title: "Responsive Portfolio Website", dueDate: "Oct 15, 2025" },
    ],
    completed: [
      { id: 4, title: "HTML & CSS Landing Page", submittedDate: "Oct 1, 2025" },
    ],
  });

  // Move assignment to another category
  const moveAssignment = (id, from, to) => {
    const item = assignments[from].find((a) => a.id === id);
    if (!item) return;

    setAssignments((prev) => ({
      ...prev,
      [from]: prev[from].filter((a) => a.id !== id),
      [to]: [
        ...prev[to],
        to === "completed"
          ? { ...item, submittedDate: new Date().toDateString() }
          : item,
      ],
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Assignments</h1>
        <p className="text-zinc-500">
          Track your assignments and submissions across all courses
        </p>
      </div>
      {/* Stats */}
      <StatsCard role="student" page="assignments" />

      {/* Assignment Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pending */}
        <div className="rounded-xl border bg-white p-5  flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <h2 className="font-semibold text-black">Pending</h2>
          </div>
          {assignments.pending.length > 0 ? (
            assignments.pending.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border p-4  transition bg-gray-50 flex flex-col gap-2"
              >
                <p className="font-medium text-gray-800">{a.title}</p>
                <p className="text-sm text-gray-500">Due {a.dueDate}</p>
                <Button
                  onClick={() => moveAssignment(a.id, "pending", "inProgress")}
                  className="self-start px-3 cursor-pointer  py-1 text-sm rounded-md bg-[#4b0082] text-white hover:bg-[#4b0082] transition"
                >
                  Start
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No pending assignments 🎉</p>
          )}
        </div>

        {/* In Progress */}
        <div className="rounded-xl border bg-white p-5  flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-black">In Progress</h2>
          </div>
          {assignments.inProgress.length > 0 ? (
            assignments.inProgress.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border p-4  transition bg-gray-50 flex flex-col gap-2"
              >
                <p className="font-medium text-gray-800">{a.title}</p>
                <p className="text-sm text-gray-500">Due {a.dueDate}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                </div>
                <Button
                  onClick={() =>
                    moveAssignment(a.id, "inProgress", "completed")
                  }
                  className="cursor-pointer self-start px-3 py-1 text-sm rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition"
                >
                  Mark Complete
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No assignments in progress</p>
          )}
        </div>

        {/* Completed */}
        <div className="rounded-xl border bg-white p-5  flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-black">Completed</h2>
          </div>
          {assignments.completed.length > 0 ? (
            assignments.completed.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border p-4  transition bg-gray-50 flex flex-col gap-2"
              >
                <p className="font-medium text-gray-800">{a.title}</p>
                <p className="text-sm text-gray-500">
                  Submitted {a.submittedDate}
                </p>
                <span className="inline-block px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">
                  Completed
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No completed assignments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
