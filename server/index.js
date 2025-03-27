import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// ======================
// 1. Middlewares
// ======================
app.use(cors());
app.use(express.json());
// app.use(clerkMiddleware()); // Uncomment when ready

// ======================
// 2. Database Connection
// ======================
let dbConnected = false;

const initializeDB = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit if DB connection is critical
    if (process.env.NODE_ENV === "production") {
      process.exit(1); 
    }
  }
};

// ======================
// 3. Routes
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "API Working",
    database: dbConnected ? "Connected" : "Disconnected"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "Healthy" : "Unhealthy",
    database: dbConnected ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// ======================
// 4. Error Handling
// ======================
// Catch 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("⚠️ Server error:", err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ======================
// 5. Server Initialization
// ======================
const startServer = async () => {
  try {
    await initializeDB();
    
    // Local development server
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("🔥 Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel serverless
export default app;
