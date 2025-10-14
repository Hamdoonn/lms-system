import Submission from "./submission-model.js";

// Create new submission
export const createSubmission = async (data) => {
  const submission = new Submission(data);
  return await submission.save();
};

// Get all submissions
export const getAllSubmissions = async () => {
  return await Submission.find()
    .populate("studentId", "name email")
    .populate("assignmentId", "title description dueDate");
};

// Get single submission
export const getSubmissionById = async (id) => {
  return await Submission.findById(id)
    .populate("studentId", "name email")
    .populate("assignmentId", "title description dueDate");
};

// Update submission (status or grade)
export const updateSubmission = async (id, data) => {
  return await Submission.findByIdAndUpdate(id, data, { new: true });
};

// Delete submission
export const deleteSubmission = async (id) => {
  return await Submission.findByIdAndDelete(id);
};
