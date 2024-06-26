import { api } from "@/configs/axiosConfig";

export type Analytics = {
	// {"number_of_screens": 3, "number_of_playlists": 2, "number_of_content_items": 4}
	number_of_screens: number;
	number_of_playlists: number;
	number_of_content_items: number;
};

export const fetchAnalytics = async (): Promise<Analytics> => {
	const { data } = await api.get("/Statistics");
	return data;
};
