import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/BadRequestError.js";
import Job from "../models/Job.js";

const createJob = async (req, res) => {
	const { position, company, jobLocation } = req.body;
	if (!position || !company || !jobLocation)
		throw new BadRequestError("Please provide all values");
	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);

	res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = (req, res) => {
	res.status(200).send("getAllJobs");
};

const showStats = (req, res) => {
	res.status(200).send("showStats");
};

const deleteJob = (req, res) => {
	res.status(200).send(`Delete job ${req.params.id}`);
};

const updateJob = (req, res) => {
	res.status(200).send(`Update job ${req.params.id}`);
};

export { createJob, getAllJobs, showStats, deleteJob, updateJob };
