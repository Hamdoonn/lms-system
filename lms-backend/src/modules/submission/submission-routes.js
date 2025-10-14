import express from "express";
import {
  addSubmission,
  getSubmissions,
  getSubmission,
  editSubmission,
  removeSubmission,
} from "./submission-controller.js";

const router = express.Router();

router.post("/", addSubmission);       // create new submission
router.get("/", getSubmissions);       // get all submissions
router.get("/:id", getSubmission);     // get one submission
router.put("/:id", editSubmission);    // update submission (status/grade)
router.delete("/:id", removeSubmission); // delete submission

export default router;
