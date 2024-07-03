import axios from "axios";
export const api = axios.create({
	baseURL: `http://localhost:5036/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
});
