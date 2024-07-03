import axios from "axios";
export const api = axios.create({
	// baseURL: `http://localhost:5036/api/v1`,
	baseURL: `${
		process.env.NODE_ENV === "development"
			? "http://localhost:5036"
			: "https://ds-cms-backend.onrender.com" // Change this to your backend URL
	}/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
});
