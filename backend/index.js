import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Parse request body
app.use(express.json());

// Handle CORS
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"]
	})
);

// Use routes from "/routes/scoreRoutes.js" for /scores routes
app.use("/api/scores", scoreRoutes);

// Custom error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start node server if successful
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("App connected to MongoDB.");

		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error);
	});
