import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { useFormContext } from "react-hook-form";
import { CreatePlaylistFormFields } from "../../CreatePlaylistPage";
import { Button } from "@/components/ui/button";

export const CreatePlaylistHeaderSection = () => {
	const methods = useFormContext<CreatePlaylistFormFields>();
	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-2 items-center'>
				<HistoryBackButton />
				<h1 className='text-2xl'>New Playlist</h1>
			</div>
			<div>
				{methods.formState.isDirty ? (
					<Button type='submit'>Create Playlist</Button>
				) : null}
			</div>
		</div>
	);
};

export default CreatePlaylistHeaderSection;
