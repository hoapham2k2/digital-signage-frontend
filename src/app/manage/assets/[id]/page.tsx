import { fetchContentById } from "@/apis/contents";
import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@/lib/types";
import { useField, useForm } from "@tanstack/react-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

type Props = NonNullable<unknown>;

const AssetDetailPage = (_props: Props) => {
	const { id } = useParams();

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
	const form = useForm<Content>({
		defaultValues: {
			id: content?.id ?? 0,
			title: content?.title ?? "",
			filePath: content?.filePath ?? "",
			duration: content?.duration ?? 0,
			resourceType: content?.resourceType ?? "Image",
		},
		onSubmit: async (values) => {
			console.log(values);
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
			<form onSubmit={form.handleSubmit}>
				<div>
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
							<div className='w-1/2 flex flex-col gap-4'>
								{content.filePath ? (
									<img
										src={
											`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${content.filePath}` ??
											""
										}
										alt={content.title}
										className='w-1/2 h-1/2 self-center'
									/>
								) : (
									<p>No thumbnail</p>
								)}

								<div className='flex flex-row justify-between items-center mt-4'>
									<h3>Default Duration</h3>
									<h3>{content?.duration} sec</h3>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h3>Dimension</h3>
									<h3>1920 x 1080</h3>
								</div>

								<div className='flex flex-row justify-between items-center mt-4'>
									<h3>Resource type</h3>
									<h3>{content?.resourceType}</h3>
								</div>
								{nameField.state.meta.isDirty ||
								filePathField.state.meta.isDirty ? (
									<div className='flex flex-row justify-end items-center mt-4 gap-2'>
										<Button type='submit'>Save</Button>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
};

export default AssetDetailPage;
