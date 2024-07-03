import { api } from "@/configs/axiosConfig";
import { Playlist, Schedule } from "@/types/index";

export const fetchPlaylistById = async (id: string): Promise<Playlist> => {
	const { data } = await api.get(`/Playlists/${id}`);
	return data;
};

export const fetchPlaylists = async (userID: string): Promise<Playlist[]> => {
	const { data } = await api.get(`/Playlists?userID=${userID}`);
	return data;
};

export const deletePlaylist = async (id: string): Promise<void> => {
	await api.delete(`/Playlists/${id}`);
};
export const updatePlaylist = async (
	id: number,
	playlist: Playlist
): Promise<void> => {
	await api.put(`/Playlists/${id}`, playlist);
};

export const updatePlaylistLabels = async (id: number, labelIds: number[]) => {
	await api.put(`/Playlists/${id}/labels`, labelIds);
};

export const updatePlaylistSchedules = async (
	playlistId: number,
	schedules: Schedule[]
) => {
	await api.put(`/Playlists/${playlistId}/schedules`, schedules);
};
