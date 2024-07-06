import { Switch } from "@/components/ui/switch";
import { Playlist } from "@/types";
import { useFormContext } from "react-hook-form";

export const CreatePlaylistEnabled = () => {
	const methods = useFormContext<{ playlist: Playlist }>();
	return (
		<div className='flex flex-row justify-between items-center'>
			<p>Enabled</p>
			<Switch {...methods.register("playlist.isEnabled")} />
		</div>
	);
};

export default CreatePlaylistEnabled;
