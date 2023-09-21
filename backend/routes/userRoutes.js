import express from "express";

import {
	registerUser,
	logInUser,
	logOutUser,
	getUserProfile,
	updateUserProfile
} from "../controllers/userController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
