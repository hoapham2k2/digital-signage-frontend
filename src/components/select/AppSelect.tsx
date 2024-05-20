import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/lib/types";

type Props = {
	options: string[];
	selectedOption: string;
	onSelect:
		| ((scheduleType: ScheduleType) => void)
		| ((
				scheduleOperator:
					| ScheduleOperatorForDate
					| ScheduleOperatorForTime
					| ScheduleOperatorForWeekdays
		  ) => void);
};

const AppSelect = (props: Props) => {
	return (
		<Select
			defaultValue={props.selectedOption}
			onValueChange={(value: string) => {
				props.onSelect(value as never);
			}}>
			<SelectTrigger>
				<SelectValue placeholder={props.selectedOption || "Select an option"} />
			</SelectTrigger>
			<SelectContent>
				{props.options.map((option: string) => {
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
