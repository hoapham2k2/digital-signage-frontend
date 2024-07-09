import { ColumnDef } from "@tanstack/react-table";
import { SlScreenDesktop } from "react-icons/sl";
import { FaCloud } from "react-icons/fa";
import ScreenActionRow from "./ScreenActionRow";
import ScreenGroupLabelRow from "./ScreenGroupLabelRow";
import { Player } from "@/types";

export const ScreenColumns: ColumnDef<Player>[] = [
	{
		id: "thumbnail",
		cell: ({ row }) => {
			if (row.original.type === "VIRTUAL") {
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
			return <ScreenGroupLabelRow row={row} />;
		},
	},
	{
		header: "Last Heartbeat",
		accessorKey: "lastHeartbeat",
		cell: ({ row }) => {
			const player = row.original;
			return player.last_ping
				? new Date(player.last_ping).toLocaleString()
				: "_";
		},
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const player = row.original;
			switch (player.status) {
				case "ONLINE":
					return <p className='text-green-500'>ONLINE</p>;
				case "OUT_OF_SYNC":
					return <p className='text-yellow-500'>OUT OF SYNC</p>;
				case "OFFLINE":
					return <p className='text-red-500'>OFFLINE</p>;
				case "DISABLED":
					return <p className='text-gray-500'>DISABLED</p>;
				default:
					return <p className='text-green-500'>ONLINE</p>;
			}
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <ScreenActionRow row={row} />;
		},
	},
];
