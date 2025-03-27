import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Cache the connection to avoid repeated connections (critical for serverless)
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log("✅ Using cached MongoDB connection");
    return cachedDb;
  }

  try {
    // Connect to MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "study", // Specify DB name here (cleaner than appending to URI)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Cache the connection
    cachedDb = db;
    console.log("✅ MongoDB Connected");
    return db;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err; // Fail fast in production
  }
};

export default connectDB;
