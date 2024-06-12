import { Group, Screen, ScreenType } from "@/types/index";
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
import AppBadge from "../buttons/AppBadge";
import { useQuery } from "react-query";
import { fetchGroupsByScreenId } from "@/apis/groups";
import { FaCloud } from "react-icons/fa";

export const ScreenColumns: ColumnDef<Screen>[] = [
	{
		id: "thumbnail",
		cell: ({ row }) => {
			const screen = row.original;
			if (screen)
				if (screen.type === ScreenType.VIRTUAL) {
					return <FaCloud className='h-6 w-6' />;
				}
			return <SlScreenDesktop className='h-6 w-6' />;
		},
	},
	{
		header: "Name",
		accessorKey: "name",
	},
	{
		header: "Group labels",
		cell: ({ row }) => {
			const currentScreen = row.original;
			const {
				data: groups,
				isLoading,
				isError,
			} = useQuery<Group[]>({
				queryKey: ["groups", { screenId: currentScreen.id }],
				queryFn: async () => {
					return fetchGroupsByScreenId({
						screenId: currentScreen.id as unknown as string,
					});
				},
				enabled: !!currentScreen.id,
			});

			if (isLoading) return <div>Loading...</div>;
			if (isError) return <div>Error</div>;
			if (groups)
				return (
					<div className='flex flex-row gap-1'>
						{groups &&
							groups.map((group) => (
								<AppBadge key={group.id} name={group.name} />
							))}
					</div>
				);
			return null;
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
