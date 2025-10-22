// modules/assignment/assignment-controller.js
import * as assignmentService from "./assignment-service.js";
import Enrollment from "../enrollment/enrollment-model.js";
import Assignment from "./assignment-model.js";

/** CREATE **/
export const createAssignment = async (req, res) => {
  try {
    // If using authentication middleware, add this later:
    req.body.createdBy = req.user._id;

    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating assignment", error });
  }
};

/** SUBMIT ASSIGNMENT **/

export const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;

    const fileData = {
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `/uploads/${file.filename}`,
      lastModified: Date.now(),
      lastModifiedDate: new Date(),
    };

    const updatedAssignment = await assignmentService.addSubmission(
      assignmentId,
      fileData
    );

    res.status(200).json({
      message: "File uploaded successfully",
      data: updatedAssignment,
    });
  } catch (error) {
    console.error("❌ Error submitting file:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
/** GET ALL **/
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

/** Get assignments for logged-in student **/
export const getAssignmentsForStudent = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Find courses the student is enrolled in
    const enrollments = await Enrollment.find({ studentId }).select("courseId");
    const courseIds = enrollments.map((e) => e.courseId);

    // Fetch assignments for those courses
    const assignments = await Assignment.find({ courseId: { $in: courseIds } })
      .populate("courseId", "title code")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching student assignments:", error);
    res.status(500).json({
      message: "Error fetching student assignments",
      error: error.message,
    });
  }
};

/** GET BY ID **/
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment", error });
  }
};

/** UPDATE **/
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignment(
      req.params.id,
      req.body
    );
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment", error });
  }
};

/** DELETE **/
export const deleteAssignment = async (req, res) => {
  try {
    const deleted = await assignmentService.deleteAssignment(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting assignment", error });
  }
};
