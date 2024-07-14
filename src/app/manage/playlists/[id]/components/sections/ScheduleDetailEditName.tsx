import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";

export const ScheduleDetailEditName = () => {
	const methods = useFormContext<PlaylistFormValueTypes>();
	return (
		<div className=''>
			<h2 className='text-base'>Name</h2>
			{/* <Input {...methods.register("playlist.title")} /> */}
			<Controller
				name='playlist.title'
				control={methods.control}
				render={({ field }) => <Input {...field} />}
			/>
		</div>
	);
};

export default ScheduleDetailEditName;
