import { api } from "@/configs/axiosConfig";

export const fetchContents = async () => {
	const { data } = await api.get("/ContentItems");
	return data;
};

export const fetchContentById = async ({
	contentId,
}: {
	contentId: string;
}) => {
	const { data } = await api.get(`/ContentItems/${contentId}`);
	return data;
};

export const fetchContentsByPlaylistIds = async (ids: string[]) => {
	const { data } = await api.get(
		`/ContentItems?${ids.map((id) => `playlists=${id}`).join("&")}`
	);
	return data;
};

export const uploadContent = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	await api.post("/ContentItems", formData);
};
