import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	Schedule,
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/lib/types";
import { useScheduleStore } from "@/lib/stores/schedule-store";

const scheduleOptisonsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};

type Props = {
	componentType: "scheduleType" | "scheduleOperator";
	currentSchedule: Schedule;
};

const AppSelect = (props: Props) => {
	const { currentSchedule, updateSchedule } = useScheduleStore((state) => ({
		currentSchedule: state.schedules.find(
			(schedule) => schedule.id === props.currentSchedule.id
		) as Schedule,
		updateSchedule: state.updateSchedule,
	}));
	return (
		<Select
			// defaultValue={handleRenderDefaultValue()}
			value={
				props.componentType === "scheduleType"
					? currentSchedule.scheduleType
					: currentSchedule.scheduleOperator
			}
			onValueChange={(value: string) => {
				if (props.componentType === "scheduleType") {
					updateSchedule({
						...currentSchedule,
						scheduleType: value as ScheduleType,
						// @ts-ignore
						scheduleOperator: scheduleOptisonsMap[value as ScheduleType][0],
					});
				}
				if (props.componentType === "scheduleOperator") {
					updateSchedule({
						...currentSchedule,
						// @ts-ignore
						scheduleOperator: value,
					});
				}
			}}>
			<SelectTrigger>
				<SelectValue placeholder={"Select an option"} />
			</SelectTrigger>
			<SelectContent>
				{props.componentType === "scheduleType"
					? Object.values(ScheduleType).map((scheduleType) => (
							<SelectItem key={scheduleType} value={scheduleType}>
								{/* "the date" to "The Date" */}
								{scheduleType.charAt(0).toUpperCase() +
									scheduleType
										.slice(1)
										.split(/(?=[A-Z])/)
										.join(" ")}
							</SelectItem>
					  ))
					: scheduleOptisonsMap[currentSchedule.scheduleType].map(
							(scheduleOperator) => (
								<SelectItem key={scheduleOperator} value={scheduleOperator}>
									{scheduleOperator}
								</SelectItem>
							)
					  )}
			</SelectContent>
		</Select>
	);
};

export default AppSelect;
