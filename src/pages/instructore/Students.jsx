import React, { useState } from "react";
import { Search, Eye, Trash2, Edit, PlusCircle } from "lucide-react";

const Students = () => {
  // Dummy Data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ali Khan",
      roll: "BSCS-101",
      email: "ali@example.com",
      course: "Web Development",
      progress: 85,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      roll: "BSCS-102",
      email: "sara@example.com",
      course: "AI Fundamentals",
      progress: 60,
    },
    {
      id: 3,
      name: "Hamza Iqbal",
      roll: "BSCS-103",
      email: "hamza@example.com",
      course: "Database Systems",
      progress: 45,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    email: "",
    course: "",
    progress: "",
  });

  // Filter logic
  const filteredStudents = students.filter(
    (s) =>
      (selectedCourse === "All" || s.course === selectedCourse) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.roll.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    if (
      newStudent.name &&
      newStudent.roll &&
      newStudent.email &&
      newStudent.course
    ) {
      setStudents([
        ...students,
        { ...newStudent, id: Date.now(), progress: newStudent.progress || 0 },
      ]);
      setNewStudent({
        name: "",
        roll: "",
        email: "",
        course: "",
        progress: "",
      });
      setAdding(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0" style={{ color: "#562c78" }}>
          Enrolled Students
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-2 top-2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#562c78]"
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#562c78]"
          >
            <option value="All">All Courses</option>
            {[...new Set(students.map((s) => s.course))].map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-[#562c78] text-white px-4 py-2 rounded-lg hover:bg-[#452263] transition"
          >
            <PlusCircle size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-[#562c78] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Roll No</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          backgroundColor: "#562c78",
                          width: `${s.progress}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="flex gap-3 py-3">
                    <button
                      onClick={() => setViewing(s)}
                      className="text-[#562c78] hover:text-[#3d1f5a]"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => alert("Edit feature coming soon!")}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#562c78] rounded-2xl p-6 w-96 shadow-lg">
            <h3
              className="text-xl font-bold mb-4 text-center"
              style={{ color: "#562c78" }}
            >
              Student Details
            </h3>
            <p><b>Name:</b> {viewing.name}</p>
            <p><b>Roll No:</b> {viewing.roll}</p>
            <p><b>Email:</b> {viewing.email}</p>
            <p><b>Course:</b> {viewing.course}</p>
            <p><b>Progress:</b> {viewing.progress}%</p>
            <div className="text-center mt-5">
              <button
                onClick={() => setViewing(null)}
                className="px-4 py-2 bg-[#562c78] text-white rounded-lg hover:bg-[#452263]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {adding && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#562c78] rounded-2xl p-6 w-96 shadow-lg">
            <h3
              className="text-xl font-bold mb-4 text-center"
              style={{ color: "#562c78" }}
            >
              Add New Student
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-[#562c78]"
              />
              <input
                type="text"
                placeholder="Roll No"
                value={newStudent.roll}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, roll: e.target.value })
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-[#562c78]"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-[#562c78]"
              />
              <input
                type="text"
                placeholder="Course"
                value={newStudent.course}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, course: e.target.value })
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-[#562c78]"
              />
              <input
                type="number"
                placeholder="Progress (%)"
                value={newStudent.progress}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, progress: e.target.value })
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-[#562c78]"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setAdding(false)}
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

      {/* Future integration comment */}
      {/* 
        🔧 Currently showing dummy data.
        Later: Replace with API fetch (e.g., GET /api/instructor/:id/students)
        On add/delete: call POST/DELETE API instead of local state update.
      */}
    </div>
  );
};

export default Students;
