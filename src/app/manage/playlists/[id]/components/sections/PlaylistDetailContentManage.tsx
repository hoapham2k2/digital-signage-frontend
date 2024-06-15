import { fetchContentsByPlaylistIds } from "@/apis/contents";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Control, useFormContext, useWatch } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";
import { useParams } from "react-router-dom";
import { Content } from "@/types";
import { useQuery } from "react-query";

type PlaylistDetailContentProps = {
	control: Control<PlaylistFormValueTypes>;
};

export const PlaylistDetailContentComponent: React.FC<
	PlaylistDetailContentProps
> = (_props: PlaylistDetailContentProps) => {
	const { id } = useParams<{ id: string }>();
	const methods = useFormContext<PlaylistFormValueTypes>();
	const {
		data: fetchedContentsByPlaylist,
		isLoading: isFetchingContentsByPlaylist,
		isError: fetchContentsByPlaylistError,
		isSuccess: fetchContentsByPlaylistSuccess,
	} = useQuery({
		queryKey: ["playlistContentItems", id],
		queryFn: () => fetchContentsByPlaylistIds(parseInt(id as string)),
		enabled: !!id,
		onSuccess: (data: Content[]) => {
			methods.reset({ contentItems: data });
		},
	});

	const watchContent = useWatch({
		control: _props.control,
		name: "contentItems",
	});

	if (isFetchingContentsByPlaylist) {
		return <div>Loading...</div>;
	}

	if (fetchContentsByPlaylistError) {
		return <div>Error...</div>;
	}

	if (!fetchContentsByPlaylistSuccess) {
		return <div>Not found</div>;
	}

	return (
		<div>
			{/* Header */}
			<div className={cn("flex flex-row gap-2")}>
				<h2>Content</h2>
				<Button
					onClick={(e) => {
						e.preventDefault();
					}}>
					Add Content
				</Button>
			</div>
			<pre>{JSON.stringify(watchContent, null, 2)}</pre>
		</div>
	);
};

export default PlaylistDetailContentComponent;
