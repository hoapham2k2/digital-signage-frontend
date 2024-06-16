import { ScheduleOperatorForTime, ScheduleType } from "@/types/index";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React from "react";
import { useFormContext } from "react-hook-form";
import AppDatePicker from "./AppDatePicker";
import { ScheduleBetweenTimeValue } from "./ScheduleBetweenTimeValue";

type ScheduleValueSectionProps = {
	index: number;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	const { watch } = useFormContext();

	const schedule = watch(`playlist.schedules.${_props.index}`);

	switch (schedule?.type) {
		case ScheduleType.TheDate:
			return <AppDatePicker index={_props.index} />;
		case ScheduleType.TheTime:
			if (schedule.operator === ScheduleOperatorForTime.IsBetween) {
				return <ScheduleBetweenTimeValue index={_props.index} />;
			}
			return <AppDatePicker index={_props.index} />;
		case ScheduleType.TheWeekdays:
			return <ScheduleWeekdaysToggleGroup index={_props.index} />;
		default:
			return <div>null</div>;
	}
};
export default ScheduleValueSection;
