import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: String, required: true, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    thumbnail: { type: String, default: "" },
    learningPoints: [{ type: String }],
    requirements: [{ type: String }],
    curriculum: [
      {
        title: String,
        content: String,
        duration: String,
      },
    ],
  },
  { timestamps: true }
);

courseSchema.pre("findOneAndDelete", async function (next) {
  const course = await this.model.findOne(this.getFilter());
  if (course) {
    await Enrollment.deleteMany({ course: course._id });
  }
  next();
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
