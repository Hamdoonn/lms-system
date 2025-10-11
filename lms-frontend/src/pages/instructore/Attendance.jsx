import { AttendanceData } from "@/lib/AttendanceData";
import React, { useState } from "react";
import { toast } from "sonner";

const Attendance = () => {
  const [data, setData] = useState(AttendanceData);

  const handleStatusChange = (id, status) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };
  const handleSubmit = () => {
    toast.success("Attendance Submitted");
    console.log(data);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mark Attendance</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.date}</TableCell>
              <TableCell>
                <Select
                  value={student.status}
                  onValueChange={(value) =>
                    handleStatusChange(student.id, value)
                  }
                >
                  <SelectTrigger>{student.status}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className="mt-4" onClick={handleSubmit}>
        Save Attendance
      </Button>
    </div>
  );
};

export default Attendance;
