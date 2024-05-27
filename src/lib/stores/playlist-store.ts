import { create } from "zustand";
import { Playlist } from "../types";
import { devtools } from "zustand/middleware";

export type PlaylistStoreType = {
	playlists: Playlist[];
};

export type PlaylistStoreActions = {
	setPlaylists: (playlists: Playlist[]) => void;
};

export type PlaylistStoreState = PlaylistStoreType & PlaylistStoreActions;

export const usePlaylistStore = create<PlaylistStoreState>()(
	devtools((_set, _get) => ({
		playlists: [],

		setPlaylists: (playlists: Playlist[]) => {
			_set((_state: PlaylistStoreState) => ({
				playlists: playlists,
			}));
		},
	}))
);
