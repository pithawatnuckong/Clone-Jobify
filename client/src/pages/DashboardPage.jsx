import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Link to='/register'>
				<button style={{cursor: "pointer"}}>Register</button>
			</Link>
		</div>
	);
};

export default DashboardPage;
