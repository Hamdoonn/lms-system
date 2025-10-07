"use client";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { AttendanceData } from "@/lib/AttendanceData";
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

export default function EnrolledCourses() {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(data);
  }, []);

  const handleViewAttendance = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const courseAttendance = selectedCourse
    ? AttendanceData.filter(
        (record) => record.course === selectedCourse.courseName
      )
    : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Attendance </h1>

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
            enrolledCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.dateEnrolled}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleViewAttendance(course)}
                        className=" bg-[#4c008210] rounded-full border-none outline-none hover:bg-[#4c008210] cursor-pointer"
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
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                No enrolled courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Attendance Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Attendance - {selectedCourse?.courseName || ""}
            </DialogTitle>
          </DialogHeader>

          {courseAttendance.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell
                      className={`font-medium ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {record.status}
                    </TableCell>
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
