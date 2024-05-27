import { Group, Playlist, Screen } from "@/lib/types";
import { DataTable } from "./DataTable";
import { GroupColumns } from "./GroupColumn";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchScreenById } from "@/apis/screens";
import { fetchGroups } from "@/apis/groups";
import { fetchPlaylistById } from "@/apis/playlists";

type Props = {
	groups: Group[];
	type: "screen" | "playlist";
	setIsShowButton?: React.Dispatch<React.SetStateAction<boolean>>; // set the state of the button in the parent component
};

const GroupTable = (props: Props) => {
	// const [currentAllGroups, setCurrentAllGroups] = React.useState<Group[]>();
	// const { data: groups } = useQuery<Group[]>({
	// 	queryKey: ["groups"],
	// 	queryFn: () => {
	// 		return fetchGroups();
	// 	},
	// });

	// React.useEffect(() => {
	// 	if (allGroups) {
	// 		setCurrentAllGroups(allGroups);
	// 	}
	// }, [allGroups]);
	const { id } = useParams<{ id: string }>();
	const { data: screen } = useQuery<Screen>({
		queryKey: ["screen", id],
		queryFn: () => fetchScreenById(id as string),
		enabled: !!id,
	});

	const { data: playlist } = useQuery<Playlist>({
		queryKey: ["playlist", id],
		queryFn: () => fetchPlaylistById(id as string),
		enabled: !!id,
	});

	const { data: groups } = useQuery<Group[]>({
		queryKey: ["groups"],
		queryFn: () => fetchGroups(),
	});

	const data = props.type === "screen" ? screen : playlist;

	if (!data) {
		return <div>No data</div>;
	}

	const tableData = groups?.map((group: Group) => {
		const screenCount: number = screen?.groups.includes(group.id) ? 1 : 0;
		const playlistCount: number = playlist?.groups.includes(group.id) ? 1 : 0;
		return {
			...group,
			inCurrent: data.groups.includes(group.id), // check if the group is in the current screen/playlist
			screenCount,
			playlistCount,
		};
	});

	return (
		<div className='mt-4'>
			{/* {currentAllGroups && (
				<DataTable
					columns={GroupColumns}
					data={currentAllGroups}
					setIsShowSaveGroupButton={props.setIsShowButton}
				/>
			)} */}

			{tableData && (
				<DataTable
					columns={GroupColumns}
					data={tableData}
					setIsShowSaveGroupButton={props.setIsShowButton}
				/>
			)}
		</div>
	);
};

export default GroupTable;
