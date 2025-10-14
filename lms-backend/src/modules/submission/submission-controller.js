import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
} from "./submission-service.js";

// Add a new submission
export const addSubmission = async (req, res) => {
  try {
    const submission = await createSubmission(req.body);
    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all submissions
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await getAllSubmissions();
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single submission
export const getSubmission = async (req, res) => {
  try {
    const submission = await getSubmissionById(req.params.id);
    if (!submission)
      return res.status(404).json({ success: false, message: "Submission not found" });

    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update submission
export const editSubmission = async (req, res) => {
  try {
    const updated = await updateSubmission(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete submission
export const removeSubmission = async (req, res) => {
  try {
    await deleteSubmission(req.params.id);
    res.status(200).json({ success: true, message: "Submission deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
