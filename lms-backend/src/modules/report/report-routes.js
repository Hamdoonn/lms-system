import express from "express";
import {
  generateReport,
  getReports,
  getReport,
  deleteReport,
} from "./report-controller.js";



const router = express.Router();

router.post("/", generateReport); 
router.get("/", getReports);      
router.get("/:id", getReport);   
router.delete("/:id", deleteReport); 

export default router;
