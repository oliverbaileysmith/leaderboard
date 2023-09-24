import express from "express";

import {
	getRecentScores,
	getUserScores,
	getLevelScores,
	newScore,
	updateScore,
	deleteScore
} from "../controllers/scoreController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecentScores);
router.get("/user/:username", getUserScores);
router.get("/level/:level", getLevelScores);
router.post("/", protect, newScore);
router.put("/:id", updateScore);
router.delete("/:id", deleteScore);

export default router;
