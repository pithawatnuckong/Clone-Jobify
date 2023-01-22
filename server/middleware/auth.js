import dotenv from "dotenv";
import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
dotenv.config();

const auth = async (req, res, next) => {
	// const userAuth = req.headers.authorization;
	const { authorization: userAuth } = req.headers;

	if (!userAuth || !userAuth.startsWith(process.env.SECRET_HEADER))
		throw new UnAuthenticatedError("Authentication Invalid");

	const token = userAuth.split(" ")[1];

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId, token };
		next();
	} catch (err) {
		throw new UnAuthenticatedError("Authentication Invalid");
	}
};

export default auth;
