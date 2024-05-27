import { Group } from "../types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GroupStoreType = {
	groups: Group[];
};

export type GroupStoreActions = {};

export type GroupStoreState = GroupStoreType & GroupStoreActions;

export const useGroupStore = create<GroupStoreState>()(
	devtools((set, _get) => ({
		groups: [],
	}))
);
