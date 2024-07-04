import { api } from "@/configs/axiosConfig";
import { Content } from "@/types/index";


export const fetchContents = async (userID: string): Promise<Content[]> => {
	const { data } = await api.get(`/ContentItems?userID=${userID}`);
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

export const UploadContentAsync = async (file: File, userID: string) => {
	if (!file) {
		throw new Error("No file provided");
	}
	const formData = new FormData();
	formData.append("file", file);
	await api.post(`/ContentItems?userID=${userID}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const updateContent = async (content: Content) => {
	await api.put(`/ContentItems`, content);
};

export const getContentsByScreenAsync = async (screenId: string) => {
	const { data } = await api.get(`/ContentItems/player/${screenId}`);
	return data;
};

export const deleteContentAsync = async (contentId: string) => {
	await api.delete(`/ContentItems/${contentId}`);
};