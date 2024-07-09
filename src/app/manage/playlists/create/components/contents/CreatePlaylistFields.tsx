import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import CreatePlaylistEnabled from "./CreatePlaylistEnabled";
import CreatePlaylistPlayOn from "./CreatePlaylistPlayOn";
import { CreatePlaylistFormFields } from "../../CreatePlaylistPage";

export const CreatePlaylistFields = () => {
	const methods = useFormContext<CreatePlaylistFormFields>();

	return (
		<div className='flex-1 flex flex-col gap-2'>
			<Input
				{...methods.register("playlist.title")}
				placeholder='Playlist name'
			/>
			<CreatePlaylistEnabled />
			<CreatePlaylistPlayOn />
		</div>
	);
};

export default CreatePlaylistFields;
