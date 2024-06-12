import { api } from "@/configs/axiosConfig";
import { Playlist } from "@/types/index";

export const fetchPlaylistById = async (id: string): Promise<Playlist> => {
	const { data } = await api.get(`/Playlists/${id}`);
	return data;
};

export const fetchPlaylists = async (): Promise<Playlist[]> => {
	const { data } = await api.get("/Playlists");
	return data;
};

export const updatePlaylist = async (
	id: string,
	playlist: Omit<Playlist, "id">
) => {
	await api.put(`/Playlists/${id}`, playlist);
};

export const deletePlaylist = async (id: string): Promise<void> => {
	await api.delete(`/Playlists/${id}`);
};

export const updatePlaylistLabels = async (id: number, labelIds: number[]) => {
	await api.put(`/Playlists/${id}/labels`, labelIds);
};
