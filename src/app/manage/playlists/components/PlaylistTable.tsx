import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist } from "@/types/index";
import { fetchPlaylists } from "@/apis/playlists";
import { useQuery } from "react-query";
import { usePlaylistStore } from "@/lib/stores/playlist-store";
import { useEffect } from "react";

type Props = NonNullable<unknown>;

const PlaylistTable = (_props: Props) => {
	const {
		data: playlists,
		isLoading: isFetchPlaylistsLoading,
		isError: isFetchPlaylistsError,
		isSuccess: isFetchPlaylistsSuccess,
	} = useQuery<Playlist[]>({
		queryKey: "playlists",
		queryFn: fetchPlaylists,
	});

	if (isFetchPlaylistsLoading) return <div>Loading...</div>;
	if (isFetchPlaylistsError) return <div>Error</div>;
	if (isFetchPlaylistsSuccess)
		return (
			<div>
				{playlists && (
					<DataTable
						columns={PlaylistColumns}
						data={playlists}
						type='playlist'
					/>
				)}
			</div>
		);
};

export default PlaylistTable;
