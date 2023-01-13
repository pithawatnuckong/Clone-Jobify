import { NavLink } from "react-router-dom";

const Link = ({ path, text, icon, toggleSlideBar }) => {
	return (
		<NavLink
			end
			to={path}
			onClick={toggleSlideBar}
			className={(element) =>
				element.isActive ? "nav-link active" : "nav-link"
			}
		>
			<span className="icon">{icon}</span>
			{text}
		</NavLink>
	);
};

export default Link;
