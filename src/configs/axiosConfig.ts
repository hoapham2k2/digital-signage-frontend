import axios, { InternalAxiosRequestConfig } from "axios";
export const api = axios.create({
	baseURL: `http://localhost:5036/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
});

// api.interceptors.request.use(
// 	// Config handler
// 	(config: InternalAxiosRequestConfig<any>) => {
// 		const log = `Axios request at ${new Date().toISOString()} with config: ${JSON.stringify(
// 			config,
// 			null,
// 			1
// 		)}`;
// 		console.log(log);
// 		return config;
// 	},
// 	(error: any) => Promise.reject(error)
// );

// api.interceptors.response.use(
// 	// Response handler
// 	(response) => {
// 		const log = `Axios response at ${new Date().toISOString()} with response: ${JSON.stringify(
// 			response,
// 			null,
// 			2
// 		)}`;
// 		console.log(log);
// 		return response;
// 	},
// 	// Error handler
// 	(error) => {
// 		const log = `Axios error at ${new Date().toISOString()} with error: ${JSON.stringify(
// 			error,
// 			null,
// 			2
// 		)}`;
// 		console.error(log);
// 		return Promise.reject(error);
// 	}
// );

// api.interceptors.response.use();
