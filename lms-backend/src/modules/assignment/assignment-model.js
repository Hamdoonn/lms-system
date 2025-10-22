import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    type: String,
    url: String,
    lastModified: Number,
    lastModifiedDate: Date,
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    file: {
      name: String,
      url: String,
      size: Number,
      type: String,
    },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, default: 100 },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [attachmentSchema],
    status: {
      type: String,
      enum: ["Pending", "Published", "Closed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
