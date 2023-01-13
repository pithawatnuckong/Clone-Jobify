// data
import links from "../utils/links";

// component
import Link from "../components/Link";

const Links = ({toggleSlideBar}) => {
	const linkComponents = links?.map((link) => (
		<Link
			toggleSlideBar={toggleSlideBar}
			key={link.id}
			path={link.path}
			text={link.text}
			icon={link.icon}
		/>
	));

	return <div className="nav-links">{linkComponents}</div>;
};
export default Links;
