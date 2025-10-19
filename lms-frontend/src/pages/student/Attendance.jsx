import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AttendancePage() {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  //  Fetch Enrolled Courses from Backend
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoadingCourses(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/enrollments/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setEnrolledCourses(response.data.data);
        } else {
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Handle View Attendance button
  const handleViewAttendance = async (course) => {
    try {
      setSelectedCourse(course);
      setAttendanceRecords([]);
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No user or token found");
        return;
      }

      const response = await axios.get(
        `http://localhost:4000/api/attendance/student/${course.course._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAttendanceRecords(response.data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Attendance</h1>

      {loadingCourses ? (
        <p className="text-gray-500 text-center py-6">Loading courses...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Date Enrolled</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((enrollment) => (
                <TableRow key={enrollment._id}>
                  <TableCell>{enrollment.course?.title}</TableCell>
                  <TableCell>{enrollment.course?.instructor}</TableCell>
                  <TableCell>
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleViewAttendance(enrollment)}
                          className="bg-[#4c008210] rounded-full border-none outline-none hover:bg-[#4c008210]"
                          variant="outline"
                        >
                          <Eye color="#4b0082" size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>See attendance</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-6"
                >
                  No enrolled courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Attendance Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Attendance - {selectedCourse?.course?.title || ""}
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : attendanceRecords.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className={`font-medium ${
                        record.status === "Present"
                          ? "text-green-600"
                          : record.status === "Absent"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {record.status}
                    </TableCell>
                    <TableCell>{record.remarks || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No attendance marked yet for this course.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
