import asyncWrap from "../util.js"

import {User} from "../models/userModel.js";

// Register new user
// POST /api/users
// Public
const registerUser = asyncWrap(async (req, res, next) => {
	try {
		const {username, password} = req.body;

		const userExists = await User.findOne({username});

		if (userExists) {
			res.status(400);
			throw new Error("User already exists");
		}

		const user = await User.create({
			username,
			password
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				username: user.username
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	} catch(error) {
		return next(error);
	}
});

// Authorize user
// POST /api/users/auth
// Public
const authUser = asyncWrap(async (req, res, next) => {
	try {
		return res.status(200).json({message: "Auth user" });
	} catch(error) {
		return next(error);
	}
});

// Log out user
// POST /api/users/logout
// Public
const logOutUser = asyncWrap(async (req, res, next) => {
	try {
		return res.status(200).json({message: "Log out user" });
	} catch(error) {
		return next(error);
	}
});

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncWrap(async (req, res, next) => {
	try {
		return res.status(200).json({message: "User profile" });
	} catch(error) {
		return next(error);
	}
});

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncWrap(async (req, res, next) => {
	try {
		return res.status(200).json({message: "Update user profile" });
	} catch(error) {
		return next(error);
	}
});

export {
	registerUser,
	authUser,
	logOutUser,
	getUserProfile,
	updateUserProfile
};
