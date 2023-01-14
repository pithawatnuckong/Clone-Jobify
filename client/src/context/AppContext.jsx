import { createContext, useReducer, useContext } from "react";
import {
	clearAlertAction,
	showAlertAction,
	registerUserAction,
	loginUserAction,
	toggleSlideBarAction,
	logoutUserAction,
	updateUserAction,
} from "./actions";

import reducer from "./reducers";

// Get data from local storage
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user || null,
	token: token || null,
	userLocation: location,
	jobLocation: "",
	showSlideBar: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const displayAlert = (text) => {
		dispatch(showAlertAction(text));
	};

	const clearAlert = () => {
		dispatch(clearAlertAction());
	};

	const registerUser = (currentUser) => {
		registerUserAction(currentUser, dispatch);
	};

	const loginUser = (currentUser) => {
		loginUserAction(currentUser, dispatch);
		clearAlertTimeout();
	};

	const toggleSlideBar = () => {
		dispatch(toggleSlideBarAction());
	};

	const logoutUser = () => {
		logoutUserAction(dispatch);
	};

	const updateUser = (currentUser) => {
		updateUserAction(dispatch, currentUser, state.token);
		clearAlertTimeout();
	};

	// util function
	function clearAlertTimeout() {
		setTimeout(() => {
			clearAlert();
		}, 1500);
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				registerUser,
				loginUser,
				toggleSlideBar,
				logoutUser,
				updateUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
