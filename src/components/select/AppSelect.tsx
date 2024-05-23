import { appStore } from "@/lib/stores/app-store";
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

const scheduleOptionsMap: Record<ScheduleType, string[]> = {
	[ScheduleType.TheDate]: Object.values(ScheduleOperatorForDate),
	[ScheduleType.TheTime]: Object.values(ScheduleOperatorForTime),
	[ScheduleType.TheWeekdays]: Object.values(ScheduleOperatorForWeekdays),
};

type Props = {
	componentType: "scheduleType" | "scheduleOperator";
	currentSchedule: Schedule;
};

const AppSelect = (props: Props) => {
	const updateScheduleType = appStore((state) => state.updateScheduleType);
	const updateScheduleOperator = appStore(
		(state) => state.updateScheduleOperator
	);
	const handleRenderDefaultValue = () => {
		if (props.componentType === "scheduleType") {
			return props.currentSchedule.scheduleType;
		} else if (props.componentType === "scheduleOperator") {
			return props.currentSchedule.scheduleOperator;
		}
	};

	return (
		<Select
			defaultValue={handleRenderDefaultValue()}
			onValueChange={(value: string) => {
				if (props.componentType === "scheduleType") {
					updateScheduleType(props.currentSchedule, value as ScheduleType);
				} else if (props.componentType === "scheduleOperator") {
					updateScheduleOperator(
						props.currentSchedule,
						value as
							| ScheduleOperatorForDate
							| ScheduleOperatorForTime
							| ScheduleOperatorForWeekdays
					);
				}
			}}
			value={handleRenderDefaultValue()}>
			<SelectTrigger>
				<SelectValue placeholder={"Select an option"} />
			</SelectTrigger>
			<SelectContent>
				{props.componentType === "scheduleType" &&
					Object.values(ScheduleType).map((option: string) => {
						return (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						);
					})}

				{props.componentType === "scheduleOperator" &&
					Object.values(
						scheduleOptionsMap[props.currentSchedule.scheduleType]
					).map((option: string) => {
						return (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						);
					})}
			</SelectContent>
		</Select>
	);
};

export default AppSelect;
