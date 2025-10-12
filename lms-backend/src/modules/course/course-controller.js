import CourseService from "./course-service.js";
import * as reportService from "../report/report-service.js";

// Create a new course

export const createCourse = async (req, res) => {
  // TODO: Once Auth module is added, fetch instructor name from req.user
  // Example: const instructorName = req.user?.name;

  try {
    // Create the course first
    const newCourse = await CourseService.createCourse(req.body);

    // Auto-generate a report for the new course
    try {
      await reportService.createReport({
        courseId: newCourse._id,
        reportTitle: `Performance Report for ${newCourse.title}`,
        summary: `An initial report was automatically generated for the course "${newCourse.title}" in the category "${newCourse.category}". Instructor: ${newCourse.instructor}.`,
        generatedAt: new Date(),
      });

      console.log(` Auto-generated report for course: ${newCourse.title}`);
    } catch (err) {
      console.error(" Failed to auto-generate report:", err.message);
    }

    // Respond to client
    res.status(201).json({
      message: "Course created successfully and report generated.",
      course: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Get all courses

export const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// Get course by ID

export const getCourseById = async (req, res) => {
  try {
    const course = await CourseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

// Update course by ID

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await CourseService.updateCourse(
      req.params.id,
      req.body
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// Delete course by ID
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await CourseService.deleteCourse(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};
