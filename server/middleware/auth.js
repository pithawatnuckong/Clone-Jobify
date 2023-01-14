import dotenv from "dotenv";
import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
dotenv.config();

const auth = async (req, res, next) => {
	const userAuth = req.headers.authorization;

	if (!userAuth || !userAuth.startsWith(process.env.SECRET_HEADER))
		throw new UnAuthenticatedError("Authentication Invalid");

	const token = userAuth.split(" ")[1];

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(userId);

		if (!user) {
			throw new UnAuthenticatedError("Authentication Invalid");
		}

		req.user = { ...user._doc };
		next();
	} catch (err) {
		throw new UnAuthenticatedError("Authentication Invalid");
	}
};

export default auth;
