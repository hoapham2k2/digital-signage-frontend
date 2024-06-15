import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types";
import { Control, Controller, useFormContext, useWatch } from "react-hook-form";

const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};

type ScheduleOperatorSelectProps = {
	index: number;
};

const ScheduleOperatorSelect = (_props: ScheduleOperatorSelectProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={`playlist.schedules.${_props.index}.operator`}
			render={({ field }) => {
				return (
					<select
						value={field.value}
						onChange={(e) => {
							const newOperator = e.target.value as string;
							field.onChange(newOperator);
						}}>
						{
							//@ts-ignore
							scheduleOptisonsMap[field.value]?.map(
								(scheduleOperator: string) => (
									<option key={scheduleOperator} value={scheduleOperator}>
										{scheduleOperator}
									</option>
								)
							)
						}
					</select>
				);
			}}
		/>
	);
};

export default ScheduleOperatorSelect;
