import { api } from "@/configs/axiosConfig";
import { Content } from "@/types/index";
import supabase from "@/configs/supabaseConfig";

export const fetchContents = async (userID: string): Promise<Content[]> => {
	const { data } = await supabase.rpc("select_content_items_by_user", {
		userid: userID,
	});
	return data;
};

export const fetchContentById = async ({
	contentId,
}: {
	contentId: string;
}) => {
	// const { data } = await api.get(`/ContentItems/${contentId}`);
	// return data;

	const { data, error } = await supabase
		.from("content_items")
		.select()
		.eq("id", contentId);
	if (error) {
		throw error;
	}
	return data;
};

export const fetchContentsByPlaylistIds = async (playlistId: number) => {
	// const { data } = await api.get(`/ContentItems/playlist/${playlistId}`);
	// return data;

	const { data, error } = await supabase
		.from("contents")
		.select(
			`
			*,
			playlist_contents (
				playlist_id
			)
		`
		)
		.eq("playlist_id", playlistId);

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