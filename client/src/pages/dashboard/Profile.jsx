import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/AppContext";

import FormInput from "../../components/FormInput";

import Alert from "../../components/Alert";

const user = JSON.parse(localStorage.getItem("user"));


const initialState = {
	name: user?.name || "",
	lastName: user?.lastName || "",
	email: user?.email || "",
	location: user?.location || "",
};

const Profile = () => {
	const { isLoading, showAlert, displayAlert, clearAlert, updateUser } =
		useAppContext();
	const [state, setState] = useState(initialState);

	const onChangeHandler = (evt) => {
	setState({ ...state, [evt.target.name]: evt.target.value });
		if (showAlert) clearAlert();
	};

	const submitHandler = async (evt) => {
		evt.preventDefault();
		if (!state.name || !state.email || !state.lastName || !state.location) {
			displayAlert("Please provide all values");
		}
		await updateUser(state);
	};

	return (
		<Wrapper>
			<form className="form" onSubmit={submitHandler}>
				<h3>profile</h3>
				{showAlert && <Alert />}
				<div className="form-center">
					<FormInput
						type="text"
						name="name"
						value={state.name}
						onChange={onChangeHandler}
						isDisable={isLoading}
					/>
					<FormInput
						type="text"
						name="lastName"
						value={state.lastName}
						labelText="last name"
						onChange={onChangeHandler}
						isDisable={isLoading}
					/>
					<FormInput
						type="email"
						name="email"
						value={state.email}
						onChange={onChangeHandler}
						isDisable={isLoading}
					/>
					<FormInput
						type="text"
						name="location"
						value={state.location}
						onChange={onChangeHandler}
						isDisable={isLoading}
					/>
					<button
						className="btn btn-block"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Please wait..." : "Save change"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default Profile;
