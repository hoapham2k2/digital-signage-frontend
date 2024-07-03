import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist } from "@/types/index";
import { fetchPlaylists } from "@/apis/playlists";
import { useQuery } from "react-query";

const PlaylistTable = () => {
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
