import { api } from "@/configs/axiosConfig";

export const fetchContents = async () => {
	const { data } = await api.get("/contents");
	return data;
};

export const fetchContentsByPlaylistIds = async (ids: string[]) => {
	const { data } = await api.get(
		`/contents?${ids.map((id) => `playlists=${id}`).join("&")}`
	);
	return data;
};
