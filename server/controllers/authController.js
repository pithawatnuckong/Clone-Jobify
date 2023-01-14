import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
	const { name, password, email } = req.body;

	if (!name || !password || !email) {
		throw new BadRequestError("Please provide all values");
	}

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) throw new BadRequestError("Email already in used");

	const user = await User.create({ name, password, email });
	const token = await user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.CREATED).json({
		user,
		token,
		userLocation: user.location,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		throw new BadRequestError("Please provide all values");

	const user = await User.findOne({ email }).select("+password");

	if (!user) throw new UnAuthenticatedError("Your email doesn't exists");

	const isPwdMatch = await user.checkPassword(password);

	if (!isPwdMatch)
		throw new UnAuthenticatedError("Your password is incorrect");

	const token = await user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.OK).json({
		user,
		token,
		userLocation: user.location,
	});
};

const updateUser = async (req, res) => {
	console.log(req.user)
	res.send("updateUser");
};

export { register, login, updateUser };
