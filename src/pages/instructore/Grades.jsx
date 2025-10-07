// src/instructore/courses/Grades.jsx
// 📘 Component: Grades.jsx
// 💡 Description: Instructor can view, add, edit, and delete student grades.
// ⚙️ Currently using dummy data. Replace dummyData section with API calls when backend is ready.

import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react"; // Icons (from lucide-react)

const Grades = () => {
  // ✅ Dummy data (replace later with backend data)
  const [grades, setGrades] = useState([
    { id: 1, name: "Ali Raza", roll: "FA20-BCS-001", assignment: 20, mid: 30, final: 40, total: 90, grade: "A" },
    { id: 2, name: "Hina Khan", roll: "FA20-BCS-002", assignment: 18, mid: 22, final: 40, total: 80, grade: "B" },
    { id: 3, name: "Umar Shah", roll: "FA20-BCS-003", assignment: 10, mid: 20, final: 30, total: 60, grade: "C" },
  ]);

  const [newGrade, setNewGrade] = useState({
    name: "",
    roll: "",
    assignment: "",
    mid: "",
    final: "",
  });

  const [editing, setEditing] = useState(null);

  // 📊 Calculate total & grade automatically
  const calculateGrade = (assignment, mid, final) => {
    const total = Number(assignment) + Number(mid) + Number(final);
    let grade = "F";
    if (total >= 85) grade = "A";
    else if (total >= 70) grade = "B";
    else if (total >= 55) grade = "C";
    else if (total >= 40) grade = "D";
    return { total, grade };
  };

  // ➕ Add new student grade
  const handleAddGrade = () => {
    if (!newGrade.name || !newGrade.roll) return alert("Please fill all fields!");
    const { total, grade } = calculateGrade(newGrade.assignment, newGrade.mid, newGrade.final);
    setGrades([
      ...grades,
      { id: Date.now(), ...newGrade, total, grade },
    ]);
    setNewGrade({ name: "", roll: "", assignment: "", mid: "", final: "" });
  };

  // ✏️ Edit student grade
  const handleEdit = (id) => {
    const g = grades.find((gr) => gr.id === id);
    setEditing(g);
  };

  // 💾 Save updated grade
  const handleUpdate = () => {
    const { total, grade } = calculateGrade(editing.assignment, editing.mid, editing.final);
    setGrades(
      grades.map((g) => (g.id === editing.id ? { ...editing, total, grade } : g))
    );
    setEditing(null);
  };

  // 🗑️ Delete student record
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setGrades(grades.filter((g) => g.id !== id));
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "#562c78" }}
      >
        Student Grades
      </h2>

      {/* 🟢 Add New Grade Section */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Student Name"
          value={newGrade.name}
          onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Roll No"
          value={newGrade.roll}
          onChange={(e) => setNewGrade({ ...newGrade, roll: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Assignment"
          value={newGrade.assignment}
          onChange={(e) => setNewGrade({ ...newGrade, assignment: e.target.value })}
          className="border p-2 rounded w-28"
        />
        <input
          type="number"
          placeholder="Mid"
          value={newGrade.mid}
          onChange={(e) => setNewGrade({ ...newGrade, mid: e.target.value })}
          className="border p-2 rounded w-20"
        />
        <input
          type="number"
          placeholder="Final"
          value={newGrade.final}
          onChange={(e) => setNewGrade({ ...newGrade, final: e.target.value })}
          className="border p-2 rounded w-20"
        />
        <button
          onClick={handleAddGrade}
          className="flex items-center gap-2 px-4 py-2 rounded text-white"
          style={{ backgroundColor: "#562c78" }}
        >
          <PlusCircle size={18} /> Add
        </button>
      </div>

      {/* 📋 Grades Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-center">
          <thead style={{ backgroundColor: "#562c78", color: "white" }}>
            <tr>
              <th className="p-2">Name</th>
              <th>Roll No</th>
              <th>Assignment</th>
              <th>Mid</th>
              <th>Final</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{g.name}</td>
                <td>{g.roll}</td>
                <td>{g.assignment}</td>
                <td>{g.mid}</td>
                <td>{g.final}</td>
                <td>{g.total}</td>
                <td className="font-semibold">{g.grade}</td>
                <td className="flex justify-center gap-3 p-2">
                  <button
                    onClick={() => handleEdit(g.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {/* ✏️ Edit Modal */}
      {editing && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#4b8002] p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#4b8002" }}>
              Edit Grade
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Assignment"
                value={editing.assignment}
                onChange={(e) => setEditing({ ...editing, assignment: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#4b8002]"
              />
              <input
                type="number"
                placeholder="Mid"
                value={editing.mid}
                onChange={(e) => setEditing({ ...editing, mid: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#4b8002]"
              />
              <input
                type="number"
                placeholder="Final"
                value={editing.final}
                onChange={(e) => setEditing({ ...editing, final: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#4b8002]"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "#562c78" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔧 Developer Note */}
      <p className="text-sm text-gray-500 mt-6">
        {/* ⚙️ NOTE: Currently showing dummy data.
        Once backend API is connected, replace the dummy array and functions with API calls:
          - GET /api/grades → to fetch all grades
          - POST /api/grades → to add new grade
          - PUT /api/grades/:id → to update a grade
          - DELETE /api/grades/:id → to delete grade
        */}
      </p>
    </div>
  );
};

export default Grades;
