import axios from "axios";

const token = localStorage.getItem("token");

// first way
// axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
// export default axios;

// second way
const authFetch = axios.create({
	baseURL: "api/v1",
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

axios.defaults.baseURL = "/api/v1";

export { authFetch, axios };
