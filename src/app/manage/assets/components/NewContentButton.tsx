import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { UploadContentAsync } from "@/apis/contents";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

export const NewContentButton: React.FC = () => {
	const { toast } = useToast();
	const { user } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const methods = useForm<{ file: File }>();
	const previewRef = React.useRef<HTMLImageElement>(null);
	const [metaData, setMetaData] = React.useState<{
		width: number;
		height: number;
		duration: number;
		resource_type: string;
	}>({
		width: 0,
		height: 0,
		duration: 0,
		resource_type: "",
	});


	const {
		mutate: uploadContent,
		isLoading: isUploadingContentLoading,
		isError: isUploadingContentError,
	} = useMutation(
		(file: File) => UploadContentAsync(file, metaData, user?.id as string),
		{
			onSuccess: () => {
				toast({
					title: "Uploaded",
					description: "Content uploaded successfully",
				});

				methods.reset();
				setIsOpen(false);
				queryClient.invalidateQueries("contents");
			},
			onError: (error: Error) => {
				toast({
					title: "Error",
					description: error.message,
				});
				methods.reset();
				setIsOpen(false);
			},
		}
	);

	const onSubmit: SubmitHandler<{ file: File }> = (data) => {
		if (!data.file) return;
		uploadContent(data.file);
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};

	const readURL = (input: File) => {
		if (input) {
			if (input.type.includes("image")) {
				const reader = new FileReader();
				reader.onload = function (e) {
					if (previewRef.current) {
						previewRef.current.src = e.target?.result as string;
					}

					const img = new Image();
					img.onload = function () {
						setMetaData({
							width: img.width,
							height: img.height,
							duration: 10,
							resource_type: "Image",
						});
					};
					img.src = e.target?.result as string;
				};
				reader.readAsDataURL(input);
			} else if (input.type.includes("video")) {
				const videoEl = document.createElement("video");
				videoEl.preload = "metadata";
				videoEl.onloadedmetadata = function () {
					window.URL.revokeObjectURL(videoEl.src);
					setMetaData({
						width: videoEl.videoWidth,
						height: videoEl.videoHeight,
						duration: videoEl.duration,
						resource_type: "Video",
					});

					// handle video preview
					const canvas = document.createElement("canvas");
					const context = canvas.getContext("2d");
					if (context) {
						canvas.width = videoEl.videoWidth;
						canvas.height = videoEl.videoHeight;
						videoEl.currentTime = 1;
						videoEl.onseeked = function () {
							context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
							if (previewRef.current) {
								previewRef.current.src = canvas.toDataURL("image/jpeg");
							}
						};
					}
				};
				videoEl.src = URL.createObjectURL(input);
			}
		}
	};

	const handleCloseUploadingForm = () => {
		methods.reset();

		setIsOpen(false);

		if (previewRef.current) {
			previewRef.current.src = "";
		}

		setMetaData({
			width: 0,
			height: 0,
			duration: 0,
			resource_type: "",
		});

		queryClient.invalidateQueries("contents");

		toast({
			title: "Cancelled",
			description: "Cancelled uploading content",
		});
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>New Content</Button>
			</DialogTrigger>
			<DialogContent>
				{isUploadingContentLoading ? (
					<p>Uploading content...</p>
				) : isUploadingContentError ? (
					<p>Error uploading content</p>
				) : (
					<form className='flex flex-col gap-2' onSubmit={mySubmit}>
						<DialogHeader>
							<DialogTitle>New Content</DialogTitle>
						</DialogHeader>
						<Controller
							control={methods.control}
							name='file'
							render={({ field }) => (
								<div>
									<Input
										type='file'
										multiple={false}
										onChange={(e: any) => {
											field.onChange(e.target.files[0]);
											readURL(e.target.files[0]);
										}}
									/>
									{field.value && (
										<div>
											<div className='mt-2 flex justify-center items-center'>
												<img
													ref={previewRef}
													id='image'
													src=''
													alt='preview'
													className='w-1/2 h-1/2 rounded-md object-cover max-h-96'
												/>
											</div>
										</div>
									)}
								</div>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant={"outline"} onClick={handleCloseUploadingForm}>
									Close
								</Button>
							</DialogClose>
							<Button type='submit'>Finish</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default NewContentButton;
