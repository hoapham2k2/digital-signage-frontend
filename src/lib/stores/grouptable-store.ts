import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GroupTableState = {
	editedIds: { [key: number]: boolean };
	// for example, { 1: true, 2: false, 3: true }

	setEditedIds: (ids: { [key: number]: boolean }) => void;
};

const useGroupTableStore = create<GroupTableState>()(
	devtools((set, _get) => ({
		editedIds: {},

		setEditedIds: (ids) => {
			set({ editedIds: ids });
		},
	}))
);

export default useGroupTableStore;
