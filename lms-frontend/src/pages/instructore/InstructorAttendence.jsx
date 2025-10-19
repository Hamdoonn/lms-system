import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const InstructorAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch courses taught by the instructor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/courses/my", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log("Courses API response:", res.data);
        setCourses(res.data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  // Fetch students enrolled in selected course
  useEffect(() => {
    if (selectedCourse) {
      const fetchStudents = async () => {
        try {
          const token = localStorage.getItem("token");
          setLoading(true);
          const res = await axios.get(
            `http://localhost:4000/api/enrollments/instructor/course/${selectedCourse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          setStudents(res.data.data || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching students:", error);
          setLoading(false);
        }
      };
      fetchStudents();
    }
  }, [selectedCourse]);

  // Handle attendance selection
  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    const payload = Object.keys(attendance).map((studentId) => ({
      student: studentId,
      course: selectedCourse,
      status: attendance[studentId],
      date: new Date(),
    }));

    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        payload.map((entry) =>
          axios.post("http://localhost:4000/api/attendance", entry, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
        )
      );
      toast.success("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to submit attendance.");
    }
  };

  return (
    <div className="max-w-4xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Mark Attendance</h2>

      {/* Course Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Course</label>
        <select
          className="border rounded-lg p-2 w-full"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Students List */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length > 0 ? (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((enroll) => (
                <tr key={enroll.student._id}>
                  <td className="p-3 border">{enroll.student.name}</td>
                  <td className="p-3 border">{enroll.student.email}</td>
                  <td className="p-3 border">
                    <select
                      className="border p-1 rounded"
                      value={attendance[enroll.student._id] || ""}
                      onChange={(e) =>
                        handleStatusChange(enroll.student._id, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Submit Attendance
          </button>
        </div>
      ) : (
        selectedCourse && <p>No students enrolled in this course.</p>
      )}
    </div>
  );
};

export default InstructorAttendance;
