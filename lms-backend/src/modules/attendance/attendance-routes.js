import express from "express";
import * as attendanceController from "./attendance-controller.js";
import { protect, authorize } from "../../middleware/auth-middleware.js";

const router = express.Router();

// Instructors/Admins manage attendance
router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  attendanceController.createAttendance
);
router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  attendanceController.updateAttendance
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  attendanceController.deleteAttendance
);

// Students can only view their attendance
router.get(
  "/",
  protect,
  authorize("student", "instructor", "admin"),
  attendanceController.getAllAttendance
);
router.get(
  "/:id",
  protect,
  authorize("student", "instructor", "admin"),
  attendanceController.getAttendanceById
);

// Students can view their own attendance for a course
router.get(
  "/student/:courseId",
  protect,
  authorize("student"),
  attendanceController.getMyAttendanceByCourse
);

export default router;
