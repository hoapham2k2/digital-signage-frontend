import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types";
import { Controller } from "react-hook-form";
const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};
const ScheduleTypeSelect = ({
	control,
	name,
}: {
	control: any;
	name: string;
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<>
					<Select
						value={field.value?.type}
						onValueChange={(value) =>
							field.onChange({
								...field.value,
								type: value,
							})
						}>
						<SelectTrigger>
							<SelectValue placeholder={"Select an option"} />
						</SelectTrigger>
						<SelectContent>
							{Object.values(ScheduleType).map((scheduleType) => (
								<SelectItem key={scheduleType} value={scheduleType}>
									{/* {scheduleType.charAt(0).toUpperCase() +
										scheduleType
											.slice(1)
											.split(/(?=[A-Z])/)
											.join(" ")} */}
									{scheduleType}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</>
			)}
		/>
	);
};

export default ScheduleTypeSelect;
