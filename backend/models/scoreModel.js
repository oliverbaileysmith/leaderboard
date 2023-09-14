import mongoose from "mongoose";

// Schema for scores
const scoreSchema = new mongoose.Schema(
{
	username: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		required: true
	}
	level: {
		type: String,
		required: true
	}
},

// _id (of type ObjectID) is added by default and is used for timestamps
// This argument adds createdAt and updatedAt timestamps to the schema
{
	timestamps: true
}
);

// Export model for scores to read/write from database
export const scoreModel = mongoose.model("score", scoreSchema);
