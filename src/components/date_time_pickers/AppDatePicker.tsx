import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateSchedule, Schedule, TimeSchedule } from "@/lib/types";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { useEffect } from "react";

type Props = {
	currentSchedule: DateSchedule | TimeSchedule;
};

const AppDatePicker = (_props: Props) => {
	const { currentSchedule, updateSchedule } = useScheduleStore((state) => ({
		currentSchedule: state.schedules.find(
			(schedule) => schedule.id === _props.currentSchedule.id
		) as Schedule,
		updateSchedule: state.updateSchedule,
	}));

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!currentSchedule.scheduleValue && "text-muted-foreground"
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{
						// try to convert string to date, if it fails, return the string
						// convert ISO string to Date
						Array.isArray(currentSchedule.scheduleValue)
							? (currentSchedule.scheduleValue[0] as string)
							: format(
									new Date(currentSchedule.scheduleValue as string),
									"MMM dd, yyyy"
							  )
					}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={
						Array.isArray(currentSchedule.scheduleValue)
							? new Date(currentSchedule.scheduleValue[0] as string)
							: new Date(currentSchedule.scheduleValue as string)
					}
					onSelect={(date) => {
						if (date) {
							updateSchedule({
								...currentSchedule,
								// convert to ISO string
								scheduleValue: date.toISOString(),
							} as Schedule);
						}
					}}
					initialFocus
					disabled={{
						// disable dates before today
						before: new Date(),
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default AppDatePicker;
