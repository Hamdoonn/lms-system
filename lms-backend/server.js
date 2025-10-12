import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import connectDB from "./src/config/db.js";

import courseRoutes from "./src/modules/course/course-routes.js"; 
import reportRoutes from "./src/modules/report/report-routes.js";

dotenv.config();

const app = express();
app.use(express.json());


//connect mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MAIN API routes

app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
