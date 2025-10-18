import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      dbName: "lms-cluster"
    });
    console.log("MongoDB connected to lms-cluster DB");
  } catch (error) {
    console.error("MonogDB connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
