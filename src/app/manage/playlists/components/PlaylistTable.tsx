import { DataTable } from "@/components/table/DataTable";
import { appStore } from "@/lib/stores/app-store";
import { PlaylistColumns } from "./PlaylistColumns";

type Props = NonNullable<unknown>;

const PlaylistTable = (_props: Props) => {
	const playlists = appStore((state) => state.playlists);

	return (
		<div>
			<DataTable columns={PlaylistColumns} data={playlists} />
		</div>
	);
};

export default PlaylistTable;
