import axios from "axios";
export const api = axios.create({
	baseURL: `http://localhost:5036/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

api.interceptors.request.use(
	//
	(request) => {
		return request;
	},
	(error) => {
		console.error(
			"Error occurred: ",
			`${new Date().toISOString()} - ${error}\n`
		);
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error(
			"Error occurred:",
			`${new Date().toISOString()} - ${error}\n`
		);
		return Promise.reject(error);
	}
);
