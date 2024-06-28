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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchGroupsByScreenId } from "@/apis/groups";
import { FaCloud } from "react-icons/fa";
import { deleteScreen } from "@/apis/screens";
import { useState } from "react";

export const ScreenColumns: ColumnDef<Screen>[] = [
	{
		id: "thumbnail",
		cell: ({ row }) => {
			const screen = row.original;
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
			return screen.lastPing ? new Date(screen.lastPing).toLocaleString() : "_";
		},
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const screen = row.original;
			switch (screen.status) {
				case 0:
					return <p className="text-green-500">ONLINE</p>
				case 1:
					return <p className="text-yellow-500">OUT OF SYNC</p>
				case 2:
					return <p className="text-red-500">OFFLINE</p>
				case 3:
					return <p className="text-gray-500">DISABLED</p>
				default:
					return <p className="text-green-500">ONLINE</p>
			}
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;
			const navigate = useNavigate();
			const queryClient = useQueryClient();
			const { mutate: deleteScreenMutation } = useMutation(
				() => {
					return deleteScreen(payment.id?.toString() ?? "");
				},
				{
					onSuccess: () => {
						setIsDropdownOpen(false);
						queryClient.invalidateQueries("screens");
					},
				}
			);
			const [isDropdownOpen, setIsDropdownOpen] = useState(false);
			return (
				<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
						<DropdownMenuItem
							className='text-red-500'
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								deleteScreenMutation();
							}}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
