import { Link, Outlet } from "react-router-dom";

import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
	return (
    <Wrapper>
			<nav style={{gap: "1rem", display: 'flex'}}>
        <Link to="add-job">add-job</Link>
        <Link to="all-job">all-job</Link>
			</nav>
			<Outlet />
		</Wrapper>
	);
};
export default SharedLayout;
