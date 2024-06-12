import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Playlist } from "@/types/index";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiSolidPlaylist } from "react-icons/bi";
import AppBadge from "@/components/buttons/AppBadge";

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
	{
		id: "playOn",
		header: "Play On",
		// cell: ({ row }) => {
		// 	const playlistCurrent = row.original;
		// 	const groupsWhichPlaylistBelongsTo = appStore
		// 		.getState()
		// 		.groups.filter((group) => playlistCurrent.groups.includes(group.id));

		// 	return (
		// 		<div>
		// 			{groupsWhichPlaylistBelongsTo.map((group) => (
		// 				<AppBadge key={group.id} name={group.name} />
		// 			))}
		// 		</div>
		// 	);
		// },
		cell: ({ row }) => {
			const groups = row.original.playlistLabels.map(
				(label) => label.label.name
			);

			return (
				<div>
					{groups.map((group) => (
						<AppBadge key={group} name={group} />
					))}
				</div>
			);
		},
	},
	{
		id: "duration",
		header: "Duration",

		cell: ({ row }) => {
			return <div>{row.original.duration} sec</div>;
		},
	},
	{
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<div
					className={`${cn("text-sm", "font-medium")} ${
						row.original.isEnabled === true ? "text-green-500" : "text-red-500"
					}`}>
					{row.original.isEnabled === true ? "Enabled" : "Disabled"}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const playlist = row.original;
			const navigate = useNavigate();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								navigate(`/manage/playlists/${playlist.id}`);
							}}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem className='text-red-500'>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
