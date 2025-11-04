import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
      throw new Error("MongoDB URI not set in environment");
    }

    await mongoose.connect(mongodbURI, {
      dbName: "CareerCompassResumes",
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB", error);
  }
};

export default connectDB;
