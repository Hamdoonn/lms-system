import Enrollment from "./enrollment-model.js";

const createEnrollment = async (studentId, courseId) => {
  const enrollment = new Enrollment({
    student: studentId,
    course: courseId,
    status: "enrolled",
  });
  return enrollment.save();
};

// Get all enrollment
const getAllEnrollments = async () => {
  return Enrollment.find()
    .populate("student", "name email role")
    .populate("course", "title instructor");
};

// Get enrollment by enrollmentId (NOT _id)
const getEnrollmentById = async (id) => {
  return Enrollment.findOne({ enrollmentId: id })
    .populate("student", "name email role")
    .populate("course", "title instructor");
};

// Update by enrollmentId
const updateEnrollment = async (id, updateData) => {
  return Enrollment.findOneAndUpdate({ enrollmentId: id }, updateData, {
    new: true,
  });
};

// Delete by enrollmentId
const deleteEnrollment = async (id) => {
  return Enrollment.findOneAndDelete({ enrollmentId: id });
};

// Check if student is enrolled in a course
const findByStudentAndCourse = async (studentId, courseId) => {
  return Enrollment.findOne({ student: studentId, course: courseId });
};

// Get all enrollments of a student
const getStudentEnrollments = async (studentId) => {
  const enrollments = await Enrollment.find({ student: studentId })
    .populate({
      path: "course",
      match: { _id: { $ne: null } }, // exclude if course is missing
    })
    .lean();

  // Filter out enrollments where the course got deleted
  return enrollments.filter((enrollment) => enrollment.course !== null);
};

// Get all enrollments of a course
const getCourseEnrollments = async (courseId) => {
  return Enrollment.find({ course: courseId }).populate(
    "student",
    "name email"
  );
};

export default {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  findByStudentAndCourse,
  getStudentEnrollments,
  getCourseEnrollments,
};
