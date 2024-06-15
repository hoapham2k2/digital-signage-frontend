import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/types/index";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React, { useEffect } from "react";
import { Control, FieldValues, useWatch } from "react-hook-form";
import AppDatePicker from "./AppDatePicker";
import { ScheduleBetweenTimeValue } from "./ScheduleBetweenTimeValue";

type ScheduleValueSectionProps = {
	control: Control<FieldValues, any>;
	name: string;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	const schedule = useWatch({
		control: _props.control,
		name: _props.name,
	} as any);
	switch (schedule?.type) {
		case "TheDate":
			return <AppDatePicker name={_props.name} control={_props.control} />;
		case "TheTime":
			if (schedule.operator === ScheduleOperatorForTime.IsBetween) {
				return (
					<ScheduleBetweenTimeValue
						name={_props.name}
						control={_props.control}
					/>
				);
			}
			return <AppDatePicker name={_props.name} control={_props.control} />;
		case ScheduleType.TheWeekdays:
			return (
				<ScheduleWeekdaysToggleGroup
					name={_props.name}
					control={_props.control}
				/>
			);
		default:
			return <div>null</div>;
	}
};
export default ScheduleValueSection;
