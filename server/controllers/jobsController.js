import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";
import { checkPermission } from "../utils/controller.js";

const createJob = async (req, res) => {
	const { position, company, jobLocation } = req.body;

	if (!position || !company || !jobLocation)
		throw new BadRequestError("Please provide all values");

	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);

	res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId });

	res.status(StatusCodes.OK).json({
		jobs,
		totalJobs: jobs.length,
		numberOfPages: 1,
	});
};

const showStats = (req, res) => {
	res.status(StatusCodes.OK).send("showStats");
};

const deleteJob = async (req, res) => {
	const { id: jobId } = req.params;

	const job = await Job.findOne({ _id: jobId });

	if (!job) throw new NotFoundError(`Not found job id: ${jobId}`);

	checkPermission(req.user, job);
	// interface method
	await job.remove();

	res.status(StatusCodes.OK).send(
		`Delete job ${req.params.id} is successfully`,
	);
};

const updateJob = async (req, res) => {
	const { id: jobId } = req.params;
	const { jobLocation, company } = req.body;

	if (!jobLocation || !company)
		throw new BadRequestError("Please provide all values");

	const job = await Job.findOne({ _id: jobId });

	if (!job) throw new NotFoundError(`Not found job id: ${jobId}`);

	checkPermission(req.user, job);

	// findOneAnd* doesn't trigger the mongoose hook
	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		// new = tell the mongoose to return new model
		new: true,
		// tell the mongoose to use dto or validator
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedJob });
};

export { createJob, getAllJobs, showStats, deleteJob, updateJob };
