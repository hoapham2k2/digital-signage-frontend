import { Content } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import VideoThumbnailGenerator from "./VideoThumbnail";
import { ActionsRow } from "./ActionsRow";

export const ContentsColumns: ColumnDef<Content>[] = [
	{
		accessorKey: "file_path",
		cell: ({ row }) => {
			const content = row.original;

			return content.resource_type === "Image" ? (
				<img
					src={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${content.file_path}` ??
						""
					}
					alt={content.title}
					className='w-10 h-10'
				/>
			) : (
				<VideoThumbnailGenerator
					videoUrl={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${content.file_path}` ??
						""
					}
					classnames={["w-10", "h-10"]}
				/>
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
			return row.original.resource_type;
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
			return <ActionsRow row={row} />;
		},
	},
];
