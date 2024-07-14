import { Playlist } from "@/types/index";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { BiSolidPlaylist } from "react-icons/bi";
import PlaylistActionsRow from "./ActionRows";
import PlaylistDurationRows from "./PlaylistDurationRows";

export const PlaylistColumns: ColumnDef<Playlist>[] = [
	{
		id: "thumbnail",
		cell: () => {
			return <BiSolidPlaylist className='h-6 w-6' />;
		},
	},
	{
		id: "title",
		header: "Title",
		cell: ({ row }) => {
			return <div>{row.original.title}</div>;
		},
	},
	// {
	// 	id: "playOn",
	// 	header: "Play On",
	// 	cell: ({ row }) => {
	// 		const groups = row.original.playlistLabels.map(
	// 			(label) => label.label.name
	// 		);

	// 		return (
	// 			<div>
	// 				{groups.map((group) => (
	// 					<AppBadge key={group} name={group} />
	// 				))}
	// 			</div>
	// 		);
	// 	},
	// },
	{
		id: "duration",
		header: "Duration",

		cell: ({ row }) => {
			return <PlaylistDurationRows row={row} />;
		},
	},
	{
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<div
					className={`${cn("text-sm", "font-medium")} ${
						row.original.is_enabled === true ? "text-green-500" : "text-red-500"
					}`}>
					{row.original.is_enabled === true ? "Enabled" : "Disabled"}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <PlaylistActionsRow row={row} />;
		},
	},
];
