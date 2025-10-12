import CourseService from "./course-service.js";
import * as reportService from "../report/report-service.js";


 //Create a new course
 // Only instructors can create courses
 
export const createCourse = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - Please log in" });
    }
    console.log("🧑 Logged-in user:", req.user);

    // Only instructors can create courses
    if (req.user.role !== "instructor") {
      return res
        .status(403)
        .json({ message: "Only instructors can create courses" });
    }

    // Get instructor name from logged-in user
    const instructorName = req.user.name;

    console.log("✅ Instructor Name:", instructorName); 

    // Merge instructor name into course data
    const courseData = {
      ...req.body,
      instructor: instructorName,
    };

    // Create the course
    const newCourse = await CourseService.createCourse(courseData);

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

    res.status(200).json({
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


 //Get all courses
 
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


 //Get course by ID
 
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
 // Only admins can update courses
 
export const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can update courses",
      });
    }

    const existingCourse = await CourseService.getCourseById(req.params.id);
    if (!existingCourse)
      return res.status(404).json({ message: "Course not found" });

    const updatedCourse = await CourseService.updateCourse(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Course updated successfully by admin",
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
// Only admins can delete courses
 
export const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can delete courses",
      });
    }

    const existingCourse = await CourseService.getCourseById(req.params.id);
    if (!existingCourse)
      return res.status(404).json({ message: "Course not found" });

    await CourseService.deleteCourse(req.params.id);

    res.status(200).json({ message: "Course deleted successfully by admin" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};
