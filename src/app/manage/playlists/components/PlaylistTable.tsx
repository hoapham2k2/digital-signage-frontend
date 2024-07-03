import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist } from "@/types/index";
import { fetchPlaylists } from "@/apis/playlists";
import { useQuery } from "react-query";
import { useAuth } from "@/context/AuthContext";

const PlaylistTable = () => {
	const { user } = useAuth();
	const {
		data: playlists,
		isLoading: isFetchPlaylistsLoading,
		isError: isFetchPlaylistsError,
		isSuccess: isFetchPlaylistsSuccess,
	} = useQuery<Playlist[]>({
		queryKey: "playlists",
		queryFn: () => fetchPlaylists(user?.id),
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
