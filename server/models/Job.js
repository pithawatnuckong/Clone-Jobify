import mongoose from "mongoose";

const JobScheme = mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please provide company name"],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, "Please provide position"],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ["pending", "declined", "interview"],
			default: "pending",
		},
		jobType: {
			type: String,
			enum: ["full-time", "part-time", "remote", "internship"],
			default: "full-time",
		},
		jobLocation: {
			type: String,
			required: [true, "Please provide job location"],
			maxlength: 100,
			default: "my city",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
	},
	{
		timestamps: true,
		collection: "Job",
	},
);

export default mongoose.model("Job", JobScheme);
