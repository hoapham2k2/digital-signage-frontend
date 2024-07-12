import { Content } from "./content";

export type Playlist = {
	id: number;
	title: string;
	is_enabled: boolean;
	duration: number;
};

export type PlaylistUser = {
	playlist_id: number;
	user_id: string;
};

export type PlaylistLabels = {
	label_id: number;
	playlist_id: number;
};

export type PlaylistContentItems = {
	playlist_id: number;
	content_item_id: number;
	duration: number;
	contentItem?: Content;
	playlist?: Playlist;
};
