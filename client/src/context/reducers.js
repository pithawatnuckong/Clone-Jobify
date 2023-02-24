import {
	CLEAR_ALERT,
	CLEAR_HANDLER,
	CREATE_JOB_ERROR,
	CREATE_JOB_PENDING,
	CREATE_JOB_SUCCESS,
	GET_ALL_JOBS_PENDING,
	GET_ALL_JOBS_SUCCESS,
	LOGIN_USER_ERROR,
	LOGIN_USER_PENDING,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	ON_CHANGE_HANDLER,
	REGISTER_USER_ERROR,
	REGISTER_USER_PENDING,
	REGISTER_USER_SUCCESS,
	SET_EDIT_JOB_ID,
	SHOW_ALERT,
	TOGGLE_SLIDE_BAR,
	UPDATE_USER_ERROR,
	UPDATE_USER_PENDING,
	UPDATE_USER_SUCCESS,
} from "./constants";
import { initialState } from "./AppContext";

const reducer = (state = initialState, action = {}) => {
	if (action.type === SHOW_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload,
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}
	if (action.type === REGISTER_USER_PENDING) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.userLocation,
			jobLocation: action.payload.userLocation,
			isLoading: false,
			alertType: "success",
			showAlert: true,
			alertText: "User created! Redirecting...",
		};
	}
	if (action.type === REGISTER_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			alertText: action.payload.msg,
			alertType: "danger",
			showAlert: true,
		};
	}
	if (action.type === LOGIN_USER_PENDING) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === LOGIN_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.userLocation,
			jobLocation: action.payload.userLocation,
			isLoading: false,
			alertType: "success",
			showAlert: true,
			alertText: "Login Successfully! Redirecting...",
		};
	}
	if (action.type === LOGIN_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			alertText: action.payload.msg,
			alertType: "danger",
			showAlert: true,
		};
	}
	if (action.type === TOGGLE_SLIDE_BAR) {
		return {
			...state,
			showSlideBar: !state.showSlideBar,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...state,
			user: null,
			token: null,
			userLocation: "",
			jobLocation: "",
		};
	}
	if (action.type === UPDATE_USER_PENDING) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.userLocation,
			alertType: "success",
			alertText: "Update successfully!",
			showAlert: true,
		};
	}

	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertText: action.payload.msg,
			alertType: "danger",
		};
	}

	if (action.type === ON_CHANGE_HANDLER) {
		return { ...state, [action.payload.name]: action.payload.value };
	}

	if (action.type === CLEAR_HANDLER) {
		const defaultState = {
			position: "",
			company: "",
			jobLocation: "",
			isEditing: false,
			editingId: "",
			jobType: "full-time",
			status: "pending",
		};
		return { ...state, ...defaultState };
	}
	if (action.type === CREATE_JOB_PENDING) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === CREATE_JOB_SUCCESS) {
		return {
			...state,
			showAlert: true,
			alertType: "success",
			alertText: "Job created!",
			isLoading: false,
		};
	}

	if (action.type === CREATE_JOB_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
			isLoading: false,
		};
	}

	if (action.type === GET_ALL_JOBS_PENDING) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		};
	}

	if (action.type === GET_ALL_JOBS_SUCCESS) {
		return {
			...state,
			jobs: action.payload.jobs,
			numOfPages: action.payload.numOfPages,
			totalJobs: action.payload.totalJobs,
			isLoading: false,
		};
	}

	if (action.type === SET_EDIT_JOB_ID) {
		const { company, jobLocation, jobType, position, status } =
			state.jobs.find((job) => job._id === action.payload.id);
		return {
			...state,
			isEditing: true,
			editJobId: action.payload.id,
			company,
			jobLocation,
			jobType,
			position,
			status,
		};
	}

	throw new Error(`No action such type ${action.type}`);
};

export default reducer;
