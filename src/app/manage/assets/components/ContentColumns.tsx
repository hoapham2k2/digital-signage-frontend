import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Content } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { SlScreenDesktop } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export const ContentsColumns: ColumnDef<Content>[] = [
	{
		id: "thumbnail",
		cell: ({ row }) => {
			const content = row.original;
			if (content.thumbnail) {
				return (
					<img
						className='h-10 w-10'
						src={content.thumbnail}
						alt={content.name}
					/>
				);
			} else return <SlScreenDesktop className='h-10 w-10' />;
		},
	},
	{
		id: "title",
		header: "Title",
		cell: ({ row }) => {
			return row.original.name;
		},
	},
	{
		id: "type",
		header: "Type",
		cell: ({ row }) => {
			return row.original.type;
		},
	},
	{
		id: "duration",
		header: "Duration",
		cell: ({ row }) => {
			return row.original.duration;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const content = row.original;
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
								navigate(`/manage/assets/${content.id}`);
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
