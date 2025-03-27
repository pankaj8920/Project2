// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from "./configs/mongodb.js";
// import { clerkMiddleware } from "@clerk/express";

// const app = express();

// app.use(cors());
// app.use(express.json());
// let dbConnected = false;

// const initializeDB = async () => {
//   try {
//     await connectDB();
//     dbConnected = true;
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     if (process.env.MONGODB_URI === "production") {
//       process.exit(1); 
//     }
//   }
// };
// app.get("/", (req, res) => {
//   res.status(200).json({
//     status: "API Working",
//     database: dbConnected ? "Connected" : "Disconnected"
//   });
// });
// app.get("/health", (req, res) => {
//   res.status(dbConnected ? 200 : 503).json({
//     status: dbConnected ? "Healthy" : "Unhealthy",
//     database: dbConnected ? "Connected" : "Disconnected",
//     timestamp: new Date().toISOString()
//   });
// });
// app.use((req, res) => {
//   res.status(404).json({ error: "Not Found" });
// });

// app.use((err, req, res, next) => {
//   console.error("⚠️ Server error:", err.stack);
//   res.status(500).json({ 
//     error: "Internal Server Error",
//     message: process.env.MONGODB_URI === "development" ? err.message : undefined
//   });
// });
// const startServer = async () => {
//   try {
//     await initializeDB();
//     if (process.env.MONGODB_URI !== "production") {
//       const PORT = process.env.PORT || 3000;
//       app.listen(PORT, () => {
//         console.log(`🚀 Server running on http://localhost:${PORT}`);
//       });
//     }
//   } catch (error) {
//     console.error("🔥 Failed to start server:", error);
//     process.exit(1);
//   }
// };

// startServer();
// export default app;


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/webhooks.js";  // Clerk webhook controller import kiya

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Clerk middleware add kiya (Agar authentication chahiye)
app.use(clerkMiddleware());

// ✅ Webhook ke liye Raw Body Middleware
app.use("/api/clerk-webhook", bodyParser.raw({ type: "application/json" }));

// ✅ MongoDB Connection Flag
let dbConnected = false;

// ✅ MongoDB Initialize Function
const initializeDB = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    if (process.env.MONGODB_URI === "production") {
      process.exit(1);
    }
  }
};

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "API Working",
    database: dbConnected ? "Connected" : "Disconnected"
  });
});

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "Healthy" : "Unhealthy",
    database: dbConnected ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// ✅ Clerk Webhook Route (for user updates)
app.post("/api/clerk-webhook", clerkWebhooks);

// ✅ 404 Route Handling
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("⚠️ Server error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.MONGODB_URI === "development" ? err.message : undefined
  });
});

// ✅ Start Server Function
const startServer = async () => {
  try {
    await initializeDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔥 Failed to start server:", error);
    process.exit(1);
  }
};

// ✅ Start the Server
startServer();

export default app;
