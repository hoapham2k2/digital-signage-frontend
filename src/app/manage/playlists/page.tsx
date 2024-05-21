import PlaylistTable from "./components/PlaylistTable";

type Props = NonNullable<unknown>;

const PlaylistsManagementPage = (_props: Props) => {
	return (
		<div>
			<PlaylistTable />
		</div>
	);
};

export default PlaylistsManagementPage;
