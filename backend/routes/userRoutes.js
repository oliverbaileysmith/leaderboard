import express from "express";

import {
	registerUser,
	authUser,
	logOutUser,
	getUserProfile,
	updateUserProfile
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;
