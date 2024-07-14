import { fetchPlaylistDurationAsync } from "@/apis/playlists";
import { useQuery } from "react-query";

const PlaylistDurationRows = ({ row }: { row: any }) => {
	const playlistId = row.original.id;
	const {
		data: playlistDuration,
		isLoading: isFetchingPlaylistDuration,
		isError: fetchPlaylist,
	} = useQuery({
		queryKey: ["playlist_duration", playlistId],
		queryFn: () => fetchPlaylistDurationAsync(playlistId),
		enabled: !!playlistId,
	});

	if (isFetchingPlaylistDuration) {
		return <div>Loading...</div>;
	}

	if (fetchPlaylist) {
		return <div>Error fetching playlist duration</div>;
	}

	return <div>{playlistDuration} seconds</div>;
};

export default PlaylistDurationRows;
