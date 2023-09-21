import express from "express";

import {
	getRecentScores,
	getUserScores,
	getLevelScores,
	newScore,
	updateScore,
	deleteScore
} from "../controllers/scoreController.js";
import { Score } from "../models/scoreModel.js";

const router = express.Router();

router.get("/", getRecentScores);
router.get("/user/:username", getUserScores);
router.get("/level/:level", getLevelScores);
router.post("/", newScore);
router.put("/:id", updateScore);
router.delete("/:id", deleteScore);

export default router;
