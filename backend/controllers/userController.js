// Authorize user
// POST /api/users/auth
// Public
const authUser = async (req, res, next) => {
	try {
		return res.status(200).json({message: "Auth user" });
	} catch(error) {
		return next(error);
	}
}

// Register new user
// POST /api/users
// Public
const registerUser = async (req, res, next) => {
	try {
		return res.status(200).json({message: "Register user" });
	} catch(error) {
		return next(error);
	}
}

// Log out user
// POST /api/users/logout
// Public
const logOutUser = async (req, res, next) => {
	try {
		return res.status(200).json({message: "Log out user" });
	} catch(error) {
		return next(error);
	}
}

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = async (req, res, next) => {
	try {
		return res.status(200).json({message: "User profile" });
	} catch(error) {
		return next(error);
	}
}

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = async (req, res, next) => {
	try {
		return res.status(200).json({message: "Update user profile" });
	} catch(error) {
		return next(error);
	}
}

export {
	authUser,
	registerUser,
	logOutUser,
	getUserProfile,
	updateUserProfile
};
