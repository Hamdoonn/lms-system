import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./course-controller.js";
import { protect, authorize } from "../../middleware/auth-middleware.js";
import Course from "./course-model.js";

const router = express.Router();

// COURSE MANAGEMENT ROUTES
router.get("/my", protect, authorize("instructor"), async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error,
    });
  }
});

router.post("/", protect, authorize("instructor"), createCourse); // Only instructors can create
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
