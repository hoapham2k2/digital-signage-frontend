import { api } from "@/configs/axiosConfig";
import { Group } from "@/types/index";
import supabase from "@/configs/supabaseConfig";

export const fetchGroups = async () => {
	const { data } = await api.get("/Labels");
	return data;
};

export const fetchGroupById = async (id: string) => {
	const { data } = await api.get(`/Labels/${id}`);
	return data;
};

export const fetchGroupsByScreenId = async ({
	screenId,
}: {
	screenId: string;
}) => {
	// const { data } = await api.get(`/Labels/player/${screenId}`);
	// return data;

	// const { data: groups, error: groupsError } = await supabase
	// 	.from("labels")
	// 	.select(`*, players(*)`)
	// 	.eq("players.id", screenId);

	// if (groupsError) throw groupsError;

	// return groups;
	const { data, error } = await supabase.rpc("select_labels_by_player_01", {
		playerid: Number.parseInt(screenId),
	});
	if (error) throw error;
	return data;
};

export const fetchGroupByIds = async (ids: string[]): Promise<Group[]> => {
	const { data: groups } = await api.get(`/Labels`);
	const filteredGroups = groups.filter((group: Group) =>
		ids.includes(group.id.toString())
	);
	return filteredGroups;
};


export const fetchGroupsByPlaylistAsync = async (playlistId: string) => {
	const { data } = await api.get(`/Labels/playlist/${playlistId}`);
	return data;
};