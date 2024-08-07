import { Content } from "@/types/index";
import supabase from "@/configs/supabaseConfig";
import { v7 as uuidv7 } from "uuid";

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
	const { data, error } = await supabase
		.from("content_items")
		.select()
		.eq("id", contentId);
	if (error) {
		throw error;
	}
	return data[0];
};

export const getContentsByPlaylistAsync = async (playlistId: string) => {
	const { data, error } = await supabase.rpc(
		"select_content_items_by_playlist",
		{
			playlistid: playlistId,
		}
	);
	if (error) {
		throw error;
	}
	return data;
};

export const UploadContentAsync = async (
	file: File,
	metaData: {
		width: number;
		height: number;
		duration: number;
		resource_type: string;
	},
	userID: string
) => {
	if (!file) {
		throw new Error("No file provided");
	}
	const uniqueFileName = `${uuidv7()}-${file.name}`;

	const { data: uploadData, error } = await supabase.storage
		.from("content")
		.upload(uniqueFileName, file, {
			cacheControl: "3600",
			upsert: true,
		});

	if (error) throw error;

	const { data: content, error: contentError } = await supabase
		.from("content_items")
		.upsert([
			{
				title: file.name,
				file_path: uploadData.fullPath,
				width: metaData.width,
				height: metaData.height,
				//using Round to convert to seconds
				duration: Math.round(metaData.duration),
				resource_type: metaData.resource_type,
			},
		])
		.select();

	if (contentError) throw contentError;

	const { error: userContentError } = await supabase
		.from("content_item_users")
		.upsert([
			{
				content_item_id: content[0].id,
				user_id: userID,
			},
		])
		.select();

	if (userContentError) throw userContentError;

	return content;
};

export const updateContent = async (content: Content) => {
	const { data, error } = await supabase
		.from("content_items")
		.upsert([content])
		.select();

	if (error) throw error;
	return data;
};

export const getContentsByScreenAsync = async (screenId: string) => {
	const { data: contentItems, error: errorContentItems } = await supabase.rpc(
		"select_content_items_by_player",
		{
			playerid: Number(screenId),
		}
	);

	if (errorContentItems) throw errorContentItems;
	return contentItems;
};

export const deleteContentAsync = async (contentId: string) => {
	await supabase
		.from("content_item_users")
		.delete()
		.eq("content_item_id", contentId);

	await supabase.from("content_items").delete().eq("id", contentId);
};
