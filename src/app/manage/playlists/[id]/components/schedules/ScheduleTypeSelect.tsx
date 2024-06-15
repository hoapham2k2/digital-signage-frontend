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
import { Control, Controller, useFormContext, useWatch } from "react-hook-form";
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
	const { control, register } = useFormContext<PlaylistFormValueTypes>();
	return (
		<Controller
			name={`playlist.schedules.${_props.index}.type`}
			control={control}
			render={({ field }) => {
				return (
					<select
						value={field.value}
						onChange={(e) => {
							const newType = e.target.value as ScheduleType;
							const newSchedule = { ...field.value, type: newType };

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
				);
			}}
		/>
	);
};

export default ScheduleTypeSelect;
