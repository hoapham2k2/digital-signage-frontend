import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";

export const PlaylistDetailEditEnabled = () => {
	const methods = useFormContext<PlaylistFormValueTypes>();
	return (
		<div className='flex flex-row items-center justify-between'>
			<h2 className='text-base'>Enabled</h2>

			<Controller
				control={methods.control}
				name='playlist.is_enabled'
				render={({ field }) => (
					<Switch
						checked={field.value}
						onCheckedChange={(newvalue: boolean) => field.onChange(newvalue)}
					/>
				)}
			/>
		</div>
	);
};

export default PlaylistDetailEditEnabled;
