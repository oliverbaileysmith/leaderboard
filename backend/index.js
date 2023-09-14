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

// Get all scores, recent first
app.get("/scores", async (req, res) => {
	try {
		// Get all documents sorted by time created, descending
		const scoresDocuments = await Score.find({}).sort({createdAt: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({message: error.message});
	}
});

// Get all scores for a user, highest first
app.get("/scores/user/:username", async (req, res) => {
	try {
		// Get username from request
		const { username } = req.params;

		// Find scores for that user
		const scoresDocuments = await Score.find({username: username}).sort({score: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({message: error.message});
	}
});

// Get all scores for a level, highest first
app.get("/scores/level/:level", async (req, res) => {
	try {
		// Get level from request
		const { level } = req.params;

		// Find scores for that level
		const scoresDocuments = await Score.find({level: level}).sort({score: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({message: error.message});
	}
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

// Update a score
app.put("/scores/:id", async (req, res) => {
	try {
		// Ensure required fields are present
		if (!req.body.username || !req.body.score || !req.body.level) {
			return res.status(400).send({
				message: "Not all required fields (username, score, level) were present."
			});
		}

		// Get id from request
		const {id} = req.params;

		// Find and update score by id
		const scoreDocument = await Score.findByIdAndUpdate(id, req.body);

		if (!scoreDocument) {
			return res.status(404).json({message: "Score not found."});
		}

		return res.status(200).send({message: "Updated score."});
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
