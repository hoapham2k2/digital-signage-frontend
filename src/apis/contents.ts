import { api } from "@/configs/axiosConfig";
import { Content } from "@/types/index";
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

export const fetchContentsByPlaylistIds = async (playlistId: number) => {
	const { data } = await api.get(`/ContentItems/playlist/${playlistId}`);
	return data;
};

export const UploadContentAsync = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	await api.post("/ContentItems", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const updateContent = async (content: Content) => {
	await api.put(`/ContentItems`, content);
};
