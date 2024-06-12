import AppDatePicker from "@/components/date_time_pickers/AppDatePicker";
import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/types/index";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React from "react";
import { ScheduleBetweenTimeValue } from "./ScheduleBetweenTimeValue";

type ScheduleValueSectionProps = {
	currentSchedule: Schedule;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	return (
		<div>
			{_props.currentSchedule.scheduleType === ScheduleType.TheDate && (
				// _props.currentSchedule.scheduleValue instanceof Date &&
				<AppDatePicker currentSchedule={_props.currentSchedule} />
			)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator ===
					ScheduleOperatorForTime.IsBetween && (
					<ScheduleBetweenTimeValue currentSchedule={_props.currentSchedule} />
				)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator !==
					ScheduleOperatorForTime.IsBetween && (
					<AppDatePicker currentSchedule={_props.currentSchedule} />
				)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheWeekdays && (
				<ScheduleWeekdaysToggleGroup currentSchedule={_props.currentSchedule} />
			)}
		</div>
	);
};

export default ScheduleValueSection;
