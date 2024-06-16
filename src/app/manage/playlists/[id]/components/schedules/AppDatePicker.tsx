import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../../../../components/ui/calendar";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
	index: number;
};

const AppDatePicker = (_props: Props) => {
	const { control, watch } = useFormContext();

	const handleRenderDate = () => {
		const scheduelValue = watch(`playlist.schedules.${_props.index}.value`);
		if (!scheduelValue) return "Select a date";
		const date = parseISO(scheduelValue);
		return format(date, "yyyy-MM-dd");
	};
	return (
		<Controller
			control={control}
			name={`playlist.schedules.${_props.index}`}
			render={({ field }) => (
				<>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn("w-[280px] justify-start text-left font-normal")}>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{handleRenderDate()}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={new Date(field.value)}
								onSelect={(date) => {
									if (date) {
										const scheduleDateValue = date.toISOString();
										field.onChange({
											...field.value,
											value: scheduleDateValue,
										});
									}
								}}
								initialFocus
								disabled={{
									before: new Date(),
								}}
							/>
						</PopoverContent>
					</Popover>
				</>
			)}
		/>
	);
};

export default AppDatePicker;
