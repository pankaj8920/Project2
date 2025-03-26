import dotenv from "dotenv";
dotenv.config(); // Load .env file

import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Debugging: Check if MONGODB_URI is loaded
// console.log("Loaded MongoDB URI:", process.env.MONGODB_URI);

// Connect to database
await connectDB();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Working"));

app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

