import AppBadge from "@/components/buttons/AppBadge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Playlist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PlaylistColumns: ColumnDef<Playlist>[] = [
	{
		id: "thumbnail",
		cell: () => {
			return <div className='w-8 h-8 bg-gray-300 rounded-md'></div>;
		},
	},
	{
		id: "title",
		header: "Title",
		cell: ({ row }) => {
			return <div>{row.original.name}</div>;
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
	},
	{
		id: "duration",
		header: "Duration",
		// cell: ({ row }) => {
		// 	const playlistCurrent = row.original;
		// 	const contentsInPlaylist = appStore
		// 		.getState()
		// 		.contents.filter((content) =>
		// 			playlistCurrent.contents.includes(content.id)
		// 		);

		// 	const totalDuration = contentsInPlaylist.reduce(
		// 		(acc, content) => acc + content.duration,
		// 		0
		// 	);
		// 	return <div>{totalDuration} sec</div>;
		// },
	},
	{
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			const playlistCurrent = row.original;
			return (
				<div
					className={`${cn("text-sm", "font-medium")} ${
						playlistCurrent.status === "Enabled"
							? "text-green-500"
							: "text-red-500"
					}`}>
					{playlistCurrent.status}
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
