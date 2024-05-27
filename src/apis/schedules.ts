import { api } from "@/configs/axiosConfig";

export const fetchSchedulesByPlaylistId = async (playlistId: string) => {
	const { data } = await api.get(`/schedules?playlistId=${playlistId}`);
	return data;
};
