import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
  getEnrollmentByCourseForStudent,
  getEnrollmentByCourseForInstructor,
} from "./enrollment-controller.js";
import EnrollmentService from "./enrollment-service.js";
import { protect, authorize } from "../../middleware/auth-middleware.js";

const router = express.Router();

/**
 *     Student enrolls in a course
 */
router.post("/", protect, authorize("student"), createEnrollment);
/**
 * Get all students enrolled in a course (Instructor/Admin)
 */
router.get(
  "/instructor/course/:courseId",
  protect,
  authorize("instructor", "admin"),
  getEnrollmentByCourseForInstructor
);

/**
  Get all courses the logged-in student has enrolled in
 */
router.get("/my", protect, authorize("student"), async (req, res) => {
  try {
    const studentId = req.user._id;
    const enrollments = await EnrollmentService.getStudentEnrollments(
      studentId
    );

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
});

/**
 *  all enrollments for a specific course (student/admin)
 */
router.get(
  "/course/:courseId",
  protect,
  authorize("instructor", "admin", "student"),
  getEnrollmentByCourseForStudent
);

/**
 * Get all enrollments (Admin only)
 */
router.get("/", protect, authorize("admin"), getAllEnrollments);

/**
 *     Get specific enrollment by enrollment ID
 */
router.get("/:id", protect, getEnrollmentById);

/**
 *    Delete or cancel an enrollment
 */
router.delete("/:id", protect, authorize("student", "admin"), deleteEnrollment);

export default router;
