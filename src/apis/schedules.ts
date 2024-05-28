import { api } from "@/configs/axiosConfig";
import { Schedule } from "@/lib/types";

export const fetchSchedulesByPlaylistId = async (
	playlistId: string
): Promise<Schedule[]> => {
	const { data } = await api.get(`/schedules?playlistId=${playlistId}`);
	return data;
};

export const addSchedule = async (
	id: string,
	schedule: Omit<Schedule, "id">
) => {
	await api.post(`/schedules/${id}`, schedule);
};

export const deleteSchedule = async (id: string): Promise<void> => {
	await api.delete(`/schedules/${id}`);
};
