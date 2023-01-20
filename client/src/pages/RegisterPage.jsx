import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterPage";

// components
import { Logo, FormInput, Alert } from "../components/index";
import { useAppContext } from "../context/AppContext";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const RegisterPage = () => {
	const navigate = useNavigate();
	const {
		user,
		showAlert,
		displayAlert,
		clearAlert,
		registerUser,
		isLoading,
		loginUser,
	} = useAppContext();
	const [state, setState] = useState(initialState);
	console.log(isLoading)

	function onChangeHandler(evt) {
		setState({ ...state, [evt.target.name]: evt.target.value });
		if (showAlert) clearAlert();
	}

	function toggleMember() {
		setState({ ...state, isMember: !state.isMember, name: "" });
	}

	function onSubmit(evt) {
		evt.preventDefault();
		let { name, email, password, isMember } = state;
		if (!email || !password || (!name && !isMember)) {
			displayAlert("Please provide the values");
			return;
		}
		if (isMember) {
			loginUser({ email, password });
		} else {
			registerUser({ email, password, name });
		}
		setState({
			...state,
			name: "",
			email: "",
			password: "",
		});
	}

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{state.isMember ? "Login" : "Register"}</h3>
				{showAlert && <Alert />}
				{state.isMember || (
					<FormInput
						type="text"
						name="name"
						value={state.name}
						onChange={onChangeHandler}
					/>
				)}
				<FormInput
					type="email"
					name="email"
					value={state.email}
					isDisable={Boolean(user)}
					onChange={onChangeHandler}
				/>
				<FormInput
					type="password"
					name="password"
					value={state.password}
					isDisable={Boolean(user)}
					onChange={onChangeHandler}
				/>
				<button
					type="summit"
					className="btn btn-block"
					disabled={isLoading || Boolean(user)}
				>
					{state.isMember ? "login" : "register"}
				</button>
				<p>
					{state.isMember
						? "Not a member yet?"
						: "Already a member ?"}
					<button
						type="button"
						className="member-btn"
						onClick={toggleMember}
						disabled={isLoading || Boolean(user)}
					>
						{state.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default RegisterPage;
