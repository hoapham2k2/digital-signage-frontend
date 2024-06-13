import AppDatePicker from "@/components/date_time_pickers/AppDatePicker";
import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/types/index";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React from "react";
import { ScheduleBetweenTimeValue } from "./schedules/ScheduleBetweenTimeValue";
import { Controller } from "react-hook-form";

type ScheduleValueSectionProps = {
	control: any;
	name: string;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	return (
		<Controller
			name={_props.name}
			control={_props.control}
			render={({ field }) => (
				<>
					<div>
						{field.value.type === ScheduleType.TheDate && (
							<AppDatePicker currentSchedule={field.value} />
						)}

						{field.value.scheduleType === ScheduleType.TheTime &&
							field.value.scheduleOperator ===
								ScheduleOperatorForTime.IsBetween && (
								<ScheduleBetweenTimeValue currentSchedule={field.value} />
							)}

						{field.value.scheduleType === ScheduleType.TheTime &&
							field.value.scheduleOperator !==
								ScheduleOperatorForTime.IsBetween && (
								<AppDatePicker currentSchedule={field.value} />
							)}

						{field.value.scheduleType === ScheduleType.TheWeekdays && (
							<ScheduleWeekdaysToggleGroup currentSchedule={field.value} />
						)}
					</div>
				</>
			)}
		/>
	);
};

export default ScheduleValueSection;
