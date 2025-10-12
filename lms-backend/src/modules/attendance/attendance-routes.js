import express from "express";
import * as attendanceController from "./attendance-controller.js";

const router = express.Router();

// RESTful Routes
router.post("/", attendanceController.createAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

export default router;
