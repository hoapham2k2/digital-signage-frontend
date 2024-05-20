import { Group } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { MdScreenshotMonitor } from "react-icons/md";
import { appStore } from "@/lib/stores/app-store";
import { CgMediaLive } from "react-icons/cg";
export const GroupColumns: ColumnDef<Group>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
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
			const groups = appStore((state) => state.groups);
			const screens = appStore((state) => state.screens);

			const group = groups.find((g) => g.id === row.original.id);
			const screenCount = screens.filter((s) =>
				s.groups.includes(group?.id || "")
			).length;

			return screenCount;
		},
	},
	{
		id: "playlistCount",
		header: () => <CgMediaLive />,
		cell: ({ row }) => {
			const groups = appStore((state) => state.groups);
			const playlists = appStore((state) => state.playlists);

			const group = groups.find((g) => g.id === row.original.id);
			const playlistCount = playlists.filter((p) =>
				p.groups.includes(group?.id || "")
			).length;

			return playlistCount;
		},
	},
];
