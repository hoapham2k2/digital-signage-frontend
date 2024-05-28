import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist } from "@/lib/types";
import { fetchPlaylists } from "@/apis/playlists";
import { useQuery } from "react-query";
import { usePlaylistStore } from "@/lib/stores/playlist-store";
import { useEffect } from "react";

type Props = NonNullable<unknown>;

const PlaylistTable = (_props: Props) => {
	const { setPlaylists } = usePlaylistStore((state) => ({
		setPlaylists: state.setPlaylists,
	}));
	const {
		data: playlists,
		isLoading,
		isError,
	} = useQuery<Playlist[]>({
		queryKey: "playlists",
		queryFn: fetchPlaylists,
	});

	useEffect(() => {
		if (playlists) {
			setPlaylists(playlists);
		}
	}, [playlists, setPlaylists]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div>
			{playlists && (
				<DataTable columns={PlaylistColumns} data={playlists} type='playlist' />
			)}
		</div>
	);
};

export default PlaylistTable;
