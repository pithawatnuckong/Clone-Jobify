import {
	CLEAR_ALERT,
	REGISTER_USER_ERROR,
	REGISTER_USER_PENDING,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOGIN_USER_PENDING,
	LOGIN_USER_SUCCESS,
	SHOW_ALERT,
	TOGGLE_SLIDE_BAR,
	LOGOUT_USER,
	UPDATE_USER_ERROR,
	UPDATE_USER_PENDING,
	UPDATE_USER_SUCCESS,
} from "./constants";

import { authFetch, axios } from "../utils/fetch";

export const showAlertAction = (text) => ({
	type: SHOW_ALERT,
	payload: text,
});

export const clearAlertAction = () => ({
	type: CLEAR_ALERT,
});

export const registerUserAction = async (currentUser, dispatch) => {
	dispatch({
		type: REGISTER_USER_PENDING,
	});
	try {
		const response = await axios.post("/auth/register", currentUser);
		const { user, token, userLocation } = await response.data;
		if (user.msg) {
			throw new Error(user.msg[0]);
		}
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: {
				user,
				token,
				userLocation,
			},
		});
		addUserToLocalStorage({ user, token, userLocation });
	} catch (error) {
		dispatch({
			type: REGISTER_USER_ERROR,
			payload: {
				msg: error.response.data.msg,
			},
		});
	}
};

export const loginUserAction = async (currentUser, dispatch) => {
	dispatch({
		type: LOGIN_USER_PENDING,
	});
	try {
		const { user, token, userLocation } = await axios
			.post("/auth/login", currentUser)
			.then((res) => res.data);
		dispatch({
			type: LOGIN_USER_SUCCESS,
			payload: {
				user,
				token,
				userLocation,
			},
		});
		addUserToLocalStorage({ user, token, userLocation });
	} catch (error) {
		dispatch({
			type: LOGIN_USER_ERROR,
			payload: {
				msg: error.response.data.msg,
			},
		});
	}
};

export const toggleSlideBarAction = () => ({
	type: TOGGLE_SLIDE_BAR,
});

export const logoutUserAction = (dispatch) => {
	dispatch({
		type: LOGOUT_USER,
	});
	removeUserFromLocalStorage();
};

export const updateUserAction = async (dispatch, currentUser) => {
	dispatch({
		type: UPDATE_USER_PENDING,
	});
	try {
		const response = await authFetch.patch("/auth/updateUser", currentUser);
		const { user, token, userLocation } = await response.data;
		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: {
				user,
				token,
				userLocation,
			},
		});
		addUserToLocalStorage({ user, token, userLocation });
	} catch (error) {
		dispatch({
			type: UPDATE_USER_ERROR,
			payload: {
				msg: error.response.data.msg,
			},
		});
	}
};

// add-on functional
function addUserToLocalStorage({ user, token, userLocation }) {
	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("token", token);
	localStorage.setItem("location", userLocation);
}

function removeUserFromLocalStorage() {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
	localStorage.removeItem("location");
}
