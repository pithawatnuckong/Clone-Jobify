import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

import connectDB from "./database/connect.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

//routes
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";

// use to find .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// Request parser to json data
app.use(express.json());

// Setup server with mongodb connection
await connectDB(process.env.MONGODB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port:${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("/api/v1/welcome", (req, res) => {
	res.status(200).json({
		msg: "hello",
	});
});
// Error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
