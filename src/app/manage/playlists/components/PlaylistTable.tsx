import { DataTable } from "@/components/table/DataTable";
import { appStore } from "@/lib/stores/app-store";
import React from "react";
import { PlaylistColumns } from "./PlaylistColumns";

type Props = {};

const PlaylistTable = (props: Props) => {
	const playlists = appStore((state) => state.playlists);

	return (
		<div>
			<DataTable columns={PlaylistColumns} data={playlists} />
		</div>
	);
};

export default PlaylistTable;
