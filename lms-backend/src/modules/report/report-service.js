import Report from "./report-model.js";
import Course from "../course/course-model.js"; 

// Create a report linked to a specific course
export const createReport = async (data) => {
  try {
    const { courseId, generatedBy } = data;

    // Ensure the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    //  Build the report document using course data
    const reportData = {
      title: `Report for ${course.title}`,
      courseId: course._id,
      generatedBy: generatedBy || "Admin",
      description: `Auto-generated report for ${course.title}`,
      metrics: {
        enrollments: 0, //  later update this from enrollment data
        averageRating: course.starRating || 0,
        revenue: course.price || 0,
      },
    };

    //  Save to DB
    const report = new Report(reportData);
    return await report.save();

  } catch (error) {
    console.error("Failed to generate report for course:", error);
    throw error;
  }
};

// Get all reports
export const getAllReports = async () => {
  return await Report.find().populate("courseId", "title category instructor");
};

// Get report by ID
export const getReportById = async (id) => {
  return await Report.findById(id).populate("courseId", "title category instructor");
};

// Delete report
export const deleteReport = async (id) => {
  return await Report.findByIdAndDelete(id);
};
