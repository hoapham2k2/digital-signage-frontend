import { api } from "@/configs/axiosConfig";
import { Screen } from "@/lib/types";

export const fetchScreens = async () => {
	const { data } = await api.get("/screens");
	return data;
};

export const fetchScreenById = async (id: string): Promise<Screen> => {
	const { data } = await api.get(`/screens/${id}`);
	return data;
};

export const fetchScreensbyGroupIds = async (
	ids: string[]
): Promise<Screen[]> => {
	// screens.groups is an array of group ids, for example ["1", "2"]
	// we want to fetch all screens that have group id 1 or 2

	const { data: screens } = await api.get(`/screens`);

	const filteredScreens = screens.filter((screen: Screen) =>
		screen.groups.some((group) => ids.includes(group))
	);
	return filteredScreens;
};

export const deleteScreen = async (id: string) => {
	const { data } = await api.delete(`/screens/${id}`);
	return data;
};

export const updateScreen = async (
	id: string,
	updatedScreen: Omit<Screen, "id">
) => {
	const { data } = await api.put(`/screens/${id}`, updatedScreen);
	return data;
};
