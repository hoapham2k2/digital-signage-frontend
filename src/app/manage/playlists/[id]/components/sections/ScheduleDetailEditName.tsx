import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";


export const ScheduleDetailEditName = () => {
	const methods = useFormContext();
	return (
		<div className=''>
			<h2 className='text-base'>Name</h2>
			<Controller
				control={methods.control}
				name={"playlist.title"}
				render={({ field }) => <Input {...field} />}
			/>
		</div>
	);
};

export default ScheduleDetailEditName;
