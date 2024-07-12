import { cn } from "@/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";
import AddContentToPlaylistButton from "./AddContentToPlaylistButton";
import VideoThumbnailGenerator from "@/app/manage/assets/components/VideoThumbnail";
import { Input } from "@/components/ui/input";
import RenderDuration from "@/utils/renderDuration";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { fetchContents } from "@/apis/contents";
import { useAuth } from "@/context/AuthContext";

export const PlaylistDetailContentComponent = () => {
	const { user } = useAuth();
	const methods = useFormContext<PlaylistFormValueTypes>();

	const { fields, remove, update } = useFieldArray({
		control: methods.control,
		name: "playlistContentItems",
	});

	const {
		data: fetchedContents,
		isLoading: isFetchingContents,
		isError: fetchContentsError,
	} = useQuery({
		queryKey: "contents",
		queryFn: () => fetchContents(user?.id ?? ""),
		// onSuccess: (data) => {
		// 	// const formPlaylistContentItems = methods.getValues(
		// 	// 	"playlistContentItems"
		// 	// );

		// 	// const newPlaylistContentItems = data.map((content: any) => {
		// 	// 	const found = formPlaylistContentItems.find(
		// 	// 		(item: any) => item.contentItem.id === content.id
		// 	// 	);

		// 	// 	if (found) {
		// 	// 		return found;
		// 	// 	}

		// 	// 	return {
		// 	// 		contentItem: content,
		// 	// 		duration: 0,
		// 	// 	};
		// 	// });
		// },
	});

	if (isFetchingContents) {
		return <div>Loading...</div>;
	}

	if (fetchContentsError) {
		return <div>Error...</div>;
	}

	if (!fetchedContents) {
		return <div>Not found</div>;
	}

	return (
		<div>
			{/* Header */}
			<div className={cn("flex flex-row gap-2")}>
				<h2>Content</h2>
				<AddContentToPlaylistButton />
			</div>

			{/* Body */}
			<div className='flex flex-col gap-2'>
				{fields &&
					fields.map((_content, index) => {
						return (
							<div key={_content.id} className='flex flex-row justify-between'>
								<div className='flex flex-row gap-2 items-center'>
									{_content?.contentItem?.resource_type === "Image" ? (
										<img
											src={
												`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${_content?.contentItem?.file_path}` ??
												""
											}
											alt={_content?.contentItem?.title}
											className='w-10 h-10'
										/>
									) : (
										<VideoThumbnailGenerator
											videoUrl={
												`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${_content?.contentItem?.file_path}` ??
												""
											}
											classnames={["w-10", "h-10"]}
										/>
									)}
									{_content?.contentItem?.title}
								</div>
								<div className='flex flex-row gap-8 items-center justify-center'>
									<span className='text-md font-semibold'>
										{_content.contentItem?.resource_type === "Image" ? (
											<Input
												type='number'
												value={_content?.duration}
												onChange={(e) => {
													update(index, {
														..._content,
														duration: Number(e.target.value),
													});
												}}
											/>
										) : (
											RenderDuration(_content?.duration)
										)}
									</span>
									<Button
										onClick={(e: any) => {
											e.preventDefault();
											remove(index);
											methods.setValue(
												"playlistContentItems",
												methods.getValues("playlistContentItems")
											);
										}}>
										Remove
									</Button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};


export default PlaylistDetailContentComponent;
