import { api } from "@/configs/axiosConfig";
import { Group } from "@/lib/types";

export const fetchGroups = async () => {
	const { data } = await api.get("/Labels");
	return data;
};

export const fetchGroupById = async (id: string) => {
	const { data } = await api.get(`/Labels/${id}`);
	return data;
};

export const fetchGroupByIds = async (ids: string[]): Promise<Group[]> => {
	const { data: groups } = await api.get(`/Labels`);
	const filteredGroups = groups.filter((group: Group) =>
		ids.includes(group.id.toString())
	);
	return filteredGroups;
};
