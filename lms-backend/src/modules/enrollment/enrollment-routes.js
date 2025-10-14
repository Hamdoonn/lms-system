import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
  getEnrollmentByCourseForStudent,
} from "./enrollment-controller.js";

import { protect, authorize } from "../../middleware/auth-middleware.js";

const router = express.Router();

// Student enrolls in a course
router.post("/", protect, authorize("student"), createEnrollment);

// Student gets their own enrollment in a course
// Admin gets all enrollments for this course
router.get("/course/:courseId", protect, getEnrollmentByCourseForStudent);

// Admin fetches ALL enrollments
router.get("/", protect, authorize("admin"), getAllEnrollments);

// Admin OR Owner fetch enrollment by enrollmentId (ENR-xxxx)
router.get("/:id", protect, getEnrollmentById);

// Admin deletes any, student cancels their own
router.delete("/:id", protect, deleteEnrollment);

export default router;
