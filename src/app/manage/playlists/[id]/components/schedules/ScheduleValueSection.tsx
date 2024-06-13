import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/types/index";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import AppDatePicker from "./AppDatePicker";
import { ScheduleBetweenTimeValue } from "./ScheduleBetweenTimeValue";

type ScheduleValueSectionProps = {
	control: Control<FieldValues, any>;
	field: any;
	name: string;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	const handleRenderSwitch = () => {
		console.log("scheduleType: ", _props.field.type);
		console.log("scheduleOperator: ", _props.field.operator);
		switch (_props.field.type) {
			case ScheduleType.TheDate:
				return <AppDatePicker name={_props.name} control={_props.control} />;
			case ScheduleType.TheTime:
				if (_props.field.operator === ScheduleOperatorForTime.IsBetween) {
					return (
						<ScheduleBetweenTimeValue
							name={_props.name}
							control={_props.control}
						/>
					);
				} else {
					return <AppDatePicker name={_props.name} control={_props.control} />;
				}
			case ScheduleType.TheWeekdays:
				return (
					<ScheduleWeekdaysToggleGroup currentSchedule={_props.field.value} />
				);
			default:
				return <div>default</div>;
		}
	};
	return <div>{handleRenderSwitch()}</div>;
};

export default ScheduleValueSection;
