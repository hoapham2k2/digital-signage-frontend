import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";
import { CreatePlaylistFormFields } from "../../CreatePlaylistPage";

export const CreatePlaylistEnabled = () => {
	const methods = useFormContext<CreatePlaylistFormFields>();
	return (
		<div className='flex flex-row justify-between items-center'>
			<p>Enabled</p>
			{/* <Switch {...methods.register("playlist.is_enabled")} /> */}
			<Controller
				control={methods.control}
				name='playlist.is_enabled'
				render={({ field }) => (
					<Switch
						checked={field.value}
						onCheckedChange={(newChecked: boolean) =>
							field.onChange(newChecked)
						}
					/>
				)}
			/>
		</div>
	);
};

export default CreatePlaylistEnabled;
