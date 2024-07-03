import { Screen, ScreenType } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { SlScreenDesktop } from "react-icons/sl";
import { FaCloud } from "react-icons/fa";
import ScreenActionRow from "./ScreenActionRow";
import ScreenGroupLabelRow from "./ScreenGroupLabelRow";

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
			return <ScreenGroupLabelRow row={row} />;
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
					return <p className='text-green-500'>ONLINE</p>;
				case 1:
					return <p className='text-yellow-500'>OUT OF SYNC</p>;
				case 2:
					return <p className='text-red-500'>OFFLINE</p>;
				case 3:
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
