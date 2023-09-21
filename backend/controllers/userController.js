import asyncWrap from "../utils/asyncWrap.js";
import generateToken from "../utils/generateToken.js";

import {User} from "../models/userModel.js";

// Register new user
// POST /api/users
// Public
const registerUser = asyncWrap(async (req, res, next) => {
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
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			username: user.username
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// Log in user
// POST /api/users/login
// Public
const logInUser = asyncWrap(async (req, res, next) => {
	const {username, password} = req.body;

	const user = await User.findOne({username});

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			username: user.username
		});
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
});

// Log out user
// POST /api/users/logout
// Public
const logOutUser = asyncWrap(async (req, res, next) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0)
	});

	res.status(200).json({ message: "User logged out"});
});

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncWrap(async (req, res, next) => {
	const user = {
		_id: req.user._id,
		username: req.user.username
	};

	return res.status(200).json(user);
});

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncWrap(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (user) {
		if (req.body.password) {
			user.password = req.body.password;
			const updatedUser = await user.save();

			res.status(200).json({
				_id: updatedUser._id,
				username: updatedUser.username
			});
		} else {
			res.status(400);
			throw new Error("Couldn't update profile, request body empty");
		}

	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	registerUser,
	logInUser,
	logOutUser,
	getUserProfile,
	updateUserProfile
};
