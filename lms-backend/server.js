import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import userRoutes from "./src/modules/user/user-routes.js";

dotenv.config();

const app = express();
app.use(express.json());

//routes
app.use("/api/users", userRoutes);

//connect mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
