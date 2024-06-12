import { DataTable } from "@/components/table/DataTable";
import { PlaylistColumns } from "./PlaylistColumns";
import { Playlist, Screen } from "@/types/index";

type Props = {
	screen: Screen;
	playlists: Playlist[];
};

const PlaylistForScreenTable = (_props: Props) => {
	return (
		<div className='mt-2'>
			<DataTable isPlaylist columns={PlaylistColumns} data={_props.playlists} />
		</div>
	);
};

export default PlaylistForScreenTable;
