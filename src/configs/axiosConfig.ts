import axios from "axios";
export const api = axios.create({
	// baseURL: `http://localhost:5036/api/v1`,
	baseURL: `${
		process.env.NODE_ENV === "development"
			? "http://localhost:5036"
			: "http://103.72.98.70"
	}/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
});
