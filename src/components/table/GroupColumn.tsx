import { Group, Playlist, Screen } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { MdScreenshotMonitor } from "react-icons/md";

import { CgMediaLive } from "react-icons/cg";
import { useQuery } from "react-query";
import { fetchScreensbyGroupIds } from "@/apis/screens";
import { fetchPlaylistByGroupIds } from "@/apis/playlists";

const handleRenderChecked = (row: any) => {
	return row.getIsSelected() || row.original.inCurrent;
};

export const GroupColumns: ColumnDef<
	Group & { inCurrent: any; screenCount: number; playlistCount: number }
>[] = [
	{
		id: "select",
		cell: ({ row }) => (
			<Checkbox
				// checked={row.getIsSelected() || true}
				checked={handleRenderChecked(row)}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "name",
		header: "Name",
		cell: ({ row }) => row.original.name,
	},
	{
		id: "screenCount",
		header: () => <MdScreenshotMonitor />,

		cell: ({ row }) => {
			const currentGroupRow = row.original;

			const { data: screensBelongToGroup } = useQuery<Screen[]>({
				queryKey: ["screens", currentGroupRow.id],
				queryFn: () => {
					return fetchScreensbyGroupIds([currentGroupRow.id]);
				},
			});

			return screensBelongToGroup?.length;
		},
	},
	{
		id: "playlistCount",
		header: () => <CgMediaLive />,

		cell: ({ row }) => {
			const currentGroupRow = row.original;

			const { data: playlistBelongToGroup } = useQuery<Playlist[]>({
				queryKey: ["screens", currentGroupRow.id],
				queryFn: () => {
					return fetchPlaylistByGroupIds([currentGroupRow.id]);
				},
			});

			return playlistBelongToGroup?.length;
		},
	},
];
