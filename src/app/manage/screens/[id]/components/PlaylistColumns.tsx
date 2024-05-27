import { fetchContentsByPlaylistIds } from "@/apis/contents";
import { Content, Playlist } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";

export const PlaylistColumns: ColumnDef<Playlist>[] = [
	{
		id: "content",
		header: "Content",
		cell: ({ row }) => {
			const currentPlaylistRow = row.original;
			const { data: contentsBelongToPlaylists } = useQuery<Content[]>({
				queryKey: ["contents", currentPlaylistRow],
				queryFn: () => {
					return fetchContentsByPlaylistIds([currentPlaylistRow.id]);
				},
				enabled: !!currentPlaylistRow,
			});

			return (
				<div>
					{contentsBelongToPlaylists &&
						contentsBelongToPlaylists.find(
							(content) => content.id === currentPlaylistRow.id
						) && (
							<div>
								{contentsBelongToPlaylists
									.filter((content) => content.id === currentPlaylistRow.id)
									.map((content) => (
										<div key={content.id}>{content.name}</div>
									))}
							</div>
						)}
				</div>
			);
		},
	},
	{
		id: "Type",
		header: "Type",
		cell: ({ row }) => {
			const currentPlaylistRow = row.original;
			const { data: contentsBelongToPlaylists } = useQuery<Content[]>({
				queryKey: ["contents", currentPlaylistRow],
				queryFn: () => {
					return fetchContentsByPlaylistIds([currentPlaylistRow.id]);
				},
				enabled: !!currentPlaylistRow,
			});

			return (
				<div>
					{contentsBelongToPlaylists &&
						contentsBelongToPlaylists.find(
							(content) => content.id === currentPlaylistRow.id
						) && (
							<div>
								{contentsBelongToPlaylists
									.filter((content) => content.id === currentPlaylistRow.id)
									.map((content) => (
										<div key={content.id}>{content.type}</div>
									))}
							</div>
						)}
				</div>
			);
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
