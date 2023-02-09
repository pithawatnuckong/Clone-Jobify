import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";

import { Loading, Job } from "./";

import { useAppContext } from "../context/AppContext";

const JobsContainer = () => {
	const { getAllJobs, jobs, isLoading, page, totalJobs } = useAppContext();
	const jobsComponent = jobs?.map((job) => {
		return <Job key={job._id} {...job} />;
	});

	useEffect(() => {
		getAllJobs();
	}, []);

	if (isLoading) {
		return <Loading center />;
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs found</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length >= 1 && "s"} found
			</h5>
			<div className="jobs">{jobsComponent}</div>
		</Wrapper>
	);
};
export default JobsContainer;
