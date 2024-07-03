import { api } from "@/configs/axiosConfig";
import { Screen } from "@/types/index";

export const fetchScreens = async (userId: string) => {
	const { data } = await api.get(`Players?userID=${userId}`);
	return data;
};

export const fetchScreenById = async (id: string): Promise<Screen> => {
	const { data } = await api.get(`/Players/${id}`);
	return data;
};

export const fetchScreensbyGroupIds = async (
	ids: string[]
): Promise<Screen[]> => {
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


export const createVirtualScreen = async (name: string) => {
	const { data } = await api.post("/Players/virtual", {
		name,
	});
	return data;
};

export const createHardwareScreen = async (name: string, otpCode: string) => {
	const { data } = await api.post("/Players/hardware?otpCode=" + otpCode, {
		name,
	});
	return data;
};
