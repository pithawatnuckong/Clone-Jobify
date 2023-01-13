import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";

import { useAppContext } from "../context/AppContext";
import Links from "../container/Links";
import Logo from "./Logo";

const SmallSlideBar = () => {
	const { showSlideBar, toggleSlideBar } = useAppContext();

	return (
		<Wrapper>
			<div
				className={`sidebar-container ${
					showSlideBar && "show-sidebar"
				}`}
			>
				<div className="content">
					<button
						type="button"
						className="close-btn"
						onClick={toggleSlideBar}
					>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<Links toggleSlideBar={toggleSlideBar} />
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSlideBar;
