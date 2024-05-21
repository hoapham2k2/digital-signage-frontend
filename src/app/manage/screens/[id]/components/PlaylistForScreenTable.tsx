import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist, Screen } from "@/lib/types";
import { appStore } from "@/lib/stores/app-store";
import { useParams } from "react-router-dom";

type Props = NonNullable<unknown>;

const PlaylistForScreenTable = (_props: Props) => {
	const { id } = useParams();
	const screen = appStore((state) =>
		state.screens.find((screen: Screen) => screen.id === id)
	);
	const playlists: Playlist[] = appStore((state) => state.playlists);

	const playlistsForScreen: Playlist[] = playlists.filter((playlist) =>
		playlist.groups.some((group) => screen?.groups.includes(group))
	);

	return (
		<div className='mt-2'>
			<DataTable
				isPlaylist
				columns={PlaylistColumns}
				data={playlistsForScreen}
			/>
		</div>
	);
};

export default PlaylistForScreenTable;
