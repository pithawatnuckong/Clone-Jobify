import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
	const Error = {
		statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "There was an error",
	};
	if (err.name === "ValidationError") {
		//provide invalid email
		Error.statusCodes = StatusCodes.BAD_REQUEST;
		Error.msg = Object.values(err.errors).map((item) => item.message);
	} else if (err.code === 11000 && err.code) {
		//field in mongodb required unique value
		Error.statusCodes = StatusCodes.BAD_REQUEST;
		Error.msg = `${Object.keys(err.keyValue)} field have to be unique`;
	}
	// res.status(Error.statusCodes).json({ msg: err });
	res.status(Error.statusCodes).json({msg: Error.msg})
};

export default errorHandlerMiddleware;
