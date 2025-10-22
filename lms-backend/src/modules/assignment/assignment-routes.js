import express from "express";
import multer from "multer";
import * as assignmentController from "./assignment-controller.js";
import { protect } from "../../middleware/auth-middleware.js";

const router = express.Router();

// Setup Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/assignments");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//  ADD THIS ROUTE ABOVE `/:id`
// assignment-routes.js
router.post(
  "/:id/submit",
  protect,
  upload.single("file"),
  assignmentController.submitAssignment
);

// Other routes
router.get("/student", protect, assignmentController.getAssignmentsForStudent);
router.post("/", protect, assignmentController.createAssignment);
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);
router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

export default router;
