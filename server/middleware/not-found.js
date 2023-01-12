import NotFoundError from "../errors/NotFoundError.js";

const notFoundMiddleware = (req, res) => {
	throw new NotFoundError("Routs doesn't exists")
};

export default notFoundMiddleware;
