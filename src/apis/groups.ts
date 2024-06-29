import { api } from "@/configs/axiosConfig";
import { Group } from "@/types/index";

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
}): Promise<Group[]> => {
	const { data } = await api.get(`/Labels/player/${screenId}`);
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