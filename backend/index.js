import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import { Score } from "./models/scoreModel.js";

const app = express();

// Parse request body
app.use(express.json());

/********************************* ROUTES *************************************/

// Homepage
app.get("/", (req, res) => {
	console.log(req);
	return res.status(234).send("Welcome to the leaderboard!");
});

// Save a new score
app.post("/scores", async (req, res) => {
	try {
		// Ensure required fields are present
		if (!req.body.username || !req.body.score || !req.body.level) {
			return res.status(400).send({
				message: "Not all required fields (username, score, level) were present."
			});
		}

		// Create new score
		const newScore = {
			username: req.body.username,
			score: req.body.score,
			level: req.body.level
		};

		// Create and upload score document
		const scoreDocument = await Score.create(newScore);

		return res.status(201).send(scoreDocument);
	} catch (error) {
		console.log(error);
		res.status(500).send({message: error.message});
	}
});


/******************************* CONNECTION ***********************************/

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
