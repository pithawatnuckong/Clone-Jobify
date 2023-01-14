import {
	CLEAR_ALERT,
	LOGIN_USER_ERROR,
	LOGIN_USER_PENDING,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER_ERROR,
	REGISTER_USER_PENDING,
	REGISTER_USER_SUCCESS,
	SHOW_ALERT,
	TOGGLE_SLIDE_BAR,
	UPDATE_USER_ERROR,
	UPDATE_USER_PENDING,
	UPDATE_USER_SUCCESS,
} from "./constants";
import { initialState } from "./AppContext";

const reducer = (state = initialState, action = {}) => {
	// console.log(action);
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

	throw new Error(`No action such type ${action.type}`);
};

export default reducer;
