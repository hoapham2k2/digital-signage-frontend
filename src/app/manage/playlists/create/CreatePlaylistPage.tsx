import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CreatePlaylistBodySection from "./components/sections/CreatePlaylistBodySection";
import CreatePlaylistHeaderSection from "./components/sections/CreatePlaylistHeaderSection";
import { Playlist } from "@/types";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";

export const CreatePlaylistPage = () => {
	const methods = useForm<{ playlist: Playlist }>();
	const { toast } = useToast();

	const onSubmit: SubmitHandler<{ playlist: Playlist }> = async (data: {
		playlist: Playlist;
	}) => {
		toast({
			title: "Submit create playlist form",
			description: JSON.stringify(data),
		});
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};
	return (
		<FormProvider {...methods}>
			<form onSubmit={mySubmit}>
				<div className='flex flex-col gap-2'>
					<CreatePlaylistHeaderSection />
					<CreatePlaylistBodySection />
				</div>
				{methods.formState.isDirty ? (
					<Button type='submit' className='mt-4 float-right'>
						Create Playlist
					</Button>
				) : null}
				<DevTool control={methods.control} />
			</form>
		</FormProvider>
	);
};
export default CreatePlaylistPage;
