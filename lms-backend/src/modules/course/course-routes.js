import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./course-controller.js";
import { protect, authorize } from "../../middleware/auth-middleware.js";

const router = express.Router();

// COURSE MANAGEMENT ROUTES
router.post("/", protect, authorize("instructor"), createCourse); // Only instructors can create
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
