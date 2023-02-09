import moment from "moment";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { JobInfo } from "./";

const Job = ({
	_id,
	position,
	status,
	jobType,
	jobLocation,
	company,
	createdAt,
}) => {
	const { setDeleteJobId, setEditJobId } = useAppContext();
	const date = moment(createdAt).format("MMM Do YYYY");
	return (
		<Wrapper>
			<header>
				<div className="main-icon">{company.charAt(0)}</div>
				<div className="info">
					<h5>{jobType}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				{/* wait for content like icon and */}
				<footer>
					<div className="actions">
						<Link
							to="/add-job"
							onClick={() => setEditJobId(_id)}
							className="btn edit-btn"
						>
							Edit
						</Link>
						<button
							onClick={() => setDeleteJobId(_id)}
							className="btn delete-btn"
						>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};
export default Job;
