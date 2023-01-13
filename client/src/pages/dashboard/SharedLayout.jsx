import { Outlet } from "react-router-dom";

import Wrapper from "../../assets/wrappers/SharedLayout";

import { BigSlideBar, SmallSlideBar, Navbar } from "../../components/";

const SharedLayout = () => {
	return (
		<Wrapper>
			<main className="dashboard" style={{ border: "1px solid red" }}>
				<SmallSlideBar />
				<BigSlideBar />
				<div>
					<Navbar />
					<div className="dashboard-page">
						<Outlet />
					</div>
				</div>
			</main>
		</Wrapper>
	);
};
export default SharedLayout;
