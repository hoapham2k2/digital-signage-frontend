import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Content } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { MdOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ContentsColumns: ColumnDef<Content>[] = [
	{
		accessorKey: "filePath",
		cell: ({ row }) => {
			const content = row.original;

			return content.resourceType === "Image" ? (
				<img
					src={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
							content.filePath.includes("default") ? "" : "content"
						}/${content.filePath}` ?? ""
					}
					alt={content.title}
					className='w-10 h-10'
				/>
			) : (
				// handle preview for video
				<MdOndemandVideo className='w-10 h-10' />
			);
		},
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			return row.original.title;
		},
	},
	{
		id: "type",
		header: "Type",
		cell: ({ row }) => {
			return row.original.resourceType;
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
