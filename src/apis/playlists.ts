import { api } from "@/configs/axiosConfig";
import { Playlist } from "@/lib/types";

export const fetchPlaylistById = async (id: string) => {
	const { data } = await api.get(`/playlists/${id}`);
	return data;
};

export const fetchPlaylists = async () => {
	const { data } = await api.get("/playlists");
	return data;
};

export const fetchPlaylistByGroupIds = async (
	ids: string[]
): Promise<Playlist[]> => {
	const { data: playlists } = await api.get("/playlists");

	const filteredPlaylists = playlists.filter((playlist: Playlist) =>
		playlist.groups.some((group) => ids.includes(group))
	);
	return filteredPlaylists;
};
