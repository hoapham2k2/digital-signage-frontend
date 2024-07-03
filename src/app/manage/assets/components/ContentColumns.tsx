import { Content } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import VideoThumbnailGenerator from "./VideoThumbnail";
import { ActionsRow } from "./ActionsRow";

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
				// <MdOndemandVideo className='w-10 h-10' />
				<VideoThumbnailGenerator
					videoUrl={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
							content.filePath.includes("default") ? "" : "content"
						}/${content.filePath}` ?? ""
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
			return <ActionsRow row={row} />;
		},
	},
];
