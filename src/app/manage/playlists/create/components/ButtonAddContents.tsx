import { fetchContents } from "@/apis/contents";
import VideoThumbnailGenerator from "@/app/manage/assets/components/VideoThumbnail";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Playlist } from "@/types";
import RenderDuration from "@/utils/renderDuration";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const AddContentToPlaylistButton: React.FC = () => {
	const { user } = useAuth();
	const { id: playlistId } = useParams<{ id: string }>();
	const methods = useFormContext<{ playlist: Playlist }>();
	const { append } = useFieldArray({
		control: methods.control,
		name: "playlist.playlistContentItems",
	});
	const {
		data: fetchedContents,
		isLoading: isFetchingContents,
		isError: fetchContentsError,
		isSuccess: fetchContentsSuccess,
	} = useQuery({
		queryKey: "contents",
		queryFn: () => fetchContents(user?.id ?? ""),
	});

	if (isFetchingContents) {
		return <div>Loading...</div>;
	}

	if (fetchContentsError) {
		return <div>Error...</div>;
	}

	if (!fetchContentsSuccess) {
		return <div>Not found</div>;
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add Contents</Button>
			</DialogTrigger>
			<DialogContent>
				<h4>Add Content to Playlist</h4>
				<div className='max-h-96 overflow-y-auto flex flex-col gap-2'>
					{fetchedContents &&
						fetchedContents.map((_content, index) => {
							return (
								<div key={index} className='flex flex-row justify-between'>
									<div className='flex flex-row gap-2 items-center'>
										{_content.resource_type === "Image" ? (
											<img
												src={
													`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${_content.file_path}` ??
													""
												}
												alt={_content.title}
												className='w-10 h-10'
											/>
										) : (
											// <MdOndemandVideo className='w-10 h-10' />
											<VideoThumbnailGenerator
												videoUrl={
													`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${_content.file_path}` ??
													""
												}
												classnames={["w-10", "h-10"]}
											/>
										)}
										{_content.title}
									</div>
									<div className='flex flex-row gap-8 items-center justify-center'>
										<span className='text-md font-semibold'>
											{RenderDuration(_content.duration)}
										</span>
										<Button
											onClick={() => {
												// append({
												// 	playlistId: Number.parseInt(playlistId ?? "0"),
												// 	contentItemId: _content.id as number,
												// 	duration: _content.duration,
												// 	contentItem: {
												// 		title: _content.title,
												// 		resource_type: _content.resource_type,
												// 		.file_path: _content.file_path,
												// 		duration: _content.duration,
												// 	} as any,
												// });
												methods.setValue(
													"playlist.playlistContentItems",
													methods.getValues("playlist.playlistContentItems")
												);
											}}>
											Add
										</Button>
									</div>
								</div>
							);
						})}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddContentToPlaylistButton;
