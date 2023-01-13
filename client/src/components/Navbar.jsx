import { useState } from "react";

import Wrapper from "../assets/wrappers/Navbar";

import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";

import { useAppContext } from "../context/AppContext";

const Navbar = () => {
	const { toggleSlideBar, logoutUser, user } = useAppContext();

	const [showDropdown, setShowDropdown] = useState(false);

	function toggleDropdown() {
		setShowDropdown(!showDropdown);
	}

	return (
		<Wrapper>
			<div className="nav-center">
				<button
					type="button"
					className="toggle-btn"
					onClick={toggleSlideBar}
				>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">Dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={toggleDropdown}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div
						className={
							showDropdown ? "dropdown show-dropdown" : "dropdown"
						}
					>
						<button
							className="dropdown-btn"
							type="button"
							onClick={logoutUser}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
