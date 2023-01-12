import Main from "../assets/images/main.svg";
import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/LandingPage";

import {Logo} from '../components/index'

const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						job <span>Tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Sit, quae ratione, officiis odit et eveniet
						doloribus placeat cupiditate aliquam ut nulla at quos
						atque, ea consectetur magnam facilis voluptatibus animi!
					</p>
					<Link to='/register' className="btn btn-hero">Login/Register</Link>
				</div>
				<img src={Main} alt="main" className="img main-img" />
			</div>
		</Wrapper>
	);
};
export default LandingPage;
