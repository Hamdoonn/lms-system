import * as attendanceService from "./attendance-service.js";

// ✅ Create new attendance
export const createAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);
    res.status(201).json({
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating attendance", error });
  }
};

// ✅ Get all attendance
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceList = await attendanceService.getAllAttendance();
    res.status(200).json(attendanceList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance list", error });
  }
};

// ✅ Get attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// ✅ Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const updated = await attendanceService.updateAttendance(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error });
  }
};

// ✅ Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await attendanceService.deleteAttendance(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error });
  }
};
