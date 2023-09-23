import { Score } from "../models/scoreModel.js";

// Get all scores, recent first
// GET /api/scores/
const getRecentScores = async (req, res, next) => {
	try {
		// Get all documents sorted by time updated, descending
		const scoresDocuments = await Score.find({}).sort({updatedAt: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		return next(error);
	}
};

// Get all scores for a user, highest first
// GET /api/scores/user/:username
const getUserScores = async (req, res, next) => {
	try {
		// Get username from request
		const { username } = req.params;

		// Find scores for that user
		const scoresDocuments = await Score.find({username}).sort({updatedAt: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		return next(error);
	}
};

// Get all scores for a level, highest first
// GET /api/scores/level/:level
const getLevelScores = async (req, res, next) => {
	try {
		// Get level from request
		const { level } = req.params;

		// Find scores for that level
		const scoresDocuments = await Score.find({level}).sort({score: -1});

		return res.status(200).json({
			count: scoresDocuments.length,
			data: scoresDocuments
		});
	} catch (error) {
		return next(error);
	}
};

// Save a new score
// POST /api/scores/
const newScore = async (req, res, next) => {
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
		return next(error);
	}
};

// Update a score
// PUT /api/scores/:id
const updateScore = async (req, res, next) => {
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
		return next(error);
	}
};

// Delete a score
// DELETE /api/scores/:id
const deleteScore = async (req, res, next) => {
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
		return next(error);
	}
};

export {
	getRecentScores,
	getUserScores,
	getLevelScores,
	newScore,
	updateScore,
	deleteScore
};
