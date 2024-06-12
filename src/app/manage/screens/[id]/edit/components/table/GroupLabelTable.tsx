import { fetchGroups } from "@/apis/groups";
import { fetchPlaylistById } from "@/apis/playlists";
import { fetchScreenById } from "@/apis/screens";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Group, Playlist, Screen } from "@/types/index";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useQuery } from "react-query";
import { GroupLabelTableColumns } from "./GroupLabelTableColumn";
import { DataTable } from "./data-table";

type GroupLabelTableProps = {
	type: "screen" | "playlist";
	id: string;
};

const GroupLabelTable: React.FC<GroupLabelTableProps> = (
	_props: GroupLabelTableProps
) => {
	const { data: groups } = useQuery<Group[]>({
		queryKey: ["groups"],
		queryFn: () => {
			return fetchGroups();
		},
	});
	const { data: screen } = useQuery<Screen>({
		queryKey: ["screen", _props.id],
		queryFn: () => {
			return fetchScreenById(_props.id);
		},
	});

	const { data: playlist } = useQuery<Playlist>({
		queryKey: ["playlist", _props.id],
		queryFn: () => {
			return fetchPlaylistById(_props.id);
		},
		enabled: !!_props.id,
	});

	return (
		<div>
			<DataTable
				columns={GroupLabelTableColumns}
				data={groups ?? []}
				type={_props.type}
			/>
		</div>
	);
};

export default GroupLabelTable;
