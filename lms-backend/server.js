import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import userRoutes from "./src/modules/user/user-routes.js";
import assignmentRoutes from "./src/modules/assignment/assignment-routes.js";
import attendanceRoutes from "./src/modules/attendance/attendance-routes.js";


dotenv.config();

const app = express();
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);

//connect mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
