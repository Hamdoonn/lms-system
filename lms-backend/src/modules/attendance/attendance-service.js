import Attendance from "./attendance-model.js";

// Create new attendance record
export const createAttendance = async (attendanceData) => {
  const attendance = new Attendance(attendanceData);
  return await attendance.save();
};

// Get all attendance records
export const getAllAttendance = async () => {
  return await Attendance.find().sort({ date: -1 }); // latest first
};

// Get single attendance by ID
export const getAttendanceById = async (id) => {
  return await Attendance.findById(id);
};

// Update attendance record
export const updateAttendance = async (id, updatedData) => {
  return await Attendance.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete attendance record
export const deleteAttendance = async (id) => {
  return await Attendance.findByIdAndDelete(id);
};
