import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

import scoreRoutes from "./routes/scoreRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Parse request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Parse cookies
app.use(cookieParser());

// Handle CORS
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://leaderboard-frontend-zeta.vercel.app/"
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
		credentials: true
	})
);

// Routes
app.use("/api/scores", scoreRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
	return res.status(200).send("Leaderboard!");
});

// Custom error handling
app.use(notFound);
app.use(errorHandler);

console.log(`Environment: ${process.env.NODE_ENV}`);

// Connect to MongoDB and start node server if successful
mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("App connected to MongoDB.");

		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error);
	});

export default app;
