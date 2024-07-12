import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";

export const ScheduleDetailEditName = () => {
	const methods = useFormContext<PlaylistFormValueTypes>();
	return (
		<div className=''>
			<h2 className='text-base'>Name</h2>
			<Input {...methods.register("playlist.title")} />
		</div>
	);
};

export default ScheduleDetailEditName;
