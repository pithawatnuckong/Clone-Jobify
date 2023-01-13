import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppContext } from "../context/AppContext";
import Logo from "./Logo";

import Links from "../container/Links";

const BigSlideBar = () => {
	const { showSlideBar } = useAppContext();

	return (
		<Wrapper>
			<div
				className={`sidebar-container ${
					showSlideBar && "show-sidebar"
				}`}
			>
				<div className="content">
					<header>
						<Logo />
					</header>
					<Links />
				</div>
			</div>
		</Wrapper>
	);
};

export default BigSlideBar;
