import { fetchContentById, updateContent } from "@/apis/contents";
import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@/types/index";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import VideoThumbnailGenerator from "../components/VideoThumbnail";
import React, { FormEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";

const AssetDetailPage: React.FC = () => {
	const { id: contentItemId } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const methods = useForm<Content>({});
	const { toast } = useToast();

	const {
		data: currentContent,
		isLoading: isContentLoading,
		isError: isContentError,
	} = useQuery(
		["content", contentItemId],
		() => fetchContentById({ contentId: contentItemId as string }),
		{
			enabled: !!contentItemId,
			onSuccess: (data: Content) => {
				methods.reset(data);
			},
		}
	);

	const { mutate: updateContentMutation } = useMutation(
		(data: Content) => updateContent(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("contents");
				navigate("/manage/assets");
			},
		}
	);

	const onSubmit: SubmitHandler<Content> = async (data) => {
		toast({
			title: "Updating content...",
			description: JSON.stringify(data, null, 2),
		});
		updateContentMutation(data);
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();
		await methods.handleSubmit(onSubmit)(e);
	};

	if (isContentLoading) return <div>Loading...</div>;
	if (isContentError) return <div>Error...</div>;
	if (!currentContent) return <div>Content not found</div>;

	return (
		<div>
			<FormProvider {...methods}>
				<form onSubmit={mySubmit}>
					<div className='flex flex-row justify-between items-center'>
						<div className='flex flex-row gap-4 items-center'>
							<HistoryBackButton />
							<h1 className='text-2xl'>Edit {currentContent.title}</h1>
						</div>
					</div>
					<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
						<div className='flex flex-row gap-4'>
							<div className='w-1/2'>
								<h3>Title</h3>
								{/* <form.Field
					name='title'
					children={(field) => (
						<Input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					)}
				/> */}
								<Input {...methods.register("title")} />
							</div>
							<div className='w-1/2 flex flex-col gap-4 '>
								{currentContent.file_path &&
								currentContent.resource_type === "Image" ? (
									<div className='w-full h-1/2  self-start overflow-hidden rounded-md'>
										<img
											src={
												`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${currentContent.file_path}` ??
												""
											}
											alt={currentContent.title}
											className='object-cover rounded-md w-full h-full'
										/>
									</div>
								) : (
									<VideoThumbnailGenerator
										videoUrl={
											`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${currentContent.file_path}` ??
											""
										}
										classnames={[
											"w-full",
											"h-full",
											"object-cover",
											"rounded-md",
										]}
									/>
								)}

								<div className='flex flex-row justify-between items-center mt-4'>
									<h6>Default Duration</h6>
									<p>{currentContent?.duration} sec</p>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h6>Dimension</h6>
									<p>
										{currentContent?.width} x {currentContent?.height}
									</p>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h6>Resource type</h6>
									<p>{currentContent?.resource_type}</p>
								</div>
							</div>
						</div>
					</div>
					<DevTool control={methods.control} />
					{methods.formState.isDirty && (
						<div className='flex flex-row justify-end mt-4'>
							<Button type='submit' variant='default'>
								Save
							</Button>
						</div>
					)}
				</form>
			</FormProvider>
		</div>
	);
};

export default AssetDetailPage;
