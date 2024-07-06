import VideoThumbnailGenerator from "@/app/manage/assets/components/VideoThumbnail";
import { Button } from "@/components/ui/button";
import { Playlist } from "@/types";
import RenderDuration from "@/utils/renderDuration";
import { useFieldArray, useFormContext } from "react-hook-form";

export const ContentsBelongToPlaylist = () => {
	const methods = useFormContext<{ playlist: Playlist }>();
	const { fields, remove } = useFieldArray({
		control: methods.control,
		name: "playlist.playlistContentItems",
	});
	return (
		<div className='flex flex-col gap-2'>
			{fields &&
				fields.map((_content, index) => {
					return (
						<div key={index} className='flex flex-row justify-between'>
							<div className='flex flex-row gap-2 items-center'>
								{_content.contentItem.resourceType === "Image" ? (
									<img
										src={
											`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
												_content.contentItem.filePath.includes("default")
													? ""
													: "content"
											}/${_content.contentItem.filePath}` ?? ""
										}
										alt={_content.contentItem.title}
										className='w-10 h-10'
									/>
								) : (
									// <MdOndemandVideo className='w-10 h-10' />
									<VideoThumbnailGenerator
										videoUrl={
											`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
												_content.contentItem.filePath.includes("default")
													? ""
													: "content"
											}/${_content.contentItem.filePath}` ?? ""
										}
										classnames={["w-10", "h-10"]}
									/>
								)}
								{_content.contentItem.title}
							</div>
							<div className='flex flex-row gap-8 items-center justify-center'>
								<span className='text-md font-semibold'>
									{RenderDuration(_content.contentItem.duration)}
								</span>
								<Button
									onClick={(e: any) => {
										e.preventDefault();
										remove(index);
										methods.setValue(
											"playlist.playlistContentItems",
											methods.getValues("playlist.playlistContentItems")
										);
									}}>
									Remove
								</Button>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ContentsBelongToPlaylist;
