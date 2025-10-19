import Attendance from "./attendance-model.js";

// Create new attendance record
export const createAttendance = async (attendanceData) => {
  const attendance = new Attendance(attendanceData);
  return await attendance.save();
};

// Get attendance records for a specific student and course
export const getAttendanceByStudentAndCourse = async (studentId, courseId) => {
  return await Attendance.find({ student: studentId, course: courseId })
    .populate("student", "name email")
    .populate("course", "title category")
    .sort({ date: -1 });
};

export const getAllAttendance = async () => {
  return await Attendance.find()
    .populate("student", "name email")
    .populate("course", "title category")
    .sort({ date: -1 });
};

export const getAttendanceById = async (id) => {
  return await Attendance.findById(id)
    .populate("student", "name email")
    .populate("course", "title category");
};

// Update attendance record
export const updateAttendance = async (id, updatedData) => {
  return await Attendance.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete attendance record
export const deleteAttendance = async (id) => {
  return await Attendance.findByIdAndDelete(id);
};
