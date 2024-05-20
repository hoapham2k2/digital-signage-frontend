import React from "react";
import { Outlet } from "react-router-dom";
import PlaylistTable from "./components/PlaylistTable";

type Props = {};

const PlaylistsManagementPage = (props: Props) => {
	return (
		<div>
			<PlaylistTable />
		</div>
	);
};

export default PlaylistsManagementPage;
