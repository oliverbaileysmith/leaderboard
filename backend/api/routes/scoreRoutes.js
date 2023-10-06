import express from "express";

import {
	getRecentScores,
	getUserScores,
	getLevelScores,
	getScoreById,
	newScore,
	updateScore,
	deleteScore
} from "../controllers/scoreController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecentScores);
router.get("/user/:username", getUserScores);
router.get("/level/:level", getLevelScores);
router.get("/:id", getScoreById);
router.post("/", protect, newScore);
router.put("/:id", protect, updateScore);
router.delete("/:id", protect, deleteScore);

export default router;
