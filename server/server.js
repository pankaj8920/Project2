import dotenv from "dotenv";
dotenv.config(); // Load .env file

import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(clerkMiddleware());

// Connect to MongoDB
await connectDB();

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post('/clerk', clerkWebhooks); // Clerk webhook route
app.use('/api/educator', educatorRouter); // Educator routes

// Export the Express app as a Vercel serverless function
export default app;
