import { Input } from "@/components/ui/input";
import { Playlist } from "@/types";
import { useFormContext } from "react-hook-form";
import CreatePlaylistEnabled from "./CreatePlaylistEnabled";

export const CreatePlaylistFields = () => {
	const methods = useFormContext<{ playlist: Playlist }>();

	return (
		<div className='flex-1 flex flex-col gap-2'>
			<Input
				{...methods.register("playlist.title")}
				placeholder='Playlist name'
			/>
			<CreatePlaylistEnabled />
		</div>
	);
};

export default CreatePlaylistFields;
