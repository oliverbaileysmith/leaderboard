import asyncWrap from "../utils/asyncWrap.js";

import { Score } from "../models/scoreModel.js";

// Get all scores, recent first
// GET /api/scores/
// Public
const getRecentScores = asyncWrap(async (req, res, next) => {
	// Get all documents sorted by time updated, descending
	const scoresDocuments = await Score.find({}).sort({updatedAt: -1});

	res.status(200).json({
		count: scoresDocuments.length,
		data: scoresDocuments
	});
});

// Get all scores for a user, highest first
// GET /api/scores/user/:username
// Public
const getUserScores = asyncWrap(async (req, res, next) => {
	// Get username from request
	const { username } = req.params;

	// Find scores for that user
	const scoresDocuments = await Score.find({username}).sort({updatedAt: -1});

	res.status(200).json({
		count: scoresDocuments.length,
		data: scoresDocuments
	});
});

// Get all scores for a level, highest first
// GET /api/scores/level/:level
// Public
const getLevelScores = asyncWrap(async (req, res, next) => {
	// Get level from request
	const { level } = req.params;

	// Find scores for that level
	const scoresDocuments = await Score.find({level}).sort({score: -1});

	res.status(200).json({
		count: scoresDocuments.length,
		data: scoresDocuments
	});
});

// Get an individual score by id
// GET /api/scores/:id
// Public
const getScoreById = asyncWrap(async (req, res, next) => {
	// Get level from request
	const { id } = req.params;
	console.log(id);

	// Find scores for that level
	const scoreDocument = await Score.findById(id);

	res.status(200).json({
		count: 1,
		data: scoreDocument
	});
});

// Save a new score
// POST /api/scores/
// Private
const newScore = asyncWrap(async (req, res, next) => {
	// Ensure required fields are present
	if (!req.body.username || !req.body.score || !req.body.level) {
		res.status(400);
		throw new Error("Not all required fields (username, score, level) were present.");
	}

	// Create new score
	const newScore = {
		username: req.body.username,
		score: req.body.score,
		level: req.body.level
	};

	// Create and upload score document
	const scoreDocument = await Score.create(newScore);

	res.status(201).send(scoreDocument);
});

// Update a score
// PUT /api/scores/:id
// Private (or admin)
const updateScore = asyncWrap(async (req, res, next) => {
	// Ensure required fields are present
	if (!req.body.username || !req.body.score || !req.body.level) {
		res.status(400);
		throw new Error("Not all required fields (username, score, level) were present.");
	}

	// Get id from request
	const {id} = req.params;

	// Find and update score by id
	const scoreDocument = await Score.findByIdAndUpdate(id, req.body);

	if (!scoreDocument) {
		res.status(404);
		throw new Error("Requested score not found.");
	}

	return res.status(200).send({message: "Updated score."});
});

// Delete a score
// DELETE /api/scores/:id
// Private (or admin)
const deleteScore = asyncWrap(async (req, res, next) => {
	// Get id from request
	const { id } = req.params;

	// Find and delete score by id
	const scoreDocument = await Score.findByIdAndDelete(id);

	if (!scoreDocument) {
		return res.status(404);
		throw new Error("Requested score not found.");
	}

	return res.status(200).send({message: "Deleted score."});
});

export {
	getRecentScores,
	getUserScores,
	getLevelScores,
	getScoreById,
	newScore,
	updateScore,
	deleteScore
};
