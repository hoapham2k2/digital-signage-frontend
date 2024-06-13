import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../../../../components/ui/select";
import {
	Schedule,
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/types/index";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { useParams } from "react-router-dom";

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
	// const { currentSchedule, updateSchedule } = useScheduleStore((state) => ({
	// 	currentSchedule: state.schedules.find(
	// 		(schedule) => schedule.id === props.currentSchedule.id
	// 	) as Schedule,
	// 	updateSchedule: state.updateSchedule,
	// }));

	console.log("appselect props: ", props.currentSchedule);

	return (
		<>
			<Select
				// defaultValue={handleRenderDefaultValue()}
				value={
					props.componentType === "scheduleType"
						? props.currentSchedule.type
						: props.currentSchedule.operator
				}
				onValueChange={(value: string) => {
					// if (props.componentType === "scheduleType") {
					// 	updateSchedule({
					// 		...currentSchedule,
					// 		scheduleType: value as ScheduleType,
					// 		// @ts-ignore
					// 		scheduleOperator: scheduleOptisonsMap[value as ScheduleType][0],
					// 	});
					// }
					// if (props.componentType === "scheduleOperator") {
					// 	updateSchedule({
					// 		...currentSchedule,
					// 		// @ts-ignore
					// 		scheduleOperator: value,
					// 	});
					// }
					console.log(value);
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
						: // scheduleOptisonsMap[props.currentSchedule.type].map(
						  // 		(scheduleOperator) => (
						  // 			<SelectItem key={scheduleOperator} value={scheduleOperator}>
						  // 				{scheduleOperator}
						  // 			</SelectItem>
						  // 		)
						  //   )
						  null}
				</SelectContent>
			</Select>
			{/* <span>{JSON.stringify(props.currentSchedule)}</span> */}
		</>
	);
};

export default AppSelect;
