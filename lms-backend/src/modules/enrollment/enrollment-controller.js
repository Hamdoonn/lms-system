import EnrollmentService from "./enrollment-service.js";
import Course from "../course/course-model.js";

/**
 * Create Enrollment (Students only)
 */
export const createEnrollment = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { courseId } = req.body;

    // Only student can enroll
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existing = await EnrollmentService.findByStudentAndCourse(
      studentId,
      courseId
    );
    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Create enrollment
    const enrollment = await EnrollmentService.createEnrollment(
      studentId,
      courseId
    );

    return res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to enroll",
      error: error.message,
    });
  }
};

/**
 * Get all enrollments (Admin only)
 */
export const getAllEnrollments = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can view all enrollments" });
    }

    const enrollments = await EnrollmentService.getAllEnrollments();
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch enrollments",
      error: error.message,
    });
  }
};

/**
 * Get enrollment by enrollmentId (Admin or Owner)
 */
export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await EnrollmentService.getEnrollmentById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Admin or Owner
    if (
      req.user.role !== "admin" &&
      enrollment.student._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(enrollment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch enrollment",
      error: error.message,
    });
  }
};

/**
 * Get enrollment by course for student
 */
export const getEnrollmentByCourseForStudent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Admin: get all enrollments for this course
    if (req.user.role === "admin") {
      const enrollments = await EnrollmentService.getCourseEnrollments(
        courseId
      );
      return res.status(200).json(enrollments);
    }

    // Student: get only their own enrollment
    const enrollment = await EnrollmentService.findByStudentAndCourse(
      studentId,
      courseId
    );

    if (!enrollment) {
      return res
        .status(404)
        .json({ message: "You are not enrolled in this course" });
    }

    return res.status(200).json(enrollment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch enrollment",
      error: error.message,
    });
  }
};

/**
 * Update enrollment (Admin or Owner can update)
 */
export const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await EnrollmentService.getEnrollmentById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Only admin or owner
    if (
      req.user.role !== "admin" &&
      enrollment.student._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await EnrollmentService.updateEnrollment(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      message: "Enrollment updated successfully",
      enrollment: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update enrollment",
      error: error.message,
    });
  }
};

/**
 * Delete enrollment (Admin or Owner can delete/cancel)
 */
export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await EnrollmentService.getEnrollmentById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Admin can delete any
    if (req.user.role === "admin") {
      await EnrollmentService.deleteEnrollment(req.params.id);
      return res.status(200).json({ message: "Enrollment deleted by admin" });
    }

    // Student can cancel their own
    if (
      req.user.role === "student" &&
      enrollment.student._id.toString() === req.user._id.toString()
    ) {
      await EnrollmentService.deleteEnrollment(req.params.id);
      return res
        .status(200)
        .json({ message: "Enrollment cancelled by student" });
    }

    return res
      .status(403)
      .json({ message: "You are not allowed to delete this enrollment" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete enrollment",
      error: error.message,
    });
  }
};
