import { create } from "zustand";
import { Screen } from "../types";
import { devtools } from "zustand/middleware";

export type ScreenStoreType = {
	screens: Screen[];
	isScreenChanged: boolean;
};

export type ScreenStoreActions = {
	setScreens: (screens: Screen[]) => void; // Set screens information
	updateScreen: (screen: Screen) => void; // Update screen information
	deleteScreen: (id: string) => void; // Delete screen information
};

export type ScreenStoreState = ScreenStoreType & ScreenStoreActions;

export const useScreenStore = create<ScreenStoreState>()(
	devtools((set, _get) => ({
		screens: [],
		isScreenChanged: false,

		// for screen actions
		setScreens: (screens: Screen[]) => {
			set((_state) => ({
				screens: screens,
			}));
		},
		updateScreen: (screen: Screen) => {
			set((state) => ({
				screens: state.screens.map((s) => (s.id === screen.id ? screen : s)),
			}));
		},
		deleteScreen: (id: string) => {
			set((state) => ({
				screens: state.screens.filter((s) => s.id !== id),
			}));
		},
	}))
);
