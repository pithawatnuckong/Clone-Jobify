import { createContext, useReducer, useContext } from "react";
import {
	clearAlertAction,
	showAlertAction,
	registerUserAction,
	loginUserAction,
	toggleSlideBarAction,
	logoutUserAction,
	updateUserAction,
	handleChangeAction,
	clearHandlerAction,
	createJobAction,
	getAllJobsAction
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
	isEditing: false,
	editingId: "",
	company: "",
	position: "",
	status: "pending",
	jobType: "full-time",
	statusOptions: ["pending", "declined", "interview"],
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobs: [],
	totalJobs: 0,
	numOfPages: 0
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

	const registerUser = async (currentUser) => {
		await registerUserAction(currentUser, dispatch);
		clearAlertTimeout();
	};

	const loginUser = async (currentUser) => {
		await loginUserAction(currentUser, dispatch);
		clearAlertTimeout();
	};

	const toggleSlideBar = () => {
		dispatch(toggleSlideBarAction());
	};

	const logoutUser = () => {
		logoutUserAction(dispatch);
	};

	const updateUser = async (currentUser) => {
		await updateUserAction(dispatch, currentUser, state.token);
		clearAlertTimeout();
	};

	const handleChange = async ({ name, value }) => {
		handleChangeAction(dispatch, { name, value });
	};

	const clearHandler = async () => {
		dispatch(clearHandlerAction());
	};

	const createJob = async (currentForm) => {
		await createJobAction(dispatch, currentForm);
		clearHandler();
		clearAlertTimeout();
	};

	const getAllJobs = async () => {
		await getAllJobsAction(dispatch);
	}

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
				handleChange,
				clearHandler,
				createJob,
				getAllJobs,
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
