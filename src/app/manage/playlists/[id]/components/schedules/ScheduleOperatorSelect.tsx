import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types";
import { Controller, useFormContext } from "react-hook-form";

type ScheduleOperatorSelectProps = {
	index: number;
};

const ScheduleOperatorSelect = (_props: ScheduleOperatorSelectProps) => {
	const { watch, control } = useFormContext();
	let selectOptions: string[] = [];
	const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
		[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
		[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
		[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
	};

	const scheduleType = watch(`playlist.schedules.${_props.index}.type`);
	switch (scheduleType) {
		case ScheduleType.TheDate:
			selectOptions = scheduleOptisonsMap[ScheduleType.TheDate];
			break;
		case ScheduleType.TheTime:
			selectOptions = scheduleOptisonsMap[ScheduleType.TheTime];
			break;
		case ScheduleType.TheWeekdays:
			selectOptions = scheduleOptisonsMap[ScheduleType.TheWeekdays];
			break;
	}

	return (
		<Controller
			control={control}
			name={`playlist.schedules.${_props.index}`}
			render={({ field }) => {
				return (
					<>
						<select
							value={field.value?.operator ?? ""}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								const newSchedule = { ...field.value };
								newSchedule.operator = e.target.value;
								if (
									newSchedule.operator === ScheduleOperatorForTime.IsBetween
								) {
									newSchedule.value = `${new Date().toISOString()},${new Date().toISOString()}`;
								} else newSchedule.value = new Date().toISOString();
								field.onChange(newSchedule);
							}}>
							{selectOptions.map((operator) => (
								<option key={operator} value={operator}>
									{operator}
								</option>
							))}
						</select>
					</>
				);
			}}
		/>
	);
};

export default ScheduleOperatorSelect;
