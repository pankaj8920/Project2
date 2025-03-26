import dotenv from "dotenv";
dotenv.config(); // Load .env file

import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Connect to database
await connectDB();

// Middlewares
app.use(cors());
app.use(clerkMiddleware())

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator',express.json(),educatorRouter)

// Port (Not needed in Vercel since it's serverless)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}


