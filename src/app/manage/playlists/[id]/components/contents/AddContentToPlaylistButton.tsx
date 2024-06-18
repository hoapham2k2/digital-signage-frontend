import { fetchContents } from "@/apis/contents";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Content } from "@/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdOndemandVideo } from "react-icons/md";
import { useQuery } from "react-query";

type AddContentToPlaylistButtonProps = unknown;

export const AddContentToPlaylistButton: React.FC<
	AddContentToPlaylistButtonProps
> = (_props: AddContentToPlaylistButtonProps) => {
	const methods = useFormContext();
	const { append } = useFieldArray({
		control: methods.control,
		name: "contentItems",
	});

	const {
		data: fetchedContents,
		isLoading: isFetchingContents,
		isError: fetchContentsError,
		isSuccess: fetchContentsSuccess,
	} = useQuery({
		queryKey: "contents",
		queryFn: () => fetchContents(),
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
				<Button onClick={(e) => {}}>Add Content</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Add Content to Playlist</DialogHeader>
				<div className='max-h-96 overflow-y-auto'>
					{fetchedContents &&
						fetchedContents.map((_content, index) => {
							return (
								<div key={index} className='flex flex-row justify-between'>
									<div className='flex flex-row gap-2 items-center'>
										{_content.resourceType === "Image" ? (
											<img
												src={
													`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
														_content.filePath.includes("default")
															? ""
															: "content"
													}/${_content.filePath}` ?? ""
												}
												alt={_content.title}
												className='w-10 h-10'
											/>
										) : (
											<MdOndemandVideo className='w-10 h-10' />
										)}
										{_content.title}
									</div>
									<div>
										<span>{_content.duration}</span>
										<Button
											onClick={() => {
												append({
													title: _content.title,
													resourceType: _content.resourceType,
													filePath: _content.filePath,
													duration: _content.duration,
												});
												methods.setValue(
													"contentItems",
													methods.getValues("contentItems")
												);
											}}>
											Add
										</Button>
									</div>
								</div>
							);
						})}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={() => {}}>Done</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddContentToPlaylistButton;
