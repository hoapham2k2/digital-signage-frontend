import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";


export const PlaylistDetailEditEnabled = () => {
	const methods = useFormContext();
	return (
		<div className='flex flex-row items-center justify-between'>
			<h2 className='text-base'>Enabled</h2>

			<Controller
				control={methods.control}
				name='playlist.isEnabled'
				render={({ field }) => (
					<Switch
						checked={field.value}
						onCheckedChange={(newvalue) => field.onChange(newvalue)}
					/>
				)}
			/>
		</div>
	);
};

export default PlaylistDetailEditEnabled;
