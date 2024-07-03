import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";
const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};

type ScheduleOperatorSelectProps = {
	index: number;
};
const ScheduleTypeSelect = (_props: ScheduleOperatorSelectProps) => {
	const { control } = useFormContext<PlaylistFormValueTypes>();
	return (
		<Controller
			name={`playlist.schedules.${_props.index}`}
			control={control}
			render={({ field }) => {
				return (
					<>
						<select
							value={field.value?.type ?? ""}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								const newSchedule = { ...field.value };
								const newType = e.target.value as ScheduleType;
								newSchedule.type = newType;
								newSchedule.operator = scheduleOptisonsMap[newType][0];
								switch (newSchedule.type) {
									case ScheduleType.TheDate:
										newSchedule.value = new Date().toISOString();
										break;
									case ScheduleType.TheTime:
										if (
											newSchedule.operator === ScheduleOperatorForTime.IsBetween
										) {
											newSchedule.value = `${new Date().toISOString()},${new Date().toISOString()}`;
										} else newSchedule.value = new Date().toISOString();
										break;
									case ScheduleType.TheWeekdays:
										newSchedule.value = "";
										break;
								}

								field.onChange(newSchedule);
							}}>
							{Object.values(ScheduleType).map((scheduleType) => (
								<option key={scheduleType} value={scheduleType}>
									{scheduleType}
								</option>
							))}
						</select>
					</>
				);
			}}
		/>
	);
};

export default ScheduleTypeSelect;
