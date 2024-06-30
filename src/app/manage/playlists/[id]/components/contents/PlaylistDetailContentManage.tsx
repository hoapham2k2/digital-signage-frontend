import { fetchContentsByPlaylistIds } from "@/apis/contents";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";
import { useParams } from "react-router-dom";
import { Content } from "@/types";
import { useQuery } from "react-query";
import { IoMdClose } from "react-icons/io";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MdOndemandVideo } from "react-icons/md";
import { Input } from "@/components/ui/input";
import AddContentToPlaylistButton from "./AddContentToPlaylistButton";
import VideoThumbnailGenerator from "@/app/manage/assets/components/VideoThumbnail";

type PlaylistDetailContentProps = {};

export const PlaylistDetailContentComponent: React.FC<
	PlaylistDetailContentProps
> = (_props: PlaylistDetailContentProps) => {
	const { id: playlistId } = useParams<{ id: string }>();
	const methods = useFormContext<PlaylistFormValueTypes>();

	const { fields, append, remove } = useFieldArray<PlaylistFormValueTypes>({
		control: methods.control,
		name: "playlist.playlistContentItems",
	});
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
					fields.map((_item, index) => {
						return (
							<div
								key={_item.id}
								className='flex flex-row justify-between items-center'>
								<PlaylistDetailContentItem index={index} />
								<IoMdClose
									className='h-6 w-6'
									onClick={(_e) => {
										remove(index);
									}}
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export const PlaylistDetailContentItem: React.FC<any> = (_props: {
	index: number;
}) => {
	const methods = useFormContext();
	const { remove } = useFieldArray({
		control: methods.control,
		name: `playlist.playlistContentItems`,
	});
	return (
		<Controller
			control={methods.control}
			name={`playlist.playlistContentItems[${_props.index}]`}
			render={({ field }) => {
				return (
					<div className='flex-1 flex flex-row justify-between items-center'>
						<div className='flex flex-row items-center gap-2'>
							{field.value.contentItem.resourceType == "Image" ? (
								<img
									src={
										`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
											field.value.contentItem.filePath.includes("default")
												? ""
												: "content"
										}/${field.value.contentItem.filePath}` ?? ""
									}
									alt={field.value.title}
									className='w-10 h-10'
								/>
							) : (
								// <MdOndemandVideo className='w-10 h-10' />
								<VideoThumbnailGenerator
									videoUrl={
										`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
											field.value.contentItem.filePath.includes("default")
												? ""
												: "content"
										}/${field.value.contentItem.filePath}` ?? ""
									}
									classnames={["w-10", "h-10"]}
								/>
							)}

							<div>{field.value.contentItem.title}</div>
						</div>
						<div>
							{field.value.contentItem.resourceType == "Image" ? (
								<Input
									type='number'
									value={field.value.duration}
									onChange={(e) => {
										const newDuration = e.target.value;
										let newContentItem = { ...field.value };
										newContentItem.duration = newDuration;
										field.onChange(newContentItem);
									}}
									min={1}
								/>
							) : (
								<span>{field.value.duration}</span>
							)}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default PlaylistDetailContentComponent;
