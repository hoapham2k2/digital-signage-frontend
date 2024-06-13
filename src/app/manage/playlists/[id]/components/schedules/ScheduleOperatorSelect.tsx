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
const ScheduleOperatorSelect = ({
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
						value={
							//@ts-ignore
							scheduleOptisonsMap[field.value?.type]?.includes(
								field.value?.operator
							) ||
							!field.value?.operator ||
							!field.value?.type
								? field.value?.operator
								: // @ts-ignore
								  scheduleOptisonsMap[field.value?.type] &&
								  // @ts-ignore
								  scheduleOptisonsMap[field.value?.type][0]
						}
						onValueChange={(value) =>
							field.onChange({ ...field.value, operator: value })
						}>
						<SelectTrigger>
							<SelectValue placeholder={"Select an option"} />
						</SelectTrigger>
						<SelectContent>
							{
								//@ts-ignore
								scheduleOptisonsMap[field.value?.type]?.map(
									(scheduleOperator: string) => (
										<SelectItem key={scheduleOperator} value={scheduleOperator}>
											{scheduleOperator}
										</SelectItem>
									)
								)
							}
						</SelectContent>
					</Select>
				</>
			)}
		/>
	);
};

export default ScheduleOperatorSelect;
