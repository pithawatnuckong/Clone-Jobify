import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide the name"],
			minlength: 3,
			maxlength: 20,
			trim: true,
		},
		lastName: {
			type: String,
			maxlength: 20,
			trim: true,
			default: "Last name",
		},
		email: {
			type: String,
			required: [true, "Please provide the email"],
			validate: {
				validator: validator.isEmail,
				message: "Please provide the valid email",
			},
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide the password"],
			minlength: 6,
			select: false,
		},
		location: {
			type: String,
			default: "User location",
			trim: true,
		},
	},
	{ collection: "User" },
);

UserSchema.pre("save", async function () {
	// salt
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	//looking at what we are going to update from the root
	console.log(this.modifiedPaths());
	console.log(this.isModified("name"));
});

UserSchema.methods.createJWT = async function () {
	// (payload type:Object, secret type:String, options type:Object)
	const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

UserSchema.methods.checkPassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
