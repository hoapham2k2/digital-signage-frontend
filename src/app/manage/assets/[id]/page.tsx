import { fetchContentById, updateContent } from "@/apis/contents";
import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@/types/index";
import { useField, useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import VideoThumbnailGenerator from "../components/VideoThumbnail";

type Props = NonNullable<unknown>;

const AssetDetailPage = (_props: Props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		data: content,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Content>({
		queryKey: ["content", id],
		queryFn: () => {
			return fetchContentById({ contentId: id ?? "" });
		},
		enabled: !!id,
	});

	const { mutate } = useMutation((content: Content) => updateContent(content), {
		onSuccess: () => {
			queryClient.invalidateQueries("contents");
			navigate("/manage/assets");
		},
	});

	const form = useForm<Content>({
		defaultValues: {
			id: content?.id ?? 0,
			title: content?.title ?? "",
			filePath: content?.filePath ?? "",
			duration: content?.duration ?? 0,
			resourceType: content?.resourceType ?? "Image",
		},
		onSubmit: async (values) => {
			await mutate(values.value);
		},
	});

	const nameField = useField({
		name: "title",
		form,
	});

	const filePathField = useField({
		name: "filePath",
		form,
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error...</div>;
	}

	if (isSuccess) {
		return (
			<div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}>
					<div className='flex flex-row justify-between items-center'>
						<div className='flex flex-row gap-4 items-center'>
							<HistoryBackButton />
							<h1 className='text-2xl'>Edit {content.title}</h1>
						</div>
					</div>
					<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
						<div className='flex flex-row gap-4'>
							<div className='w-1/2'>
								<h3>Title</h3>
								<form.Field
									name='title'
									children={(field) => (
										<Input
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									)}
								/>
							</div>
							<div className='w-1/2 flex flex-col gap-4 '>
								{content.filePath && content.resourceType === "Image" ? (
									<div className='w-full h-1/2  self-start overflow-hidden rounded-md'>
										<img
											src={
												`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
													content.filePath.includes("default") ? "" : "content"
												}/${content.filePath}` ?? ""
											}
											alt={content.title}
											className='object-cover rounded-md w-full h-full'
										/>
									</div>
								) : (
									<VideoThumbnailGenerator
										videoUrl={
											`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
												content.filePath.includes("default") ? "" : "content"
											}/${content.filePath}` ?? ""
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
									<p>{content?.duration} sec</p>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h6>Dimension</h6>
									<p>1920 x 1080</p>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h6>Resource type</h6>
									<p>{content?.resourceType}</p>
								</div>
							</div>
						</div>
					</div>
					{nameField.state.meta.isDirty || filePathField.state.meta.isDirty ? (
						<div className='flex flex-row justify-end items-center mt-4 gap-2'>
							<Button type='submit'>Save</Button>
						</div>
					) : null}
					{/* <form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<button type='submit' disabled={!canSubmit}>
								{isSubmitting ? "..." : "Submit"}
							</button>
						)}
					/> */}
				</form>
			</div>
		);
	}
};

export default AssetDetailPage;
