import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import scoresRoute from "./routes/scoresRoutes.js";

const app = express();

// Parse request body
app.use(express.json());

app.get("/", (req, res) => {
	return res.status(234).send("Welcome to the leaderboard!");
});

// Use routes from "/routes/scoresRoutes.js" for /scores routes
app.use("/scores", scoresRoute);

// Connect to MongoDB and start node server if successful
mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("App connected to MongoDB.");

		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
