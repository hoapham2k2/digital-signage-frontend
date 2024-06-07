import { api } from "@/configs/axiosConfig";
import { Screen } from "@/lib/types";

export const fetchScreens = async () => {
	const { data } = await api.get("/Players");
	return data;
};

export const fetchScreenById = async (id: string): Promise<Screen> => {
	const { data } = await api.get(`/Players/${id}`);
	return data;
};

export const fetchScreensbyGroupIds = async (
	ids: string[]
): Promise<Screen[]> => {
	// players.groups is an array of group ids, for example ["1", "2"]
	// we want to fetch all players that have group id 1 or 2

	const { data: players } = await api.get(`/Players`);

	const filteredScreens = players.filter(
		(screen: Screen) =>
			screen.playerLabels &&
			screen.playerLabels.some((label) =>
				ids.includes(label.labelId.toString())
			)
	);
	return filteredScreens;
};

export const deleteScreen = async (id: string) => {
	const { data } = await api.delete(`/Players/${id}`);
	return data;
};

export const updateScreen = async (
	id: string,
	updatedScreen: Omit<Screen, "id">
) => {
	const { data } = await api.put(`/Players/${id}`, updatedScreen);
	return data;
};
