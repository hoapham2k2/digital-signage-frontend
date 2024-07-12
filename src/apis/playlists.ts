import { api } from "@/configs/axiosConfig";
import supabase from "@/configs/supabaseConfig";
import {
	Playlist,
	PlaylistContentItems,
	PlaylistLabels,
	PlaylistUser,
	Schedule,
} from "@/types/index";

export const fetchPlaylistById = async (id: string): Promise<Playlist> => {
	// const { data } = await api.get(`/Playlists/${id}`);
	// return data;
	const { data, error } = await supabase
		.from("playlists")
		.select()
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const fetchPlaylistLabelsByPlaylistAsync = async (
	playlistId: string
) => {
	const { data, error } = await supabase
		.from("playlist_labels")
		.select()
		.eq("playlist_id", playlistId);

	if (error) throw error;
	return data;
};

export const fetchPlaylistContentItemsByPlaylistAsync = async (
	playlistId: string
): Promise<PlaylistContentItems[]> => {
	const {
		data: fetchedPlaylistContentItems,
		error: fetchPlaylistContentItemsError,
	} = await supabase
		.from("playlist_content_items")
		.select()
		.eq("playlist_id", playlistId);
	if (fetchPlaylistContentItemsError) {
		throw fetchPlaylistContentItemsError;
	}

	// loop through the fetchedPlaylistContentItems and fetch the content item details by content_item_id
	const contentItemIds = fetchedPlaylistContentItems.map(
		(item: PlaylistContentItems) => item.content_item_id
	);

	if (contentItemIds.length === 0) {
		return [];
	}

	const { data: contentItems, error: contentItemsError } = await supabase
		.from("content_items")
		.select()
		.in("id", contentItemIds);

	if (contentItemsError) {
		throw contentItemsError;
	}

	// merge the content item details to the playlist content items
	const playlistContentItems = fetchedPlaylistContentItems.map(
		(item: PlaylistContentItems) => {
			const contentItem = contentItems.find(
				(contentItem) => contentItem.id === item.content_item_id
			);
			return {
				...item,
				contentItem,
			};
		}
	);

	return playlistContentItems;
};

export const fetchPlaylists = async (userID: string) => {
	// const { data } = await api.get(`/Playlists?userID=${userID}`);
	// return data;
	const { data } = await supabase.rpc("select_playlists_by_user", {
		userid: userID,
	});

	return data;
};

export const deletePlaylistUserAsync = async (id: string) => {
	const { data, error } = await supabase
		.from("playlist_users")
		.delete()
		.eq("playlist_id", id);
	if (error) throw error;
	return data;
};

export const deletePlaylistContentItemsAsync = async (id: string) => {
	const { data, error } = await supabase
		.from("playlist_content_items")
		.delete()
		.eq("playlist_id", id);
	if (error) throw error;
	return data;
};

export const deletePlaylistLabelsAsync = async (id: string) => {
	const { data, error } = await supabase
		.from("playlist_labels")
		.delete()
		.eq("playlist_id", id);
	if (error) throw error;
	return data;
};

export const deletePlaylistAsync = async (id: string) => {
	const { data, error } = await supabase
		.from("playlists")
		.delete()
		.eq("id", id);
	if (error) throw error;
	return data;
};
export const updatePlaylistAsync = async (playlist: Playlist) => {
	const { data, error } = await supabase
		.from("playlists")
		.update(playlist)
		.eq("id", playlist.id)
		.select();

	if (error) throw error;
	return data;
};

export const updatePlaylistLabelsAsync = async (
	playlistLabels: PlaylistLabels[]
) => {
	if (playlistLabels.length === 0) {
		return;
	}
	// turn params to { _playlist_id: number,  _label_ids: number[] } where _playlist_id is the playlist_id and _label_ids is the array of label ids that we have to map the playlistLabels to get
	const playlistLabelsDTO = {
		_playlist_id: playlistLabels[0].playlist_id,
		_label_ids: playlistLabels.map((label) => label.label_id),
	};
	const { data, error } = await supabase.rpc(
		"update_playlist_labels",
		playlistLabelsDTO
	);

	if (error) throw error;

	return data;
};

export const updatePlaylistContentItemsAsync = async (
	playlistsContentItems: PlaylistContentItems[]
) => {
	if (playlistsContentItems.length === 0) {
		return;
	}
	try {
		const PlaylistContentItemsDTO = {
			_playlist_id: playlistsContentItems[0].playlist_id,
			_content_items: playlistsContentItems.map((item) => {
				return {
					content_item_id: item.content_item_id,
					duration: item.duration,
				};
			}),
		};

		const { data, error } = await supabase.rpc(
			"update_playlist_content_items",
			PlaylistContentItemsDTO
		);

		if (error) throw error;
		return data;
	} catch (error) {
		throw error;
	}
};

export const updatePlaylistSchedules = async (
	playlistId: number,
	schedules: Schedule[]
) => {
	await api.put(`/Playlists/${playlistId}/schedules`, schedules);
};

export const createPlaylistAsync = async (playlist: Playlist) => {
	const { data, error } = await supabase
		.from("playlists")
		.insert({
			...playlist,
			id: undefined,
		})
		.select();
	if (error) {
		throw error;
	}
	return data;
};

export const createPlaylistUserAsync = async (playlistuser: PlaylistUser) => {
	const { data, error } = await supabase
		.from("playlist_users")
		.insert(playlistuser)
		.select();

	if (error) throw error;
	return data;
};

export const createPlaylistLabelAsync = async (
	playlistLabels: PlaylistLabels[]
) => {
	const { data, error } = await supabase
		.from("playlist_labels")
		.insert(playlistLabels)
		.select();

	if (error) throw error;
	return data;
};

export const createPlaylistContentItemsAsync = async (
	playlistsContentItems: PlaylistContentItems[]
) => {
	const PlaylistContentItemsDTO = playlistsContentItems.map((item) => {
		return {
			playlist_id: item.playlist_id,
			content_item_id: item.content_item_id,
			duration: item.duration,
		};
	});
	const { data, error } = await supabase
		.from("playlist_content_items")
		.insert(PlaylistContentItemsDTO)
		.select();

	if (error) throw error;
	return data;
};

