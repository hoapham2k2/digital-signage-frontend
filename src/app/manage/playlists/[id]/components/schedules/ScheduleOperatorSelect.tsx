import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types";
import { Control, useFormContext, useWatch } from "react-hook-form";

const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};

type ScheduleOperatorSelectProps = {
	index: number;
};

const ScheduleOperatorSelect = (_props: ScheduleOperatorSelectProps) => {
	const schedule = useWatch({
		control: _props.control,
		name: _props.name,
	});

	const { setValue } = useFormContext();

	return (
		<select
			value={schedule?.operator}
			onChange={(e) => {
				const newOperator = e.target.value as string;
				const newSchedule = { ...schedule, operator: newOperator };
				setValue(_props.name, newSchedule);
			}}>
			{
				//@ts-ignore
				scheduleOptisonsMap[schedule?.type]?.map((scheduleOperator: string) => (
					<option key={scheduleOperator} value={scheduleOperator}>
						{scheduleOperator}
					</option>
				))
			}
		</select>
	);
};

export default ScheduleOperatorSelect;
