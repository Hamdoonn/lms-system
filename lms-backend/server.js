import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";

import userRoutes from "./src/modules/user/user-routes.js";
import assignmentRoutes from "./src/modules/assignment/assignment-routes.js";
import attendanceRoutes from "./src/modules/attendance/attendance-routes.js";
import submissionRoutes from "./src/modules/submission/submission-routes.js";

import courseRoutes from "./src/modules/course/course-routes.js";
import reportRoutes from "./src/modules/report/report-routes.js";
import enrollmentRoutes from "./src/modules/enrollment/enrollment-routes.js";

import User from "./src/modules/user/user-model.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect mongodb
connectDB().then(() => {
  // Create admin automatically if not exists
  createDefaultAdmin();
});
// Function to auto-create admin if missing
async function createDefaultAdmin() {
  console.log("Connected DB:", mongoose.connection.db.databaseName);

  try {
    const adminEmail = "admin@mail.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      await User.create({
        name: "System Admin",
        email: adminEmail,
        password: "admin12345",
        role: "admin",
      });
      console.log(`Default admin created: ${adminEmail} / admin12345`);
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err);
  }
}

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MAIN API routes
app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
