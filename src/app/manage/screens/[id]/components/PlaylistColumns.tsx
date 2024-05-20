import { appStore } from "@/lib/stores/app-store";
import { Content, Playlist } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const PlaylistColumns: ColumnDef<Playlist>[] = [
	{
		id: "content",
		header: "Content",
		cell: ({ row }) => {
			const contents: Content[] = appStore((state) => state.contents);
			const content = contents.find((content) =>
				row.original.contents.includes(content.id)
			);

			return (
				<div className='flex flex-row items-center gap-2'>
					<div className='w-8 h-8 bg-gray-300 rounded-md'></div>
					<div>{content?.name}</div>
				</div>
			);
		},
	},
	{
		id: "Type",
		header: "Type",
		cell: ({ row }) => {
			const contents: Content[] = appStore((state) => state.contents);
			const content = contents.find((content) =>
				row.original.contents.includes(content.id)
			);

			return <div>{content?.type}</div>;
		},
	},
	{
		id: "Playlist",
		header: "Playlist",
		cell: ({ row }) => {
			return <div>{row.original.name}</div>;
		},
	},
];
