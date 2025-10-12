// modules/assignment/assignment-routes.js
import express from "express";
import * as assignmentController from "./assignment-controller.js";

const router = express.Router();

// CRUD routes
router.post("/", assignmentController.createAssignment);
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);
router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

export default router;
