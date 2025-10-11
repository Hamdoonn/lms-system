// modules/assignment/assignment-service.js
import Assignment from "./assignment-model.js";

/** CREATE ASSIGNMENT **/
export const createAssignment = async (data) => {
  const assignment = new Assignment(data);
  return await assignment.save();
};

/** GET ALL ASSIGNMENTS **/
export const getAllAssignments = async () => {
  return await Assignment.find()
    .populate("courseId", "title code") // only specific fields from Course
    .populate("createdBy", "name email role") // only basic user info
    .sort({ createdAt: -1 }); // newest first
};

/** GET ASSIGNMENT BY ID **/
export const getAssignmentById = async (id) => {
  return await Assignment.findById(id)
    .populate("courseId", "title code")
    .populate("createdBy", "name email role");
};

/** UPDATE ASSIGNMENT **/
export const updateAssignment = async (id, data) => {
  // Prevent createdBy from being overwritten
  delete data.createdBy;
  return await Assignment.findByIdAndUpdate(id, data, { new: true })
    .populate("courseId", "title code")
    .populate("createdBy", "name email role");
};

/** DELETE ASSIGNMENT **/
export const deleteAssignment = async (id) => {
  return await Assignment.findByIdAndDelete(id);
};
