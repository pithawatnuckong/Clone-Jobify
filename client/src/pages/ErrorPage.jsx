import {Link} from 'react-router-dom'

import Wrapper from "../assets/wrappers/ErrorPage";
import { Error } from "../components";

const ErrorPage = () => {
	return (
		<Wrapper className="full-page">
			<div>
				<Error />
				<h3>Ohh! Page not found</h3>
				<p>We can't seem to find the page you're looking for</p>
				<Link to="/">Back Home</Link>
			</div>
		</Wrapper>
	);
};

export default ErrorPage;
