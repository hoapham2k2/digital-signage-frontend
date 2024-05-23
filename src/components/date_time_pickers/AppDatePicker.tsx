import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
	scheduleValue: Date;
	updateSchedule: (newDateValue: Date) => void;
};

const AppDatePicker = (_props: Props) => {
	const [date, setDate] = React.useState<Date>();

	React.useEffect(() => {
		if (_props.scheduleValue) {
			// try parsing the date value before setting it
			const parsedDate = new Date(_props.scheduleValue);
			if (!isNaN(parsedDate.getTime())) {
				setDate(parsedDate);
			} else {
				setDate(new Date());
			}
		}
	}, [_props.scheduleValue]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={(date) => {
						if (date) {
							setDate(date);
							_props.updateSchedule(date);
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
