import axios from "axios";
import { removeUserFromLocalStorage } from "../context/actions";

const token = localStorage.getItem("token");
// first way
// axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
// export default axios;

// second way
const authFetch = axios.create({
	baseURL: "api/v1",
});

authFetch.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

authFetch.interceptors.response.use(
	(response) => {
		console.log(response);
		return response;
	},
	(error) => {
		console.log(error);
		if (error.response.status === 401) {
			removeUserFromLocalStorage();
			window.location.href = "/";
		}
		return error;
	},
);

// axios.defaults.baseURL = "/api/v1";

axios.interceptors.request.use(
	(config) => {
		config.baseURL = "api/v1";
		return config;
	},
	(error) => {
		console.log(`Axios Error From Request ${error}`);
	},
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(`Axios Error From Response ${error}`);
	},
);

export { authFetch, axios };
