import express from "express";
import { Score } from "../models/scoreModel.js";

const router = express.Router();

// Get all scores, recent first
router.get("/", async (req, res) => {
	try {
		// Get all documents sorted by time updated, descending
		const scoresDocuments = await Score.find({}).sort({updatedAt: -1});

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
router.get("/user/:username", async (req, res) => {
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
router.get("/level/:level", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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

// Delete a score
router.delete("/:id", async (req, res) => {
	try {
		// Get id from request
		const { id } = req.params;

		// Find and delete score by id
		const scoreDocument = await Score.findByIdAndDelete(id);

		if (!scoreDocument) {
			return res.status(404).json({message: "Score not found."});
		}

		return res.status(200).send({message: "Deleted score."});
	} catch (error) {
		console.log(error);
		res.status(500).send({message: error.message});
	}
});

export default router;
