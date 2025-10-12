// modules/assignment/assignment-controller.js
import * as assignmentService from "./assignment-service.js";

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
    console.error(error);
    res.status(500).json({ message: "Error creating assignment", error });
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
