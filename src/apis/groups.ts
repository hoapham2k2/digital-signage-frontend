import { api } from "@/configs/axiosConfig";
import { Label } from "@/types/index";
import supabase from "@/configs/supabaseConfig";

export const fetchGroups = async (userId: string): Promise<Label[]> => {
	const { data } = await supabase.rpc("select_labels_by_user", {
		userid: userId,
	});
	return data;
};

export const fetchGroupById = async (id: string): Promise<Label> => {
	// const { data } = await api.get(`/Labels/${id}`);
	// return data;
	const { data, error } = await supabase
		.from("labels")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const fetchGroupsByScreenId = async ({
	screenId,
}: {
	screenId: string;
}): Promise<Label[]> => {
	const { data, error } = await supabase.rpc("select_labels_by_player_01", {
		playerid: Number.parseInt(screenId),
	});
	if (error) throw error;
	return data;
};


export const fetchGroupsByPlaylistAsync = async (playlistId: string) => {
	const { data } = await api.get(`/Labels/playlist/${playlistId}`);
	return data;
};