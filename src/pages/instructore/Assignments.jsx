// src/instructore/courses/Assignments.jsx
// 💡 Instructor Assignments Management
// ⚙️ Currently using dummy data; API integration can be added later.

import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, Eye, FileText } from "lucide-react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "HTML Basics",
      description: "Create a webpage using basic HTML tags.",
      dueDate: "2025-10-10",
      marks: 20,
      file: "html_basics.pdf",
    },
    {
      id: 2,
      title: "React Components",
      description: "Build a reusable card component using React.",
      dueDate: "2025-10-15",
      marks: 30,
      file: "react_components.pdf",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(null);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    marks: "",
    file: "",
  });

  const handleAdd = () => {
    if (!newAssignment.title || !newAssignment.dueDate)
      return alert("Please fill required fields!");
    setAssignments([
      ...assignments,
      { id: Date.now(), ...newAssignment },
    ]);
    setShowAddModal(false);
    setNewAssignment({ title: "", description: "", dueDate: "", marks: "", file: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  // Dummy student submissions (for View)
  const submissions = [
    {
      id: 1,
      student: "Ali Raza",
      roll: "FA20-BCS-001",
      file: "AliRaza_Assignment1.pdf",
      grade: "A",
      status: "Submitted",
    },
    {
      id: 2,
      student: "Hina Khan",
      roll: "FA20-BCS-002",
      file: "HinaKhan_Assignment1.pdf",
      grade: "B",
      status: "Submitted",
    },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold" style={{ color: "#562c78" }}>
          Assignments
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded text-white"
          style={{ backgroundColor: "#562c78" }}
        >
          <PlusCircle size={18} /> Add Assignment
        </button>
      </div>

      {/* 📋 Assignments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-center">
          <thead style={{ backgroundColor: "#562c78", color: "white" }}>
            <tr>
              <th className="p-2">Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Total Marks</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-2 font-semibold">{a.title}</td>
                <td>{a.description}</td>
                <td>{a.dueDate}</td>
                <td>{a.marks}</td>
                <td>
                  <a
                    href="#"
                    className="flex justify-center text-blue-600 hover:underline"
                  >
                    <FileText size={18} />
                  </a>
                </td>
                <td className="flex justify-center gap-3 p-2">
                  <button
                    onClick={() => setShowSubmissions(a.id)}
                    className="text-green-600 hover:text-green-800"
                    title="View Submissions"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Add Assignment Modal */}
      {showAddModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#562c78] p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#562c78" }}>
              Add New Assignment
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={newAssignment.title}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
                className="border p-2 rounded w-full focus:border-[#562c78]"
              />
              <textarea
                placeholder="Description"
                value={newAssignment.description}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, description: e.target.value })
                }
                className="border p-2 rounded w-full focus:border-[#562c78]"
              />
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                }
                className="border p-2 rounded w-full focus:border-[#562c78]"
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={newAssignment.marks}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, marks: e.target.value })
                }
                className="border p-2 rounded w-full focus:border-[#562c78]"
              />
              <input
                type="file"
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, file: e.target.files[0]?.name })
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "#562c78" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📂 View Submissions Modal */}
      {showSubmissions && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#562c78] p-6 rounded-2xl shadow-lg w-[600px]">
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#562c78" }}>
              Submissions - {assignments.find((a) => a.id === showSubmissions)?.title}
            </h3>
            <table className="w-full border text-center">
              <thead className="bg-[#562c78] text-white">
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td>{s.student}</td>
                    <td>{s.roll}</td>
                    <td>
                      <a href="#" className="text-blue-600 hover:underline">
                        {s.file}
                      </a>
                    </td>
                    <td>{s.status}</td>
                    <td>{s.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowSubmissions(null)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚙️ Developer Note */}
      <p className="text-sm text-gray-500 mt-6">
        {/* Currently using dummy data.
        Later connect to backend APIs:
          - GET /api/assignments → fetch all assignments
          - POST /api/assignments → add new assignment
          - PUT /api/assignments/:id → edit assignment
          - DELETE /api/assignments/:id → delete assignment
          - GET /api/submissions/:assignmentId → fetch submissions
        */}
      </p>
    </div>
  );
};

export default Assignments;
