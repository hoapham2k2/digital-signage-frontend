import AppDatePicker from "@/components/date_time_pickers/AppDatePicker";
import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/lib/types";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React from "react";
import { ScheduleBetweenTimeValue } from "./ScheduleBetweenTimeValue";
import { useScheduleStore } from "@/lib/stores/schedule-store";

type ScheduleValueSectionProps = {
	currentSchedule: NonNullable<Schedule>;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	const updateScheduleDateValue = useScheduleStore(
		(state) => state.updateScheduleDateValue
	);

	const AppUpdateSchedule = (_newDateValue: Date) => {
		updateScheduleDateValue(_props.currentSchedule, _newDateValue);
	};

	return (
		<div>
			{_props.currentSchedule.scheduleType === ScheduleType.TheDate && (
				<AppDatePicker
					scheduleValue={_props.currentSchedule.scheduleValue}
					updateSchedule={AppUpdateSchedule}
				/>
			)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator ===
					ScheduleOperatorForTime.IsBetween && (
					<ScheduleBetweenTimeValue currentSchedule={_props.currentSchedule} />
				)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator !==
					ScheduleOperatorForTime.IsBetween && (
					<AppDatePicker
						scheduleValue={_props.currentSchedule.scheduleValue}
						updateSchedule={AppUpdateSchedule}
					/>
				)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheWeekdays && (
				<ScheduleWeekdaysToggleGroup currentSchedule={_props.currentSchedule} />
			)}
		</div>
	);
};

export default ScheduleValueSection;
