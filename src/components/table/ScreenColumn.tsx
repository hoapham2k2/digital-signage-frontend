import { Screen } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { SlScreenDesktop } from "react-icons/sl";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { appStore } from "@/lib/stores/app-store";
import AppBadge from "../buttons/AppBadge";
export const ScreenColumns: ColumnDef<Screen>[] = [
	{
		id: "thumbnail",
		cell: ({ row }) => {
			const screen = row.original;
			if (screen.thumbnail) {
				return (
					<img className='h-10 w-10' src={screen.thumbnail} alt={screen.name} />
				);
			} else return <SlScreenDesktop className='h-10 w-10' />;
		},
	},
	{
		header: "Name",
		accessorKey: "name",
	},
	{
		header: "Group labels",
		accessorKey: "groups",
		cell: ({ row }) => {
			const screen = row.original;
			return (
				<div className='flex flex-row gap-1'>
					{screen.groups.map((groupId: string) => {
						const groups = appStore((state) => state.groups);
						const group = groups.find((g) => g.id === groupId);
						return <AppBadge key={groupId} name={group?.name || ""} />;
					})}
				</div>
			);
		},
	},
	{
		header: "Last Heartbeat",
		accessorKey: "lastHeartbeat",
		cell: ({ row }) => {
			const screen = row.original;
			return screen.lastHeartbeat
				? new Date(screen.lastHeartbeat).toLocaleString()
				: "_";
		},
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const screen = row.original;
			return screen.status || "_";
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;
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
								navigate(`/manage/screens/${payment.id}/edit`);
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
