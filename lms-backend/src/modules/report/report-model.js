import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    generatedBy: { type: String, required: true }, // Admin name or ID
    description: { type: String },
    metrics: { type: Object }, // Could include analytics, student count, etc.
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
