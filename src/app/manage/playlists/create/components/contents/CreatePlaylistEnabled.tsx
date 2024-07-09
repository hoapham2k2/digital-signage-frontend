import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import { CreatePlaylistFormFields } from "../../CreatePlaylistPage";

export const CreatePlaylistEnabled = () => {
	const methods = useFormContext<CreatePlaylistFormFields>();
	return (
		<div className='flex flex-row justify-between items-center'>
			<p>Enabled</p>
			<Switch {...methods.register("playlist.is_enabled")} />
		</div>
	);
};

export default CreatePlaylistEnabled;
