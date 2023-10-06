import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema for users
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
},

// _id (of type ObjectID) is added by default and is used for timestamps
// This argument adds createdAt and updatedAt timestamps to the schema
{
	timestamps: true
});

userSchema.pre("save", async function(next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Export model for scores to read/write from database
export const User = mongoose.model("user", userSchema);
