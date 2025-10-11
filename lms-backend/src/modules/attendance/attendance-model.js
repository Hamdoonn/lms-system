import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Leave"], // ✅ Added more options
      default: "Absent",
    },
    remarks: { type: String }, // optional notes (like “medical leave” etc.)
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
